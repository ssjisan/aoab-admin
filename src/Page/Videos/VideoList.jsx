import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import Allvideos from "../../Components/Videos/VideoList/Allvideos";

export default function VideoList() {
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
          <Allvideos />
        </Box>
      </Box>
    </Box>
  );
}
