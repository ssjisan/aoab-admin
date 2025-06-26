import {
  CircularProgress,
  TableBody,
  TableRow,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { NoData } from "../../../../assets/IconSet";
import PropTypes from "prop-types";

export default function Body({ enrollmentDetails, loading }) {
  return (
    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={10} align="center" sx={{ height: 200 }}>
            <CircularProgress />
            <Typography sx={{ mt: 2, fontWeight: 600 }}>Loading...</Typography>
          </TableCell>
        </TableRow>
      ) : !enrollmentDetails.enrollments ||
        enrollmentDetails.enrollments.length === 0 ? (
        <TableRow>
          <TableCell colSpan={10} align="center" sx={{ height: 200 }}>
            <NoData />
            <Typography sx={{ fontWeight: 600 }}>No Data</Typography>
          </TableCell>
        </TableRow>
      ) : (
        enrollmentDetails.enrollments.map((data) => (
          <TableRow key={data._id}>
            <TableCell sx={{ p: "12px 16px" }}>
              {data.studentId?.name}
            </TableCell>
            <TableCell sx={{ p: "12px 16px" }}>
              A-{data.studentId?.bmdcNo}
            </TableCell>
            <TableCell sx={{ p: "12px 16px" }}>
              {data.studentId?.email}
            </TableCell>
            <TableCell sx={{ p: "12px 16px" }}>
              0{data.studentId?.contactNumber}
            </TableCell>
            <TableCell sx={{ p: "12px 16px" }}>
              {new Date(data.enrolledAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  );
}

Body.propTypes = {
  enrollmentDetails: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  selectedIds: PropTypes.array.isRequired,
  handleSelectOne: PropTypes.func.isRequired,
};
