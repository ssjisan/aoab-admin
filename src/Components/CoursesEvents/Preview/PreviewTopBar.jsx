import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PreviewTopBar({id}) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/courses_events_list");
  };
  const redirectEdit = () => {
    navigate(`/course/${id}`);
  };
  return (
    <Stack
      sx={{
        p: "24px 16px",
        borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
        background:"#fff"
      }}
      direction="row"
      justifyContent="space-between"
    >
      <Typography variant="h6">Preview</Typography>
      <Stack gap="16px" direction="row">
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          onClick={handleBack}
        >
          Close
        </Button>
        <Button variant="contained" size="small" onClick={redirectEdit}>
          Edit
        </Button>
      </Stack>
    </Stack>
  );
}
