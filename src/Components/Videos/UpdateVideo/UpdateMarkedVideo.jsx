import { Box, Grid, useMediaQuery } from "@mui/material";
import UpdateVideoForm from "./UpdateVideoForm";

export default function UpdateMarkedVideo() {
  const forBelow1200 = useMediaQuery("(min-width:1200px)");

  return (
    <Box sx={{ pl: forBelow1200 ? "24px" : "0px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={5}>
          <UpdateVideoForm />
        </Grid>
      </Grid>
    </Box>
  );
}
