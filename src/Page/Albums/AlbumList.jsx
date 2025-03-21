import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import AllAlbums from "../../Components/Albums/AlbumTable/AllAlbums";

export default function AlbumList() {
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
          <AllAlbums />
        </Box>
      </Box>
    </Box>
  );
}
