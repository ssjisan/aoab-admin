import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Warning } from "../../../../assets/IconSet";

export default function ConfirmationModal({
  isOpen,
  handleClose,
  data,
  remarks,
  setRemarks,
  loading,
  handleRejectEnrollments,
}) {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          borderRadius: "8px",
          width: "480px",
          maxWidth: "90%",
        }}
      >
        <Box
          sx={{
            p: "16px",
            borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Payment reject
          </Typography>
        </Box>
        <Stack
          gap="16px"
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            p: "24px 16px",
          }}
        >
          <Warning size="48px" color="#dc3545" />
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Are you sure you want to reject the payment for{" "}
            <strong>&quot;{data?.studentId?.name}&quot;</strong>? This action cannot be
            undone.
          </Typography>
        </Stack>
        <Stack sx={{ p: "16px 24px" }} gap="8px">
          <Typography sx={{ fontWeight: "700" }}>Remarks</Typography>
          <TextField
            fullWidth
            size="small"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            disabled={loading}
          />
        </Stack>
        <Stack
          direction={"row"}
          gap="16px"
          justifyContent={"flex-end"}
          sx={{ p: "16px", borderTop: "1px solid rgba(145, 158, 171, 0.24)" }}
        >
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleRejectEnrollments}
            variant="contained"
            color="error"
            disabled={loading}
          >
            {loading ? "Processing..." : "Yes, Deny"}
          </Button>
        </Stack>
      </div>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleRejectEnrollments: PropTypes.func.isRequired,
  data: PropTypes.isRequired,
  remarks: PropTypes.isRequired,
  setRemarks: PropTypes.isRequired,
  loading: PropTypes.isRequired,
};
