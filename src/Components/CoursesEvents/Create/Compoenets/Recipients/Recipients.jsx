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
import PropTypes from "prop-types";
import { DownArrow } from "./../../../../../assets/IconSet";
import CustomeHeader from "../../../../Common/Table/CustomeHeader";

// Icon for Select
const ExpandMoreIcon = () => (
  <div style={{ marginRight: "12px" }}>
    <DownArrow size="20px" color="#000" />
  </div>
);

export default function Recipients({
  loading,
  courses,
  selectedCategoryForRecipients,
  setSelectedCategoryForRecipients,
  searchForProfile,
  setSearchForProfile,
  handleApplyFilters,
  studentProfiles,
  isStudentAlreadyAdded,
  courseWiseStudents,
  handleRemoveStudent,
  handleAddStudent,
}) {
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "category", label: "Category" },
    { key: "action", label: "Action" },
  ];

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
            value={
              selectedCategoryForRecipients
                ? selectedCategoryForRecipients._id
                : ""
            }
            label="AO Course"
            onChange={(event) => {
              const course = courses.find((c) => c._id === event.target.value);
              setSelectedCategoryForRecipients(course);
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
          value={searchForProfile}
          onChange={(e) => setSearchForProfile(e.target.value)}
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
              <Typography
                variant="body2"
                sx={{ fontWeight: 500 }}
                color="text.secondary"
              >
                Name:{" "}
                <Box component="span" fontWeight={600} color="text.primary">
                  {student.name}
                </Box>
              </Typography>

              <Typography
                variant="body2"
                sx={{ fontWeight: 500 }}
                color="text.secondary"
              >
                BM&DC No:{" "}
                <Box component="span" fontWeight={600} color="text.primary">
                  {student.bmdcNo}
                </Box>
              </Typography>

              <Typography
                variant="body2"
                sx={{ fontWeight: 500 }}
                color="text.secondary"
              >
                Contact No:{" "}
                <Box component="span" fontWeight={600} color="text.primary">
                  0{student.contactNumber}
                </Box>
              </Typography>

              <Typography
                variant="body2"
                sx={{ fontWeight: 500 }}
                color="text.secondary"
              >
                Email:{" "}
                <Box component="span" fontWeight={600} color="text.primary">
                  {student.email}
                </Box>
              </Typography>

              <Button
                variant={isStudentAlreadyAdded(student._id) ? "text" : "soft"}
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
  loading: PropTypes.bool.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      courseName: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCategoryForRecipients: PropTypes.shape({
    _id: PropTypes.string,
    courseName: PropTypes.string,
  }),
  setSelectedCategoryForRecipients: PropTypes.func.isRequired,
  handleAddStudent: PropTypes.func.isRequired,
  searchForProfile: PropTypes.string.isRequired,
  setSearchForProfile: PropTypes.func.isRequired,
  handleApplyFilters: PropTypes.func.isRequired,
  studentProfiles: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      bmdcNo: PropTypes.string,
      contactNumber: PropTypes.string,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  isStudentAlreadyAdded: PropTypes.func.isRequired,
  courseWiseStudents: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      })
    )
  ).isRequired,
  handleRemoveStudent: PropTypes.func.isRequired,
};
