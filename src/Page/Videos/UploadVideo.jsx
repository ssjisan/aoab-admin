import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import UploadNewVideo from "../../Components/Videos/UploadVideo/UploadNewVideo";

export default function UploadVideo() {
  const drawerWidth = 280;

  return (
    <Box>
      <Sidebar />
      <Box
        component="main"
        sx={{
          p: 3,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        <Box>
          <UploadNewVideo />
        </Box>
      </Box>
    </Box>
  );
}
