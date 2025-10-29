import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import { Copy } from "../../assets/IconSet";

export default function Search({
  search,
  setSearch,
  searchResults,
  loading,
  handleSearch,
  handleSelectUser,
  highlightMatch,
}) {
  // store generating state per student id
  const [generatingId, setGeneratingId] = useState(null);

  // client-side map of studentId -> { expiresAt: Date, remainingSec: number, rawBypass (optional) }
  const [cooldowns, setCooldowns] = useState({});

  // refs to keep interval id stable and avoid re-creating intervals per render
  const intervalRef = useRef(null);

  // Helper: compute remaining seconds from expiry ISO/string/Date
  const getRemainingSeconds = (expiry) => {
    if (!expiry) return 0;
    const exp = new Date(expiry).getTime();
    const now = Date.now();
    const diff = Math.floor((exp - now) / 1000);
    return diff > 0 ? diff : 0;
  };

  // Initialize cooldowns from incoming searchResults (if backend provides bypassExpiry)
  useEffect(() => {
    const init = {};
    for (const s of searchResults) {
      if (s.bypassExpiry) {
        const rem = getRemainingSeconds(s.bypassExpiry);
        if (rem > 0) {
          init[s._id] = { expiresAt: new Date(s.bypassExpiry), remainingSec: rem, rawBypass: null };
        }
      }
    }
    setCooldowns((prev) => ({ ...init, ...prev })); // keep any existing rawBypass entries
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults]);

  // Timer: tick every 1s and update remainingSec
  useEffect(() => {
    // clear previous interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCooldowns((prev) => {
        const next = { ...prev };
        let changed = false;
        for (const id of Object.keys(next)) {
          const rem = getRemainingSeconds(next[id].expiresAt);
          if (rem <= 0) {
            delete next[id];
            changed = true;
          } else {
            if (next[id].remainingSec !== rem) {
              next[id] = { ...next[id], remainingSec: rem };
              changed = true;
            }
          }
        }
        return changed ? next : prev;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Format seconds -> mm:ss
  const formatSec = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Copy to clipboard helper (for raw bypass)
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Copy failed");
    }
  };

  // 👇 Function to generate bypass password
  const handleGenerateBypass = async (studentId) => {
    try {
      // if already generating or cooldown exists, do nothing
      if (generatingId || cooldowns[studentId]) return;

      setGeneratingId(studentId);

      // call your API (adjust base URL or axios defaults as needed)
      const res = await axios.post(`/student/${studentId}/generate-bypass`);

      if (res.data?.ok) {
        const { bypass, expiresAt } = res.data;

        // show password to admin (toast)
        toast.success(
          `Bypass generated!\nPassword: ${bypass}\nExpires at: ${new Date(
            expiresAt
          ).toLocaleTimeString()}`
        );

        // store rawBypass locally for copy button and set cooldown
        setCooldowns((prev) => ({
          ...prev,
          [studentId]: { expiresAt: new Date(expiresAt), remainingSec: getRemainingSeconds(expiresAt), rawBypass: bypass },
        }));
      } else {
        toast.error(res.data?.error || "Failed to generate bypass");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setGeneratingId(null);
    }
  };

  return (
    <Box sx={{ margin: "48px 16px" }}>
      <Box display="flex" gap={2} mb={2} sx={{ width: "460px" }}>
        <TextField
          fullWidth
          label="Search user"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Search"}
        </Button>
      </Box>

      {/* Results Table */}
      {searchResults.length > 0 && (
        <TableContainer component={Paper} elevation={3}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>BM&DC Reg.</strong></TableCell>
                <TableCell><strong>Contact No</strong></TableCell>
                <TableCell align="center"><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((student) => {
                const cd = cooldowns[student._id];
                const isCooling = Boolean(cd && cd.remainingSec > 0);
                return (
                  <TableRow key={student._id} hover>
                    <TableCell>{highlightMatch(student.name)}</TableCell>
                    <TableCell>{highlightMatch(student.email)}</TableCell>
                    <TableCell>{highlightMatch(student.bmdcNo)}</TableCell>
                    <TableCell>{highlightMatch(student.contactNumber)}</TableCell>
                    <TableCell align="center">
                      {isCooling ? (
                        <Box display="flex" alignItems="center" gap={1} justifyContent="center">
                          <Button size="small" variant="outlined" disabled>
                            {formatSec(cd.remainingSec)}
                          </Button>
                          {cd.rawBypass && (
                            <IconButton size="small" onClick={() => copyToClipboard(cd.rawBypass)}>
                              <Copy size="20px" color="#000"/>
                            </IconButton>
                          )}
                        </Box>
                      ) : (
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          onClick={() => handleGenerateBypass(student._id)}
                          disabled={generatingId === student._id}
                        >
                          {generatingId === student._id ? <CircularProgress size={20} color="inherit" /> : "Generate"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
