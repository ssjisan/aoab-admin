import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import AddResource from "../../Components/OnlineLearning/AddResource/AddResource";
export default function AddOnlineLearning() {
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
        <AddResource />
      </Box>
    </Box>
  );
}
