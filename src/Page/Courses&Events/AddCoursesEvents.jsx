import { Box, Stack, Toolbar, Typography } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import Create from "../../Components/CoursesEvents/Create/Create";

export default function AddCoursesEvents() {
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
          <Stack
            sx={{
              p: "12px 0px",
              mb:"24px"
            }}
          >
            <Typography variant="h5">Create a new Event/Course</Typography>
          </Stack>
          <Create />
        </Box>
      </Box>
    </Box>
  );
}

