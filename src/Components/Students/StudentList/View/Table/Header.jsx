import { TableHead, TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";

export default function Header() {
  return (
    <TableHead sx={{ borderRadius: "1em 0 0 1em" }}>
      <TableRow>
        <TableCell align="left" sx={{ p: "8px 16px" }}>
          Name
        </TableCell>
        <TableCell align="left" sx={{ p: "8px 16px" }}>
          Email
        </TableCell>
        <TableCell align="left" sx={{ p: "8px 16px" }}>
          Contact Number
        </TableCell>
        <TableCell align="left" sx={{ p: "8px 16px" }}>
          BM&DC Reg.
        </TableCell>
        <TableCell align="left" sx={{ p: "8px 16px" }}>
          View Profile
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
