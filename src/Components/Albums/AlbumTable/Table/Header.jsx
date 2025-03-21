import { Stack, TableHead, TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";

export default function Header() {
  return (
    <TableHead sx={{ borderRadius: "1em 0 0 1em" }}>
      <TableRow>
        <TableCell align="center" sx={{ width: "64px" }}></TableCell>
        <TableCell align="left">Album Name</TableCell>
        <TableCell align="left">
          <Stack>Upload Date</Stack>
        </TableCell>
        <TableCell align="center">File Count</TableCell>
        <TableCell align="center">Total Size</TableCell>
        <TableCell align="center" sx={{ width: "64px" }}></TableCell>
      </TableRow>
    </TableHead>
  );
}
