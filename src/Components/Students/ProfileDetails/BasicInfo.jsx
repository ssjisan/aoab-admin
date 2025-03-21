import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";

export default function BasicInfo({ profile }) {
  return (
    <Stack
      sx={{
        width: "100%",
        borderRadius: "12px",
        border: "1px solid #05060f08",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        p: "16px",
      }}
    >
      <TableContainer
        sx={{
          borderRadius: "12px",

          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgb(244, 246, 248)" }}>
              <TableCell
                colSpan={2}
                sx={{
                  color: "#111827",
                  fontWeight: "bold",
                  fontSize: "18px",
                  border: "1px solid #ddd",
                }}
              >
                Basic Information
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Name */}
            <TableRow>
              <TableCell sx={{ fontWeight: "600", border: "1px solid #ddd" }}>
                Name
              </TableCell>
              <TableCell sx={{ border: "1px solid #ddd", p: "8px 16px" }}>
                {profile?.name || "N/A"}
              </TableCell>
            </TableRow>

            {/* Email */}
            <TableRow>
              <TableCell sx={{ fontWeight: "600", border: "1px solid #ddd" }}>
                Email
              </TableCell>
              <TableCell sx={{ border: "1px solid #ddd", p: "8px 16px" }}>
                {profile?.email || "N/A"}
              </TableCell>
            </TableRow>

            {/* BMDC Number */}
            <TableRow>
              <TableCell sx={{ fontWeight: "600", border: "1px solid #ddd" }}>
                BM&DC Registration No
              </TableCell>
              <TableCell sx={{ border: "1px solid #ddd", p: "8px 16px" }}>
                {profile?.bmdcNo || "N/A"}
              </TableCell>
            </TableRow>

            {/* Contact Number */}
            <TableRow>
              <TableCell sx={{ fontWeight: "600", border: "1px solid #ddd" }}>
                Contact Number
              </TableCell>
              <TableCell sx={{ border: "1px solid #ddd", p: "8px 16px" }}>
                {profile?.contactNumber || "N/A"}
              </TableCell>
            </TableRow>

            {/* Current Working Place */}
            <TableRow>
              <TableCell sx={{ fontWeight: "600", border: "1px solid #ddd" }}>
                Current Working Place
              </TableCell>
              <TableCell sx={{ border: "1px solid #ddd", p: "8px 16px" }}>
                {profile?.currentWorkingPlace?.[0]?.name || "N/A"}
              </TableCell>
            </TableRow>

            {/* Current Designation */}
            <TableRow>
              <TableCell sx={{ fontWeight: "600", border: "1px solid #ddd" }}>
                Current Designation
              </TableCell>
              <TableCell sx={{ border: "1px solid #ddd", p: "8px 16px" }}>
                {profile?.currentWorkingPlace?.[0]?.designation || "N/A"}
              </TableCell>
            </TableRow>

            {/* Post-Graduation Degree */}
            <TableRow>
              <TableCell sx={{ fontWeight: "600", border: "1px solid #ddd" }}>
                Post-Graduation Degree in Orthopedics
              </TableCell>
              <TableCell sx={{ border: "1px solid #ddd", p: "8px 16px" }}>
                {profile?.postGraduationDegrees?.[0]?.degreeName || "N/A"}
              </TableCell>
            </TableRow>

            {/* Year of Post Graduation */}
            <TableRow>
              <TableCell sx={{ fontWeight: "600", border: "1px solid #ddd" }}>
                Year of Post Graduation
              </TableCell>
              <TableCell sx={{ border: "1px solid #ddd", p: "8px 16px" }}>
                {profile?.postGraduationDegrees?.[0]?.yearOfGraduation || "N/A"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

BasicInfo.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    bmdcNo: PropTypes.string.isRequired,
    contactNumber: PropTypes.string.isRequired,
    currentWorkingPlace: PropTypes.array,
    postGraduationDegrees: PropTypes.array,
  }).isRequired,
};
