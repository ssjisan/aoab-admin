import { TableHead, TableRow, TableCell } from "@mui/material";
import PropTypes from "prop-types";

export default function Header() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>BM&DC No</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Enrollment Date</TableCell>
      </TableRow>
    </TableHead>
  );
}

Header.propTypes = {
  allSelected: PropTypes.bool.isRequired,
  someSelected: PropTypes.bool.isRequired,
  handleSelectAll: PropTypes.func.isRequired,
  handleMarkAsPresent: PropTypes.func.isRequired,
  selectedCount: PropTypes.number.isRequired,
  handleDownloadCSV: PropTypes.func.isRequired,
};
