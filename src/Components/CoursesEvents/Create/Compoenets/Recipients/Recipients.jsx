import {
  Autocomplete,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import axios from "axios";
import { DownArrow } from "./../../../../../assets/IconSet";
import toast from "react-hot-toast";

export default function Recipients({}) {
  const ExpandMoreIcon = () => {
    return (
      <div style={{ marginRight: "12px" }}>
        <DownArrow size="20px" color="#000" />
      </div>
    );
  };
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]); // State to hold fetched courses
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [studentProfiles, setStudentProfiles] = useState([]);
  const [addedStudents, setAddedStudents] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch course data from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/setup_course");
        setCourses(response.data); // Assuming response is an array of course data
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const loadStudentsProfile = async (search = "") => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (search) params.append("search", search);

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
  const handleApplyFilters = () => {
    loadStudentsProfile(search);
  };

  return (
    <Stack flexDirection="row" gap="24px">
      <Stack
        gap="16px"
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "25%",
            lg: "25%",
          },
        }}
      >
        <FormControl fullWidth size="small">
          <InputLabel id="course-select-label">AO Course</InputLabel>
          <Select
            labelId="course-select-label"
            id="course-select"
            value={selectedCourses ? selectedCourses._id : ""}
            label="AO Course"
            onChange={(event) => {
              const selectedCourse = courses.find(
                (course) => course._id === event.target.value
              );
              setSelectedCourses(selectedCourse);
              console.log("Selected Course ID:", selectedCourse._id);
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
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ mr: 0 }}>
                <Button
                  variant="soft"
                  onClick={handleApplyFilters}
                  size="small"
                  sx={{ ml: 0, height: "30px" }} // Adjust button height to fit nicely
                >
                  Search
                </Button>
              </InputAdornment>
            ),
          }}
        />
        {studentProfiles.map((data, i) => {
          return (
            <Stack
              key={i}
              sx={{ p: 2, border: "1px solid red", borderRadius: "12px" }}
            >
              <Typography>Name: {data.name}</Typography>
              <Typography>BM&DC No:{data.bmdcNo}</Typography>
              <Typography>Contact No: 0{data.contactNumber}</Typography>
              <Typography>Email:{data.email}</Typography>
              <Button
                variant="outlined"
                sx={{ mt: "16px" }}
                onClick={() => {
                  if (!selectedCourses) {
                    toast.error("Please select a course first");
                    return;
                  }

                  const alreadyAdded = addedStudents.some(
                    (item) =>
                      item.student._id === data._id &&
                      item.course._id === selectedCourses._id
                  );
                  if (alreadyAdded) {
                    toast("This student is already added to the course.");
                    return;
                  }

                  setAddedStudents((prev) => [
                    ...prev,
                    { student: data, course: selectedCourses },
                  ]);
                }}
              >
                Add to list
              </Button>
            </Stack>
          );
        })}
      </Stack>
      <Stack
        gap="16px"
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "75%",
            lg: "75%",
          },
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Added Students
        </Typography>

        {addedStudents.length === 0 ? (
          <Typography color="text.secondary">No students added yet.</Typography>
        ) : (
          addedStudents.map((entry, index) => (
            <Stack
              key={index}
              sx={{
                p: 2,
                border: "1px solid #ccc",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              <Typography>
                <strong>Course:</strong> {entry.course.courseName}
              </Typography>
              <Typography>
                <strong>Name:</strong> {entry.student.name}
              </Typography>
            </Stack>
          ))
        )}
      </Stack>
    </Stack>
  );
}
// Define PropTypes
Recipients.propTypes = {
  courses: PropTypes.any,
  selectedCourses: PropTypes.any,
  setSelectedCourses: PropTypes.any,
};
