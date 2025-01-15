import { Box, Typography } from "@mui/material";
import InputForm from "./InputForm";

export default function AddAForm() {
  return (
    <Box>
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h4">Add a Form</Typography>
      </Box>
      <InputForm />
    </Box>
  )
}
