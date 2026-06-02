import {
  Box,
  Grid,
  Typography,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
} from "@mui/material";

import certificate1Img from "/certificate_1st.png";
import certificate2Img from "/certificate_2nd.png";

export default function CertificateSetup({
  selectedTemplate,
  setSelectedTemplate,
  courseWiseStudents = {},
  selectedProfilesForSignature = [],
  toggleProfile,
}) {
  // Templates
  const templates = [
    { id: 0, img: certificate1Img, title: "Certificate 1" },
    { id: 1, img: certificate2Img, title: "Certificate 2" },
  ];

  // Flatten students
  const allStudents = Object.values(courseWiseStudents).flat();

  return (
    <Stack gap="32px" sx={{ mt: 3, pb: "64px" }}>
      {/* ---------------- TEMPLATE SECTION ---------------- */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" mb={2}>
          Select Certificate Template
        </Typography>

        <Grid container spacing={2}>
          {templates.map((template) => {
            const isActive = selectedTemplate === template.id;

            return (
              <Grid item key={template.id}>
                <Box
                  onClick={() => setSelectedTemplate(template.id)}
                  sx={{
                    width: 300,
                    height: 220,
                    cursor: "pointer",
                    borderRadius: 2,
                    overflow: "hidden",
                    border: isActive ? "3px solid #1976d2" : "1px solid #ddd",
                    boxShadow: isActive
                      ? "0 0 10px rgba(25,118,210,0.4)"
                      : "none",
                    transition: "0.2s ease-in-out",
                    "&:hover": {
                      borderColor: "#1976d2",
                    },
                  }}
                >
                  <img
                    src={template.img}
                    alt={template.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* ---------------- STUDENT TABLE SECTION ---------------- */}
      <Box>
        <Typography variant="h6" mb={2}>
          All Profiles
        </Typography>

        {allStudents.length > 0 ? (
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
                {allStudents.map((student) => {
                  const isSelected = selectedProfilesForSignature.includes(
                    student._id,
                  );

                  return (
                    <TableRow key={student._id}>
                      s<TableCell>{student.name || "N/A"}</TableCell>
                      <TableCell>{student.email || "N/A"}</TableCell>
                      <TableCell>
                        {student?.signature?.url ? (
                          <Box sx={{ width: "75px", height: "35px" }}>
                            <img
                              src={student.signature.url}
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
          <Typography>No profiles available.</Typography>
        )}
      </Box>
    </Stack>
  );
}
