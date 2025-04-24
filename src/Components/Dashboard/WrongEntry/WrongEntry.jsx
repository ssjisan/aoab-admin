import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import ListView from "../../Students/EmailVerifiedError/View/ListView";

export default function WrongEntry() {
 
  return (
    <Box
      sx={{
        borderRadius: "16px",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        p: "0px 16px",
      }}
    >
      <Stack sx={{ p: "24px 0px 24px 8px", width: "100%" }}>
        <Typography variant="h6">
          Wrong Account Creation
        </Typography>
      </Stack>
      <ListView
        limit={5}
        showDeny={true}
        showPagination={false}
        withContainer={false}
      />
      <Stack
        alignItems="flex-end"
        sx={{
          borderTop: "1px solid rgba(145, 142, 175, 0.24)",
          p: "8px 0px",
          width: "100%",
        }}
      >
        <Button
          sx={{ width: "fit-content" }}
          component="a"
          href="/student_approval"
        >
          See All
        </Button>
      </Stack>
    </Box>
  );
}
