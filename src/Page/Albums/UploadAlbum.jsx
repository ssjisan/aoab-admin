import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import UploadNewAlbum from "../../Components/Albums/UploadAlbum/UploadNewAlbum";
export default function UploadAlbum() {
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
          <UploadNewAlbum />
        </Box>
      </Box>
    </Box>
  );
}
