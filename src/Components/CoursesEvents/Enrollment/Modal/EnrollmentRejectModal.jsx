// EnrollmentRejectModal.jsx
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import { Cross, Warning } from "../../../../assets/IconSet";

export default function EnrollmentRejectModal({
  open,
  onClose,
  student,
  onConfirm,
}) {
  const [remark, setRemark] = useState("");

  const handleConfirm = () => {
    if (!remark.trim()) return; // require remark
    onConfirm(remark);
    setRemark(""); // reset after submit
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
        <Typography variant="h6">Reject Enrollment</Typography>
        <IconButton onClick={onClose}>
          <Cross size="24px" color="#141414" />
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
        <Typography variant="body1" sx={{ mb: 2 }}>
          Are you sure you want to reject the enrollment of{" "}
          <strong>{student?.studentId?.name}</strong>?
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          required
        />
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
        <Button onClick={handleConfirm} variant="contained" color="error">
          Yes, Reject
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EnrollmentRejectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  student: PropTypes.object,
  onConfirm: PropTypes.func.isRequired,
};
