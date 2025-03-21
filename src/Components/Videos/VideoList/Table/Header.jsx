import { TableHead, TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";

export default function Header() {
  return (
    <TableHead sx={{ borderRadius: "1em 0 0 1em" }}>
      <TableRow>
        <TableCell align="center" sx={{ width: "64px" }}></TableCell>
        <TableCell align="left" >Video Title</TableCell>
        <TableCell align="left" >Source</TableCell>
        <TableCell align="left" sx={{ width: "240px" }}>
          Upload Date
        </TableCell>
        <TableCell align="center" sx={{ width: "88px" }}></TableCell>
      </TableRow>
    </TableHead>
  );
}
