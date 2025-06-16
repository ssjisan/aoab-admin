import {
  Checkbox,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";

export default function Header({
  allSelected,
  someSelected,
  handleSelectAll,
  selectedCount,
}) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ pl: "10px" }}>
          <Checkbox
            indeterminate={someSelected}
            checked={allSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
        </TableCell>

        {selectedCount > 0 ? (
          <TableCell colSpan={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography fontWeight="bold">{selectedCount} selected</Typography>
              {/* You can add Delete button here if needed */}
            </Stack>
          </TableCell>
        ) : (
          <>
            <TableCell>Name</TableCell>
            <TableCell>BM&DC No</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Enrollment Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Payment</TableCell>
          </>
        )}
      </TableRow>
    </TableHead>
  );
}

Header.propTypes = {
  allSelected: PropTypes.bool.isRequired,
  someSelected: PropTypes.bool.isRequired,
  handleSelectAll: PropTypes.func.isRequired,
  selectedCount: PropTypes.number.isRequired,
};
