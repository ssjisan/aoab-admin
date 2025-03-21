import { Box, Stack, Typography } from "@mui/material";
import { MatrixIconBlog } from "../../../assets/Icons/MatrixIconBlog";

export default function BlogCount() {
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
      <MatrixIconBlog />
      <Stack>
        <Typography variant="h4">0</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Total Blogs
        </Typography>
      </Stack>
    </Box>
  );
}
