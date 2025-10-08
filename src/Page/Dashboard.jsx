import { Box, Grid, Toolbar, Typography, useMediaQuery } from "@mui/material";
import Sidebar from "../Layout/Sidebar";
import MatrixCardDeck from "../Components/Dashboard/MatrixCardDeck";
import WelcomeCard from "../Components/Dashboard/WelcomeCard/WelcomeCard";
import PieChart from "../Components/Dashboard/Analytics/PieChart";
import PendingStudents from "../Components/Dashboard/PendingStudents/PendingStudents";
import WrongEntry from "../Components/Dashboard/WrongEntry/WrongEntry";
import RadialChart from "../Components/Dashboard/Analytics/RadialChart";

export default function Dashboard() {
  const drawerWidth = 280;
  const forBelow1200 = useMediaQuery("(min-width:1200px)");

  return (
    <Box>
      <Sidebar />
      <Box
        component="main"
        sx={{
          p: forBelow1200 ? 3 : 2,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        <Box>
          <WelcomeCard />
          <Typography></Typography>
          <MatrixCardDeck />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <PieChart />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <PendingStudents />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <WrongEntry />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <RadialChart />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
