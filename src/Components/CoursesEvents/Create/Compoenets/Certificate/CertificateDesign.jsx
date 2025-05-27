import {
  Stack,
  Typography,
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
  selectedProfilesForSignature,
  toggleProfile,
}) {
  // Flatten all students from all categories into a single array
  const allStudents = Object.values(courseWiseStudents).flat();

  return (
    <Stack gap="24px" sx={{ width: { xs: "100%", md: "80%" }, mb: "40px" }}>
      <Typography variant="h6">
        All Students Across All Courses
      </Typography>

      {allStudents.length > 0 ? (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Signature</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allStudents.map((student) => {
                const isSelected = selectedProfilesForSignature.includes(student._id);
                return (
                  <TableRow key={student._id}>
                    <TableCell>{student.name || "N/A"}</TableCell>
                    <TableCell>{student.email || "N/A"}</TableCell>
                    <TableCell>
                      {student?.signature?.[0]?.url ? (
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
        <Typography>No students available.</Typography>
      )}
    </Stack>
  );
}
