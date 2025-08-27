import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  TextField,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { ArrowDown } from "../../assets/IconSet";

export default function BasicInfo({
  name,
  setName,
  email,
  setEmail,
  bmdcNo,
  setBmdcNo,
  contactNumber,
  setContactNumber,
  handleUpdateUser
}) {
  return (
    <Box sx={{ margin: "24px 16px" }}>
      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ArrowDown size="24px" color="#000"/>}>
          <Typography variant="subtitle1" fontWeight="bold">
            Basic Info
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="small"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="BMDC No"
                value={bmdcNo}
                onChange={(e) => setBmdcNo(Number(e.target.value))}
                size="small"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                size="small"
              />
            </Grid>
          </Grid>
            <Box sx={{p:"24px 0px"}}>
              <Button onClick={handleUpdateUser}>Update</Button>
            </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
