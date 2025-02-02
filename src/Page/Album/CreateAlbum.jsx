import { Box, Toolbar, Typography } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import AddAlbum from "../../Components/Album/Add/AddAlbum";
export default function CreateAlbum() {
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
          <Typography variant="h4" sx={{ mb: "40px" }}>
            Create Album
          </Typography>
          <AddAlbum />
        </Box>
      </Box>
    </Box>
  );
}
