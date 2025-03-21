import { Box, Grid, Stack, Toolbar, Typography, useMediaQuery } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import AddForm from "../../Components/CoursesEvents/Add/AddForm";

export default function AddCoursesEvents() {
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
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={12} md={8} lg={7}>
                <Stack spacing={5}>
                  <Stack gap={2} sx={{ pb: "64px", width: "100%" }}>
                    <Typography variant="h4" sx={{ mb: "40px" }}>
                      Create a new Event/Course
                    </Typography>
                    <AddForm/>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
