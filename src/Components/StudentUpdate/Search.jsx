import React from "react";
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
} from "@mui/material";

export default function Search({
  search,
  setSearch,
  searchResults,
  loading,
  handleSearch,
  handleSelectUser,
  highlightMatch,
}) {
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
        <TableContainer elevation={3}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ py: 0.5, px: 1.5 }}>
                  <strong>Name</strong>
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1.5 }}>
                  <strong>Email</strong>
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1.5 }}>
                  <strong>BM&DC Reg.</strong>
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1.5 }}>
                  <strong>Contact No</strong>
                </TableCell>
                <TableCell align="center" sx={{ py: 0.5, px: 1.5 }}>
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((student) => (
                <TableRow key={student._id} hover>
                  <TableCell sx={{ py: 0.5, px: 1.5 }}>
                    {highlightMatch(student.name)}
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1.5 }}>
                    {highlightMatch(student.email)}
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1.5 }}>
                    {highlightMatch(student.bmdcNo)}
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1.5 }}>
                    {highlightMatch(student.contactNumber)}
                  </TableCell>
                  <TableCell align="center" sx={{ py: 0.5, px: 1.5 }}>
                    <Button
                      size="small"
                      onClick={() => handleSelectUser(student)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
