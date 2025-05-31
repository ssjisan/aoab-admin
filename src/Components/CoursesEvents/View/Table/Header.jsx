import { TableHead, TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";

export default function Header({ selectedTab }) {
  return (
    <TableHead sx={{ borderRadius: "1em 0 0 1em" }}>
      <TableRow>
        {selectedTab === "upcoming" && <TableCell align="center"></TableCell>}
        <TableCell align="left" sx={{ p: "16px" }}>
          Title
        </TableCell>
        <TableCell align="left" sx={{ p: "16px" }}>
          Location
        </TableCell>
        <TableCell align="left" sx={{ p: "16px" }}>
          Fee
        </TableCell>
        <TableCell align="left" sx={{ p: "16px" }}>
          Start Date
        </TableCell>
        <TableCell align="left" sx={{ p: "16px" }}>
          End Date
        </TableCell>
        <TableCell align="center"></TableCell>
      </TableRow>
    </TableHead>
  );
}

Header.propTypes = {
  selectedTab: PropTypes.string.isRequired, // Ensures selectedTab is a required string
};
