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
  TableContainer,
  Box,
  Button,
} from "@mui/material";

export default function CertificateDesign({
  courseWiseStudents = {},
  courses = [],
  selectedCategoryForSignature,
  handleCategoryChange,
  roleOptions,
  selectedCourse,
  selectedStudents,
  selectedProfilesForSignature,
  toggleProfile,
}) {
  return (
    <Stack gap="24px" sx={{ width: { xs: "100%", md: "80%" }, mb: "40px" }}>
      <FormControl fullWidth>
        <InputLabel id="select-category-label">Select Course</InputLabel>
        <Select
          labelId="select-category-label"
          value={selectedCategoryForSignature}
          label="Select Course"
          onChange={handleCategoryChange}
        >
          {roleOptions.map(({ id, title }) => (
            <MenuItem key={id} value={id}>
              {title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCategoryForSignature && (
        <>
          <Typography variant="h6">
            Students Enrolled in: {selectedCourse?.title || "Unknown Course"}
          </Typography>

          {selectedStudents.length > 0 ? (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Email</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Signature</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Action</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedStudents.map((student) => {
                    const isSelected = selectedProfilesForSignature.includes(
                      student._id
                    );
                    return (
                      <TableRow key={student._id}>
                        <TableCell>{student.name || "N/A"}</TableCell>
                        <TableCell>{student.email || "N/A"}</TableCell>
                        <TableCell>
                          {student?.signature?.length > 0 &&
                          student.signature[0]?.url ? (
                            <Box sx={{ width: "75px", height: "35px" }}>
                              <img
                                src={student.signature[0].url}
                                alt="signature"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </Box>
                          ) : (
                            <Typography>No Signature uploaded</Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant={isSelected ? "contained" : "outlined"}
                            color={isSelected ? "error" : "primary"}
                            onClick={() => toggleProfile(student._id)}
                          >
                            {isSelected ? "Deselect" : "Select"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
