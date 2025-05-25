import {
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Button,
} from "@mui/material";
import { useState } from "react";

export default function CertificateDesign({ courseWiseStudents, courses }) {
  const [selectedRole, setSelectedRole] = useState("");
  const [studentSignatures, setStudentSignatures] = useState({}); // studentId => file

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSignatureUpload = (event, studentId) => {
    const file = event.target.files[0];
    if (file) {
      setStudentSignatures((prev) => ({
        ...prev,
        [studentId]: file,
      }));
    }
  };

  const roleOptions = Object.keys(courseWiseStudents).map((categoryId) => {
    const matchedCourse = courses.find((course) => course._id === categoryId);
    return {
      id: categoryId,
      title: matchedCourse ? matchedCourse.courseName : "Unknown Course",
    };
  });

  const selectedStudents = courseWiseStudents[selectedRole] || [];

  return (
    <Stack
      gap="24px"
      sx={{
        width: {
          xs: "100%",
          sm: "100%",
          md: "80%",
        },
        mb: "40px",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="select-role-label">Select Course</InputLabel>
        <Select
          labelId="select-role-label"
          value={selectedRole}
          label="Select Course"
          onChange={handleRoleChange}
        >
          {roleOptions.map(({ id, title }) => (
            <MenuItem key={id} value={id}>
              {title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedRole && (
        <>
          <Typography variant="h6">
            Students Enrolled in:{" "}
            {
              roleOptions.find((opt) => opt.id === selectedRole)?.title ||
              "Unknown Course"
            }
          </Typography>

          {selectedStudents.length > 0 ? (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Upload Signature</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedStudents.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>{student.name || "N/A"}</TableCell>
                      <TableCell>{student.email || "N/A"}</TableCell>
                      <TableCell>
                        <Stack direction="column" gap={1}>
                          <Button variant="outlined" component="label" size="small">
                            Upload
                            <input
                              type="file"
                              hidden
                              accept="image/*"
                              onChange={(e) => handleSignatureUpload(e, student._id)}
                            />
                          </Button>
                          {studentSignatures[student._id] && (
                            <Typography variant="caption">
                              {studentSignatures[student._id].name}
                            </Typography>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No students found for this course.</Typography>
          )}
        </>
      )}
    </Stack>
  );
}
