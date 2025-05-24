import {
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

export default function Prerequisites({
  courses,
  postGradRequired,
  setPostGradRequired,
  yearFrom,
  setYearFrom,
  yearTo,
  setYearTo,
  requiresPrerequisite,
  setRequiresPrerequisite,
  selectedPrerequisiteCourses,
  handleCourseToggle,
  restrictReenrollment,
  setRestrictReenrollment,
}) {
  return (
    <Stack gap="24px" mb="40px">
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
                value={yearFrom}
                onChange={(e) => setYearFrom(e.target.value)}
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
                value={yearTo}
                onChange={(e) => setYearTo(e.target.value)}
              />
            </Stack>
          </Stack>
        )}
      </Stack>

      {/* Prerequisite Courses */}
      <Stack>
        <Typography sx={{ fontWeight: 600 }} variant="body2">
          Are there any prerequisite courses that need to be completed before
          enrolling in this course?
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
            <Typography sx={{ fontWeight: 700, mt: "24px" }} variant="h6">
              List of course type
            </Typography>
            <Grid container spacing={2} pl={2}>
              {courses.map((course) => (
                <Grid item xs={12} sm={4} key={course._id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedPrerequisiteCourses.includes(
                          course._id
                        )}
                        onChange={() => handleCourseToggle(course._id)}
                      />
                    }
                    label={course.courseName}
                  />
                </Grid>
              ))}
            </Grid>

            <FormControlLabel
              sx={{ mt: 2 }}
              control={
                <Checkbox
                  checked={restrictReenrollment}
                  onChange={(e) => setRestrictReenrollment(e.target.checked)}
                />
              }
              label="Restrict Re-enrollment to this course category"
            />
          </>
        )}
      </Stack>
    </Stack>
  );
}

Prerequisites.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      courseName: PropTypes.string.isRequired,
    })
  ).isRequired,

  postGradRequired: PropTypes.oneOf(["yes", "no", ""]).isRequired,
  setPostGradRequired: PropTypes.func.isRequired,

  yearFrom: PropTypes.string.isRequired,
  setYearFrom: PropTypes.func.isRequired,

  yearTo: PropTypes.string.isRequired,
  setYearTo: PropTypes.func.isRequired,

  requiresPrerequisite: PropTypes.oneOf(["yes", "no", ""]).isRequired,
  setRequiresPrerequisite: PropTypes.func.isRequired,

  selectedPrerequisiteCourses: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleCourseToggle: PropTypes.func.isRequired,

  restrictReenrollment: PropTypes.bool.isRequired,
  setRestrictReenrollment: PropTypes.func.isRequired,
};
