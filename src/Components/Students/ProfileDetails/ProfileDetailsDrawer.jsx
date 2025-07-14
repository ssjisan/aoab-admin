import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import { Cross } from "../../../assets/IconSet";
import ProfileCard from "./ProfileCard";
import AOACourses from "./AOACourses";
import BasicInfo from "./BasicInfo";
import Certificate from "./Certificate";
import PropTypes from "prop-types";

export default function ProfileDetailsDrawer({ studentProfile, onClose, open }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% - 48px)",
          height: "calc(100% - 80px)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
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

        <Box sx={{ flexGrow: 1, overflowY: "auto", p: "24px" }}>
          <Stack gap="24px">
            <ProfileCard profile={studentProfile} />
            <BasicInfo profile={studentProfile} />
            <Certificate profile={studentProfile} />
            <AOACourses profile={studentProfile} />
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}

ProfileDetailsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  studentProfile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    isAccountVerified: PropTypes.bool,
    aoaNo: PropTypes.string,
    signature: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        public_id: PropTypes.string,
      })
    ),
    postGraduationCertificates: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        public_id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    courses: PropTypes.array, // optionally you can define inner shape
  }).isRequired,
};
