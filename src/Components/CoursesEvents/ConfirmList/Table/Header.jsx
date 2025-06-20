import {
  Checkbox,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { Download } from "./../../../../assets/IconSet";

export default function Header({
  allSelected,
  someSelected,
  handleSelectAll,
  selectedCount,
  handleMarkAsPresent,
  handleDownloadCSV,
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
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* Left side: selected count */}
              <Typography fontWeight="bold">
                {selectedCount} selected
              </Typography>

              {/* Right side: mark button */}
              <Stack flexDirection="row" gap="16px">
                <Button
                  onClick={handleDownloadCSV}
                  color="primary"
                  size="small"
                  startIcon={<Download color="#00ae60" size={20} />}
                >
                  Download
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleMarkAsPresent}
                >
                  Mark as present
                </Button>
              </Stack>
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
  handleMarkAsPresent: PropTypes.func.isRequired,
  selectedCount: PropTypes.number.isRequired,
  handleDownloadCSV: PropTypes.func.isRequired,
};
