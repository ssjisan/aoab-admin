import { Box, Grid } from "@mui/material";
import UploadVideoForm from "./UploadVideoForm";

export default function UploadNewVideo() {
  return (
    <Box sx={{ pl: "24px" }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={8} lg={5}>
          <UploadVideoForm />
        </Grid>
      </Grid>
    </Box>
  );
}
