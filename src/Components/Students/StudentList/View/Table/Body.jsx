import {
  CircularProgress,
  Stack,
  TableBody,
  TableRow,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";
import { NoData } from "../../../../../assets/IconSet";

export default function Body({ studentProfiles, onViewProfile, loading }) {
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
              <CircularProgress size={40}/>
              <Typography variant="body1" color="text.secondary" sx={{fontWeight:"500 !important"}}>
                Loading profiles...
              </Typography>
            </Stack>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (!studentProfiles.length) {
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
              <Typography variant="body1" color="text.secondary" sx={{fontWeight:"500 !important"}}>
                No data here!
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
            <TableCell sx={{ p: "16px" }}>{data.name}</TableCell>
            <TableCell sx={{ p: "16px" }}>{data.email}</TableCell>
            <TableCell sx={{ p: "16px" }}>+880{data.contactNumber}</TableCell>
            <TableCell sx={{ p: "16px" }}>A-{data.bmdcNo}</TableCell>
            <TableCell sx={{ p: "16px" }}>{data?.aoaNo}</TableCell>
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
  onViewProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
