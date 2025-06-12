import { Box, Toolbar, Typography } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import EnrollmentView from "../../Components/CoursesEvents/Enrollment/EnrollmentView";

export default function EnrollmentHistory() {
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
          <Box sx={{ p: "16px 16px 0px 16px" }}>
            <Typography variant="h4">Enrollment Details</Typography>
          </Box>
          <EnrollmentView/>
        </Box>
      </Box>
    </Box>
  )
}
