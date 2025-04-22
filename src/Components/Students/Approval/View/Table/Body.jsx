import {
  Button,
  CircularProgress,
  Stack,
  TableBody,
  TableRow,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";
import { NoData } from "../../../../../assets/IconSet";

export default function Body({
  studentProfiles,
  openApprovalModal,
  openDenyModal,
  onViewProfile,
  loading,
}) {
  if (loading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={6}>
            <Stack
              sx={{ width: "100%", mt: 4, mb: 4 }}
              gap={2}
              alignItems="center"
            >
              <CircularProgress />
              <Typography variant="h6" color="text.secondary">
                Loading profiles...
              </Typography>
            </Stack>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  if (!studentProfiles.length >= 1) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={6}>
            <Stack
              sx={{ width: "100%", mt: "32px", mb: "32px" }}
              gap="8px"
              alignItems="center"
            >
              <NoData />
              <Typography variant="h6" color="text.secondary">
                No pending data here!
              </Typography>
            </Stack>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {studentProfiles.map((data) => {
        return (
          <TableRow key={data._id}>
            <TableCell sx={{ p: "8px 16px" }}>{data.name}</TableCell>
            <TableCell sx={{ p: "8px 16px" }}>{data.email}</TableCell>
            <TableCell sx={{ p: "8px 16px" }}>
              +880{data.contactNumber}
            </TableCell>
            <TableCell sx={{ p: "8px 16px" }}>A-{data.bmdcNo}</TableCell>
            <TableCell
              sx={{
                p: "16px",
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer",
              }}
              onClick={() => onViewProfile(data._id)}
            >
              View Details
            </TableCell>
            <TableCell sx={{ p: "8px 16px", width: "220px" }}>
              <Stack flexDirection="row" gap="8px">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => openDenyModal(data)}
                >
                  Deny
                </Button>
                <Button
                  variant="contained"
                  onClick={() => openApprovalModal(data)}
                >
                  Approve
                </Button>
              </Stack>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}

Body.propTypes = {
  studentProfiles: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      publishedDate: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  openApprovalModal: PropTypes.func.isRequired,
  openDenyModal: PropTypes.func.isRequired,
  onViewProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
