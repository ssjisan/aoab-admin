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
import {
  DownArrow,
  Download,
  Filter,
  Remove,
} from "../../../../assets/IconSet";
import FilterDrawer from "../Filter/FilterDrawer";
import Papa from "papaparse";

export default function ListView() {
  const DownArrowIcon = () => <DownArrow color="grey" size={16} />;
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

  const [courses, setCourses] = useState([]); // State to hold fetched courses
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    // Fetch course data from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/category_list");
        setCourses(response.data); // Assuming response is an array of course data
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    loadStudentsProfile();
  }, []);

  const handleApplyFilters = () => {
    loadStudentsProfile(search, yearFrom, yearTo, selectedCourses);
    setOpenFilterDrawer(false); // Close filter drawer
  };

  const loadStudentsProfile = async (
    search = "",
    yearFrom = "",
    yearTo = "",
    selectedCourses = []
  ) => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (yearFrom) params.append("yearFrom", yearFrom);
      if (yearTo) params.append("yearTo", yearTo);
      if (selectedCourses.length > 0) {
        selectedCourses.forEach(
          ({ _id }) => _id && params.append("courses", _id)
        );
      }

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
    loadStudentsProfile("", yearFrom, yearTo, selectedCourses); // Keep the course filters intact
  };

  const handleClearYear = () => {
    setYearFrom("");
    setYearTo("");
    loadStudentsProfile(search, "", "", selectedCourses);
  };
  
  const handleClearFilter = () => {
    setSearch("");
    setYearFrom("");
    setYearTo("");
    setSelectedCourses([]); // Clear selected courses
    loadStudentsProfile("", "", "", []); // Clear course filter and reload data
  };

  const handleRemoveCourse = (courseId) => {
    setSelectedCourses((prevSelectedCourses) =>
      prevSelectedCourses.filter((course) => course._id !== courseId)
    );

    // Reload the data with the updated course filters (if any)
    loadStudentsProfile(
      search,
      yearFrom,
      yearTo,
      selectedCourses.filter((course) => course._id !== courseId)
    );
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

  const handleDownloadCSV = () => {
    if (!studentProfiles.length) {
      toast.error("No data to download");
      return;
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}_${String(
      now.getMonth() + 1
    ).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}`;

    const formattedTime =
      now.getHours().toString().padStart(2, "0") +
      now.getMinutes().toString().padStart(2, "0");

    const fileName = `Student_Profile_${formattedDate}_${formattedTime}.csv`;

    // Extract only the required fields
    const filteredData = studentProfiles.map((student) => ({
      Name: student?.name || "",
      Email: student?.email || "",
      "Contact Number": student?.contactNumber || "",
      BMDCNO: student?.bmdcNo || "",
      "Postgraduation Year":
        student?.postGraduationDegrees?.[0]?.yearOfGraduation || "",
    }));

    const csv = Papa.unparse(filteredData);

    // Create a Blob from the CSV string and trigger a download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            {(search || yearFrom || yearTo || selectedCourses.length > 0) && (
              <Typography variant="body2">
                <Box component={"span"} sx={{ fontWeight: "700" }}>
                  {studentProfiles.length}
                </Box>{" "}
                result found
              </Typography>
            )}

            {search && (
              <Chip
                size="small"
                label={search}
                onDelete={handleClearSearch}
                color="primary"
                sx={{ color: "#00AE60", background: "#dbf1e8" }}
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
                sx={{ color: "#00AE60", background: "#dbf1e8" }}
              />
            )}
            {selectedCourses.length > 0 && (
              <Stack direction="row" spacing={1}>
                {selectedCourses.map((course) => (
                  <Chip
                    key={course._id}
                    size="small"
                    label={course.courseName}
                    onDelete={() => handleRemoveCourse(course._id)}
                    color="primary"
                    sx={{ color: "#00AE60", background: "#dbf1e8" }}
                  />
                ))}
              </Stack>
            )}

            {(search || yearFrom || yearTo || selectedCourses.length > 0) && (
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
          <Stack flexDirection="row" gap="8px">
            <Button
              startIcon={<Download color="#060415" size={20} />}
              onClick={handleDownloadCSV}
              sx={{ color: "#060415", width: "fit-content" }}
            >
              Download
            </Button>
            <Button
              startIcon={<Filter color="#060415" size={20} />}
              sx={{ color: "#060415", width: "fit-content" }}
              onClick={() => setOpenFilterDrawer(true)} // 🔹 Open filter drawer
            >
              Filter
            </Button>
          </Stack>
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
      <FilterDrawer
        open={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
        handleApplyFilters={handleApplyFilters}
        search={search}
        setSearch={setSearch}
        yearFrom={yearFrom}
        setYearFrom={setYearFrom}
        yearTo={yearTo}
        setYearTo={setYearTo}
        courses={courses}
        setSelectedCourses={setSelectedCourses}
        selectedCourses={selectedCourses}
      />
    </Box>
  );
}
