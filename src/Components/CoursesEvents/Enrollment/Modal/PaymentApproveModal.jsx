import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import { Cross } from "../../../../assets/IconSet";

export default function PaymentApproveModal({
  open,
  onClose,
  student,
  onConfirm,
}) {
  const handleConfirm = () => {
    onConfirm(); // no remark required
  };

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
        <Typography variant="h6">Approve Payment</Typography>
        <IconButton onClick={onClose}>
          <Cross size="24px" color="#141414" />
        </IconButton>
      </Box>

      {/* Body */}
      <DialogContent sx={{ px: "24px", py: "24px" }}>
        <Typography variant="body1">
          Are you sure you want to <strong>approve payment</strong> for{" "}
          <strong>{student?.studentId?.name}</strong>?
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
        <Button onClick={handleConfirm} variant="contained" color="success">
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PaymentApproveModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  student: PropTypes.object,
  onConfirm: PropTypes.func.isRequired,
};
