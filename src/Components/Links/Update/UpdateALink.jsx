import { Box, Typography } from '@mui/material'
import UpdateForm from './UpdateForm'

export default function UpdateALink() {
  return (
    <Box>
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h4">Update Link</Typography>
      </Box>
      <UpdateForm />
    </Box>
  )
}
