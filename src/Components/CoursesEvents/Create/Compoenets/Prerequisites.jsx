import {
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Prerequisites({ courses }) {
  const [postGradRequired, setPostGradRequired] = useState("");
  const [requiresPrerequisite, setRequiresPrerequisite] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleCourseToggle = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  return (
    <Stack gap="24px">
      {/* Post Graduation Requirement */}
      <Stack gap="8px" sx={{ mb: "24px" }}>
        <Typography sx={{ fontWeight: 600 }} variant="body2">
          Post graduation Degree required?
        </Typography>
        <RadioGroup
          row
          value={postGradRequired}
          onChange={(e) => setPostGradRequired(e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>

        {/* Conditionally show Year From and To */}
        {postGradRequired === "yes" && (
          <Stack flexDirection="row" gap="8px">
            <Stack gap="4px">
              <Typography
                variant="body1"
                sx={{ fontWeight: "600" }}
                color="text.primary"
              >
                Year From
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                type="number"
                placeholder="Start Year (e.g., 2015)"
              />
            </Stack>
            <Stack gap="4px">
              <Typography
                variant="body1"
                sx={{ fontWeight: "600" }}
                color="text.primary"
              >
                Year To
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                type="number"
                placeholder="End Year (e.g., 2023)"
              />
            </Stack>
          </Stack>
        )}
      </Stack>

      {/* Prerequisite Courses */}
      <Stack>
        <Typography sx={{ fontWeight: 600 }} variant="body2">
          Are there any prerequisite courses that need to be completed before enrolling in this course?
        </Typography>
        <RadioGroup
          row
          value={requiresPrerequisite}
          onChange={(e) => setRequiresPrerequisite(e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>

        {/* Conditionally show course list */}
        {requiresPrerequisite === "yes" && (
          <>
            <Typography sx={{ fontWeight: 700, mt:"24px" }} variant="h6">
              List of course type
            </Typography>
            <Stack gap={1} pl={2}>
              {courses.map((course) => (
                <FormControlLabel
                  key={course._id}
                  control={
                    <Checkbox
                      checked={selectedCourses.includes(course._id)}
                      onChange={() => handleCourseToggle(course._id)}
                    />
                  }
                  label={course.courseName}
                />
              ))}
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
}
