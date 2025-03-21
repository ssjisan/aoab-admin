import { Box, Typography } from "@mui/material";
import ResourceForm from "./ResourceForm";

export default function AddResource() {
  return (
    <Box>
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h4">Add a resource</Typography>
      </Box>
      <ResourceForm />
    </Box>
  )
}
