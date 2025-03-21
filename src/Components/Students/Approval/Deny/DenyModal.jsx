import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Warning } from "../../../../assets/IconSet";

export default function DenyModal({
  isOpen,
  handleClose,
  data,
  handleDeny,
  remarks,
  setRemarks,
  loading,
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
            Student profile deny
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
            Are you sure you want to deny{" "}
            <strong>&quot;{data?.name}&quot;</strong>?
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
            onClick={handleDeny}
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

DenyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDeny: PropTypes.func.isRequired,
  data: PropTypes.isRequired,
  remarks: PropTypes.isRequired,
  setRemarks: PropTypes.isRequired,
  loading: PropTypes.isRequired,
};
