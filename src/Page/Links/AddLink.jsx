import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import AddLinkForm from "../../Components/Links/Add/AddLinkForm";
export default function AddLink() {
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
        <AddLinkForm />
      </Box>
    </Box>
  );
}
