import { Box, Typography } from "@mui/material";
import MainTable from "./MainTable";

export default function AllResources() {
  return (
    <Box>
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h4">All Resources</Typography>
      </Box>
      <MainTable />
    </Box>
  );
}
