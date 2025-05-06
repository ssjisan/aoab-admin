import { Box, Toolbar, Typography, useMediaQuery } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import { Stack } from "@mui/system";
import Setup from "../../Components/CoursesEvents/Setup/Setup";

export default function CourseSetup() {
  const drawerWidth = 280;
  const forBelow1200 = useMediaQuery("(max-width:1200px)");
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
          <Box sx={{ p: forBelow1200 ? "24px 0px" : "24px" }}>
            <Stack gap={2} sx={{ pb: "64px", width: "100%" }}>
              <Typography variant="h4" sx={{ mb: "40px" }}>
                Setup course
              </Typography>
              <Setup />
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
