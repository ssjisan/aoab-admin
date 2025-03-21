import { Box, Grid, Toolbar, useMediaQuery } from "@mui/material";
import Sidebar from "../Layout/Sidebar";
import MatrixCardDeck from "../Components/Dashboard/MatrixCardDeck";
import DirectNavigation from "../Components/Dashboard/DirectNavigation/DirectNavigation";
import WelcomeCard from "../Components/Dashboard/WelcomeCard/WelcomeCard";

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
          <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} sm={12} md={7}>
              <WelcomeCard />
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <DirectNavigation />
            </Grid>
          </Grid>
          <MatrixCardDeck />
        </Box>
      </Box>
    </Box>
  );
}
