import {
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
    <TableContainer
      sx={{
        width: "100%",
        borderRadius: "12px",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        p: "16px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "rgb(244, 246, 248)" }}>
            <TableCell
              colSpan={2}
              sx={{ color: "#111827", fontWeight: "bold", fontSize: "18px" }}
            >
              Basic Information
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Name */}
          <TableRow sx={{ border: "1px solid #ddd" }}>
            <TableCell sx={{ fontWeight: "600" }}>Name</TableCell>
            <TableCell>{profile?.name || "N/A"}</TableCell>
          </TableRow>

          {/* Email */}
          <TableRow sx={{ border: "1px solid #ddd" }}>
            <TableCell sx={{ fontWeight: "600" }}>Email</TableCell>
            <TableCell>{profile?.email || "N/A"}</TableCell>
          </TableRow>

          {/* BMDC Number */}
          <TableRow sx={{ border: "1px solid #ddd" }}>
            <TableCell sx={{ fontWeight: "600" }}>
              BM&DC Registration No
            </TableCell>
            <TableCell>{profile?.bmdcNo || "N/A"}</TableCell>
          </TableRow>

          {/* Contact Number */}
          <TableRow sx={{ border: "1px solid #ddd" }}>
            <TableCell sx={{ fontWeight: "600" }}>Contact Number</TableCell>
            <TableCell>{profile?.contactNumber || "N/A"}</TableCell>
          </TableRow>

          {/* Current Working Place */}
          <TableRow sx={{ border: "1px solid #ddd" }}>
            <TableCell sx={{ fontWeight: "600" }}>
              Current Working Place
            </TableCell>
            <TableCell>
              {profile?.currentWorkingPlace?.[0]?.name || "N/A"}
            </TableCell>
          </TableRow>

          {/* Current Designation */}
          <TableRow sx={{ border: "1px solid #ddd" }}>
            <TableCell sx={{ fontWeight: "600" }}>
              Current Designation
            </TableCell>
            <TableCell>
              {profile?.currentWorkingPlace?.[0]?.designation || "N/A"}
            </TableCell>
          </TableRow>

          {/* Post-Graduation Degree */}
          <TableRow sx={{ border: "1px solid #ddd" }}>
            <TableCell sx={{ fontWeight: "600" }}>
              Post-Graduation Degree in Orthopedics
            </TableCell>
            <TableCell>
              {profile?.postGraduationDegrees?.[0]?.degreeName || "N/A"}
            </TableCell>
          </TableRow>

          {/* Year of Post Graduation */}
          <TableRow sx={{ border: "1px solid #ddd" }}>
            <TableCell sx={{ fontWeight: "600" }}>
              Year of Post Graduation
            </TableCell>
            <TableCell>
              {profile?.postGraduationDegrees?.[0]?.yearOfGraduation || "N/A"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
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
