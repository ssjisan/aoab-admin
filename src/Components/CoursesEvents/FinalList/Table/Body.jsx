import { Checkbox, CircularProgress, TableBody, TableRow, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { NoData } from "../../../../assets/IconSet";
import CustomChip from "../../../Common/Chip/CustomeChip";
import PropTypes from "prop-types";

export default function Body({ enrollmentDetails, loading, selectedIds, handleSelectOne }) {
  return (
    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={10} align="center" sx={{ height: 200 }}>
            <CircularProgress />
            <Typography sx={{ mt: 2, fontWeight: 600 }}>Loading...</Typography>
          </TableCell>
        </TableRow>
      ) : enrollmentDetails.length === 0 ? (
        <TableRow>
          <TableCell colSpan={10} align="center" sx={{ height: 200 }}>
            <NoData />
            <Typography sx={{ fontWeight: 600 }}>No Data</Typography>
          </TableCell>
        </TableRow>
      ) : (
        enrollmentDetails.map((data) => (
          <TableRow key={data._id}>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selectedIds.includes(data._id)}
                onChange={() => handleSelectOne(data._id)}
              />
            </TableCell>
            <TableCell>{data.studentId?.name}</TableCell>
            <TableCell>A-{data.studentId?.bmdcNo}</TableCell>
            <TableCell>
              {data.studentId?.email}
              <br />
              <span style={{ fontSize: "12px" }}>
                0{data.studentId?.contactNumber}
              </span>
            </TableCell>
            <TableCell>
              {new Date(data.enrolledAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              <br />
              <span style={{ fontSize: "12px" }}>
                {new Date(data.enrolledAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </TableCell>
            <TableCell>
              <CustomChip label={data.status} />
            </TableCell>
            <TableCell>
              <CustomChip label={data.paymentReceived} />
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
