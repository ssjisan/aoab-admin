import { Box, Stack, Typography } from "@mui/material";
import { MatrixIconVideos } from "../../../assets/Icons/MatrixIconVideos";

export default function VideoCount() {
 
  return (
    <Box
      sx={{
        borderRadius: "16px",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        p: "40px 24px",
        display: "flex",
        gap: "24px",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <MatrixIconVideos />
      <Stack>
        <Typography variant="h4">0</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Total Videos
        </Typography>
      </Stack>
    </Box>
  );
}
