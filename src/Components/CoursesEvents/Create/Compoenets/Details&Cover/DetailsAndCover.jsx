import { Stack } from "@mui/material";
import CourseEventCover from "./../../../Update/CourseEventCover";
import CourseEventDetails from "./../../../Update/CourseEventDetails";

export default function DetailsAndCover() {
  return (
    <Stack
      gap="24px"
      sx={{
        width: {
          xs: "100%", // ≤600px
          sm: "100%", // >600px
          md: "50%", // >900px
        },
      }}
    >
      <CourseEventDetails />
      <CourseEventCover />
    </Stack>
  );
}
