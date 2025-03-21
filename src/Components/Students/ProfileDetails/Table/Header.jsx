import { TableHead, TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";

export default function Header() {
  return (
    <TableHead
      sx={{
        borderRadius: "1em 0 0 1em",
        overflowX: "auto",
        backgroundColor: "rgb(244, 246, 248)", // Set background color
      }}
    >
      <TableRow>
        <TableCell
          align="left"
          sx={{
            fontWeight: "700 !important",
            p: "16px",
            color: "#111827", // Dark text color
            backgroundColor: "rgb(244, 246, 248)", // Match background
            border: "1px solid #ddd", // Border for all cells
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Course Name
        </TableCell>
        <TableCell
          align="left"
          sx={{
            fontWeight: "700",
            p: "16px",
            color: "#111827",
            backgroundColor: "rgb(244, 246, 248)",
            border: "1px solid #ddd",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Status
        </TableCell>
        <TableCell
          align="left"
          sx={{
            fontWeight: "700",
            p: "16px",
            color: "#111827",
            backgroundColor: "rgb(244, 246, 248)",
            border: "1px solid #ddd",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Complete At
        </TableCell>
        <TableCell
          align="left"
          sx={{
            fontWeight: "700",
            p: "16px",
            color: "#111827",
            backgroundColor: "rgb(244, 246, 248)",
            border: "1px solid #ddd",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Uploaded Documents
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
