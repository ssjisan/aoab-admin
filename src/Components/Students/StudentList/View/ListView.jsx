import {
  Box,
  Button,
  Chip,
  Stack,
  Table,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Table/Body";
import Header from "./Table/Header";
import ProfileDetailsDrawer from "../../ProfileDetails/ProfileDetailsDrawer";
import { DownArrow, Filter, Remove } from "../../../../assets/IconSet";
import FilterDrawer from "../Filter/FilterDrawer";

export default function ListView() {
  const [studentProfiles, setStudentProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false); // 🔹 New state
  const [search, setSearch] = useState(""); // Search state
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");

  const DownArrowIcon = () => <DownArrow color="grey" size={16} />;

  useEffect(() => {
    loadStudentsProfile();
  }, []);

  const handleApplyFilters = () => {
    console.log("Applied Search Filter:", search);
    loadStudentsProfile(search, yearFrom, yearTo);
    setOpenFilterDrawer(false); // Close filter drawer
  };

  const loadStudentsProfile = async (
    search = "",
    yearFrom = "",
    yearTo = ""
  ) => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (yearFrom) params.append("yearFrom", yearFrom);
      if (yearTo) params.append("yearTo", yearTo);

      const { data } = await axios.get(
        `/verified-accounts?${params.toString()}`
      );
      setStudentProfiles(data);
    } catch (err) {
      console.error("Error loading student profiles:", err);
      toast.error("Students Profile can't load");
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    loadStudentsProfile("", yearFrom, yearTo); // Keep the year filters intact
  };
  const handleClearYear = () => {
    setYearFrom("");
    setYearTo("");
    loadStudentsProfile(search, "", ""); // Keep the year filters intact
  };
  const handleClearFilter = () => {
    setSearch("");
    setYearFrom("");
    setYearTo("");
    loadStudentsProfile("", "", "");
  };
  const handleViewProfile = async (studentId) => {
    try {
      const { data } = await axios.get(`/student/${studentId}`);
      setSelectedStudent(data);
      setOpenDrawer(true);
    } catch (error) {
      toast.error("Failed to load student profile");
    }
  };

  return (
    <Box
      sx={{
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        borderRadius: "16px",
        p: 2,
        mt: 3,
      }}
    >
      <TableContainer>
        <Stack
          sx={{ p: "12px 0px", width: "100%" }}
          alignItems="flex-end"
          flexDirection="row"
          justifyContent="center"
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ width: "100%" }}
            alignItems="center"
          >
            {(search || yearFrom || yearTo) && (
              <Typography variant="body2"><Box component={"span"} sx={{fontWeight:"700"}}>{studentProfiles.length}</Box> result found</Typography>
            )}
            {search && (
              <Chip
                size="small"
                label={search}
                onDelete={handleClearSearch}
                color="primary"
                sx={{color:"#00AE60", background:"#dbf1e8"}}
              />
            )}
            {(yearFrom || yearTo) && (
              <Chip
                size="small"
                label={`${yearFrom ? yearFrom : ""}${
                  yearFrom && yearTo ? "-" : ""
                }${yearTo ? yearTo : ""}`}
                onDelete={handleClearYear}
                color="primary"
                sx={{color:"#00AE60", background:"#dbf1e8"}}
              />
            )}
            {(search || yearFrom || yearTo) && (
              <Button
                onClick={handleClearFilter}
                variant="text"
                color="error"
                startIcon={<Remove color="#DC3545" size={20} />}
              >
                Reset
              </Button>
            )}
          </Stack>
          <Button
            startIcon={<Filter color="#060415" size={20} />}
            sx={{ color: "#060415", width: "fit-content" }}
            onClick={() => setOpenFilterDrawer(true)} // 🔹 Open filter drawer
          >
            Filter
          </Button>
        </Stack>

        <Table>
          <Header />
          <Body
            studentProfiles={studentProfiles.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
            onViewProfile={handleViewProfile}
            loading={loading}
          />
          <TablePagination
            count={studentProfiles.length}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
            slotProps={{
              select: {
                IconComponent: DownArrowIcon,
              },
            }}
            sx={{
              borderBottom: "none",
              borderTop: "1px solid rgba(145, 158, 171, 0.24)",
            }}
          />
        </Table>
      </TableContainer>
      <ProfileDetailsDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        studentProfile={selectedStudent}
      />
      <FilterDrawer // 🔹 New drawer component
        open={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
        handleApplyFilters={handleApplyFilters}
        search={search}
        setSearch={setSearch}
        yearFrom={yearFrom}
        setYearFrom={setYearFrom}
        yearTo={yearTo}
        setYearTo={setYearTo}
      />
    </Box>
  );
}
