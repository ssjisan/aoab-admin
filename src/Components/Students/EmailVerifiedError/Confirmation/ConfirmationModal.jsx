import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Confirmation } from "../../../../assets/IconSet";

export default function ConfirmationModal({
  isOpen,
  handleClose,
  data,
  handleApprove,
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
            Student profile approval
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
          <Confirmation size="48px" color="#6cba46" />
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Are you sure you want to approve{" "}
            <strong>&quot;{data?.name}&quot;</strong>?
          </Typography>
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
          <Button onClick={handleApprove} variant="contained" color="success">
            Yes, Approve
          </Button>
        </Stack>
      </div>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleApprove: PropTypes.func.isRequired,
  data: PropTypes.isRequired,
};
