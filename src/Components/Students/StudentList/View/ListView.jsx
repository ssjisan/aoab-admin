import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableContainer,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Table/Body";
import Header from "./Table/Header";
import ProfileDetailsDrawer from "../../ProfileDetails/ProfileDetailsDrawer";

export default function ListView() {
  const [studentProfiles, setStudentProfiles] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(""); // Store selected course label

  // This will load all students initially when the component mounts
  useEffect(() => {
    loadStudentsProfile(); // Load all students on first render
  }, []);

  // This will load students for the selected course
  useEffect(() => {
    if (selectedCourse !== "") {
      loadStudentsProfile(selectedCourse); // Load selected course students when course changes
    } else {
      loadStudentsProfile(); // Load all students if no course is selected
    }
  }, [selectedCourse]);

  const loadStudentsProfile = async (courseLabel = "") => {
    try {
      let url = "/verified-accounts";
      if (courseLabel) {
        url += `?label=${courseLabel}&status=yes`;
      }

      const { data } = await axios.get(url);
      setStudentProfiles(data);
    } catch (err) {
      console.error("Error details:", err);
      toast.error("Students Profile can't load");
    }
  };

  const courses = [
    { label: "aoBasicCourse", name: "AO Basic Course" },
    { label: "aoAdvanceCourse", name: "AO Advanced Course" },
    { label: "aoMastersCourse", name: "AO Masters Course" },
    { label: "aoaPediatricSeminar", name: "AOA Pediatric Seminar" },
    { label: "aoaPelvicSeminar", name: "AOA Pelvic Seminar" },
    { label: "aoaFootAnkleSeminar", name: "AOA Foot & Ankle Seminar" },
    { label: "aoPeer", name: "AO Peer" },
    { label: "aoaOtherCourses", name: "AOA Other Courses" },
    { label: "aoaFellowship", name: "AOA Fellowship" },
    { label: "tableFaculty", name: "Table Faculty" },
    { label: "nationalFaculty", name: "National Faculty" },
  ];
  // Inside ListView function
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

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
        <Stack alignItems="flex-end">
          <FormControl sx={{ m: 1, width: 220 }} size="small">
            <InputLabel id="course-select-label">Filter by Course</InputLabel>
            <Select
              labelId="course-select-label"
              value={selectedCourse}
              label="Filter by Course"
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <MenuItem value="">All Verified Students</MenuItem>
              {courses.map((course) => (
                <MenuItem key={course.label} value={course.label}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Table>
          <Header />
          <Body studentProfiles={studentProfiles} onViewProfile={handleViewProfile}/>
        </Table>
      </TableContainer>
      <ProfileDetailsDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        studentProfile={selectedStudent}
      />{" "}
    </Box>
  );
}
