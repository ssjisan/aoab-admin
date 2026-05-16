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

  const handleSelect = (id) => {
    setSelectedTemplate(id);
  };

  // Flatten students
  const allStudents = Object.values(courseWiseStudents).flat();

  return (
    <Stack gap="32px" sx={{ mt: 3 }}>
      {/* ---------------- TEMPLATE SECTION ---------------- */}
      <Box>
        <Typography variant="h6" mb={2}>
          Choose Certificate Template
        </Typography>

        <Grid container spacing={2}>
          {templates.map((template) => (
            <Grid item xs={6} sm={3} key={template.id}>
              <Box
                sx={{
                  border:
                    selectedTemplate === template.id
                      ? "3px solid #1976d2"
                      : "1px solid #ccc",
                  borderRadius: 2,
                  cursor: "pointer",
                  overflow: "hidden",
                  transition: "0.3s",
                  "&:hover": { borderColor: "#1976d2" },
                }}
                onClick={() => handleSelect(template.id)}
              >
                <img
                  src={template.img}
                  alt={template.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
                <Typography
                  variant="body2"
                  textAlign="center"
                  sx={{ p: 1, background: "#f5f5f5" }}
                >
                  {template.title}
                </Typography>
              </Box>
            </Grid>
          ))}
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
          <Typography>No profiles available.</Typography>
        )}
      </Box>
    </Stack>
  );
}
