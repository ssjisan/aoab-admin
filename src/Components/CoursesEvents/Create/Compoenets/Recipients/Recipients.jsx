import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { DownArrow } from "./../../../../../assets/IconSet";
import toast from "react-hot-toast";
import CustomeHeader from "../../../../Common/Table/CustomeHeader";

// Icon for Select
const ExpandMoreIcon = () => (
  <div style={{ marginRight: "12px" }}>
    <DownArrow size="20px" color="#000" />
  </div>
);

export default function Recipients({ courses }) {
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "category", label: "Category" },
    { key: "action", label: "Action" },
  ];

  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCategoryCourse] = useState(null);
  const [studentProfiles, setStudentProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseWiseStudents, setCourseWiseStudents] = useState({});

  const loadStudentsProfile = async (search = "") => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      const { data } = await axios.get(`/verified-accounts?${params.toString()}`);
      setStudentProfiles(data);
    } catch (err) {
      console.error("Error loading student profiles:", err);
      toast.error("Students Profile can't load");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = () => {
    loadStudentsProfile(search);
  };

  const isStudentAlreadyAdded = (studentId) => {
    return Object.values(courseWiseStudents).some((students) =>
      students.some((student) => student._id === studentId)
    );
  };

  const handleAddStudent = (student) => {
    if (!selectedCourse) {
      toast.error("Please select a course first");
      return;
    }

    const courseId = selectedCourse._id;

    if (isStudentAlreadyAdded(student._id)) {
      toast("This student is already added to a course.");
      return;
    }

    setCourseWiseStudents((prev) => {
      const updated = { ...prev };
      if (!updated[courseId]) {
        updated[courseId] = [];
      }
      updated[courseId].push(student);
      return updated;
    });
  };

  const handleRemoveStudent = (courseId, studentId) => {
    setCourseWiseStudents((prev) => {
      const updated = { ...prev };
      updated[courseId] = updated[courseId].filter((s) => s._id !== studentId);
      if (updated[courseId].length === 0) {
        delete updated[courseId];
      }
      return updated;
    });
  };

  const handlePreviewSubmit = () => {
    const dataToSubmit = Object.entries(courseWiseStudents).map(([courseId, students]) => ({
      courseId,
      courseName: courses.find((c) => c._id === courseId)?.courseName || "N/A",
      students: students.map(({ _id, name, email, bmdcNo, contactNumber }) => ({
        _id,
        name,
        email,
        bmdcNo,
        contactNumber,
      })),
    }));

    console.log("📦 Data to be submitted:", dataToSubmit);
    toast.success("Check console for submission preview");
  };

  return (
    <Stack flexDirection="row" gap="24px">
      {/* Left Panel */}
      <Stack
        gap="16px"
        sx={{
          width: { xs: "100%", sm: "100%", md: "25%", lg: "25%" },
        }}
      >
        {/* Select Course */}
        <FormControl fullWidth size="small">
          <InputLabel id="course-select-label">AO Course</InputLabel>
          <Select
            labelId="course-select-label"
            value={selectedCourse ? selectedCourse._id : ""}
            label="AO Course"
            onChange={(event) => {
              const course = courses.find((c) => c._id === event.target.value);
              setSelectedCategoryCourse(course);
            }}
            IconComponent={ExpandMoreIcon}
          >
            {courses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.courseName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Search */}
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="soft"
                  onClick={handleApplyFilters}
                  size="small"
                  sx={{ height: "30px" }}
                >
                  Search
                </Button>
              </InputAdornment>
            ),
          }}
        />

        {/* Student Search Results */}
        {loading ? (
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        ) : studentProfiles.length === 0 ? (
          <Typography
            sx={{ mt: 2, fontStyle: "italic", color: "text.secondary" }}
          >
            No students found matching your search.
          </Typography>
        ) : (
          studentProfiles.map((student, i) => (
            <Stack
              key={i}
              sx={{
                p: 2,
                boxShadow:
                  "0 0 2px 0 rgba(145 158 171 / 0.2), 0 12px 24px -4px rgba(145 158 171 / 0.12)",
                borderRadius: "12px",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Name: <Box component="span" fontWeight={600}>{student.name}</Box>
              </Typography>

              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                BM&DC No: <Box component="span" fontWeight={600}>{student.bmdcNo}</Box>
              </Typography>

              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Contact No: <Box component="span" fontWeight={600}>0{student.contactNumber}</Box>
              </Typography>

              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Email: <Box component="span" fontWeight={600}>{student.email}</Box>
              </Typography>

              <Button
                variant="soft"
                sx={{ mt: "16px" }}
                disabled={isStudentAlreadyAdded(student._id)}
                onClick={() => handleAddStudent(student)}
              >
                {isStudentAlreadyAdded(student._id)
                  ? "Already added"
                  : "Add to list"}
              </Button>
            </Stack>
          ))
        )}
      </Stack>

      {/* Right Panel */}
      <Stack
        gap="16px"
        sx={{
          width: { xs: "100%", sm: "100%", md: "75%", lg: "75%" },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Added by Category</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreviewSubmit}
            disabled={Object.keys(courseWiseStudents).length === 0}
          >
            Preview Submission
          </Button>
        </Stack>

        {Object.keys(courseWiseStudents).length === 0 ? (
          <Typography color="text.secondary">No students added yet.</Typography>
        ) : (
          <TableContainer elevation={2}>
            <Table>
              <CustomeHeader
                columns={columns}
                includeActions={true}
                includeDrag={false}
              />
              <TableBody>
                {Object.entries(courseWiseStudents).map(
                  ([courseId, students]) =>
                    students.map((student) => {
                      const course = courses.find((c) => c._id === courseId);
                      return (
                        <TableRow key={student._id}>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{course?.courseName || "N/A"}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() =>
                                handleRemoveStudent(courseId, student._id)
                              }
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Stack>
  );
}

Recipients.propTypes = {
  courses: PropTypes.array.isRequired,
};
