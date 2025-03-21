import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import { Cross } from "../../../assets/IconSet";
import ProfileCard from "./ProfileCard";
import AOACourses from "./AOACourses";
import BasicInfo from "./BasicInfo";

export default function ProfileDetailsDrawer({
  studentProfile,
  onClose,
  open,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% - 48px)", // Leaves 24px on each side
          height: "calc(100% - 80px)", // Leaves 40px on top and bottom
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          overflow:"hidden"
        }}
      >
        {/* Fixed Header */}
        <Stack
          justifyContent="space-between"
          alignItems="center"
          flexDirection="row"
          sx={{
            p: "8px 16px",
            borderBottom: "1px solid #ddd",
            position: "sticky",
            top: 0,
            zIndex: 10,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h6">Student Profile</Typography>
          <IconButton onClick={onClose}>
            <Cross size={24} color="#000" />
          </IconButton>
        </Stack>

        {/* Scrollable Content */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: "24px" }}>
          <Stack gap="24px">
            <ProfileCard profile={studentProfile} />
            <BasicInfo profile={studentProfile} />
            <AOACourses profile={studentProfile} />
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
