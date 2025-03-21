import { Box, Typography } from "@mui/material";
import AddForm from "./AddForm";

export default function AddLinkForm() {
  return (
    <Box>
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h4">Add a Link</Typography>
      </Box>
      <AddForm />
    </Box>
  )
}
