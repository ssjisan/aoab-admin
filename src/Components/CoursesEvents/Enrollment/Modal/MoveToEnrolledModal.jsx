// MoveToEnrolledModal.jsx
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { Cross, Warning } from "../../../../assets/IconSet";

export default function MoveToEnrolledModal({
  open,
  onClose,
  student,
  onConfirm,
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "24px",
          py: "12px",
          borderBottom: "1px solid #e9e9e9ff",
        }}
      >
        <Typography variant="h6">Move to Enrolled</Typography>
        <IconButton onClick={onClose}>
          <Cross size={"24px"} color="#141414" />
        </IconButton>
      </Box>

      {/* Body */}
      <DialogContent
        sx={{
          p: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Warning size="48px" color="#dc3545" />
        <Typography variant="body1">
          Are you sure you want to move{" "}
          <strong>{student?.studentId?.name}</strong> from the waitlist to the
          enrolled list?
        </Typography>
      </DialogContent>

      {/* Footer */}
      <DialogActions
        sx={{
          px: "24px",
          py: "12px",
          borderTop: "1px solid #e9e9e9ff",
        }}
      >
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Yes, Move
        </Button>
      </DialogActions>
    </Dialog>
  );
}

MoveToEnrolledModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  student: PropTypes.object,
  onConfirm: PropTypes.func.isRequired,
};
