import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import UpdateALink from "../../Components/Links/Update/UpdateALink";
export default function UpdateLink() {
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
        <UpdateALink />
      </Box>
    </Box>
  );
}
