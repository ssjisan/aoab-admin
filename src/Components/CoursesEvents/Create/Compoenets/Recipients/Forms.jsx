import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";

export default function Forms() {
  return (
    <Stack
        gap="16px"
        sx={{
          width: { xs: "100%", sm: "100%", md: "25%", lg: "25%" },
        }}
      >
        {/* Select Course */}
        <FormControl fullWidth size="small">
          <InputLabel id="course-select-label">AO Course</InputLabel>
          <Select
            labelId="course-select-label"
            value={selectedCourse ? selectedCourse._id : ""}
            label="AO Course"
            onChange={(event) => {
              const course = courses.find((c) => c._id === event.target.value);
              setSelectedCategoryCourse(course);
            }}
            IconComponent={ExpandMoreIcon}
          >
            {courses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.courseName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Search */}
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="soft"
                  onClick={handleApplyFilters}
                  size="small"
                  sx={{ height: "30px" }}
                >
                  Search
                </Button>
              </InputAdornment>
            ),
          }}
        />

        {/* Student Search Results */}
        {loading ? (
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        ) : studentProfiles.length === 0 ? (
          <Typography
            sx={{ mt: 2, fontStyle: "italic", color: "text.secondary" }}
          >
            No students found matching your search.
          </Typography>
        ) : (
          studentProfiles.map((student, i) => (
            <Stack
              key={i}
              sx={{
                p: 2,
                boxShadow:
                  "0 0 2px 0 rgba(145 158 171 / 0.2), 0 12px 24px -4px rgba(145 158 171 / 0.12)",
                borderRadius: "12px",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 500 }}
                color="text.secondary"
              >
                Name:{" "}
                <Box component="span" fontWeight={600} color="text.primary">
                  {student.name}
                </Box>
              </Typography>

              <Typography
                variant="body2"
                sx={{ fontWeight: 500 }}
                color="text.secondary"
              >
                BM&DC No:{" "}
                <Box component="span" fontWeight={600} color="text.primary">
                  {student.bmdcNo}
                </Box>
              </Typography>

              <Typography
                variant="body2"
                sx={{ fontWeight: 500 }}
                color="text.secondary"
              >
                Contact No:{" "}
                <Box component="span" fontWeight={600} color="text.primary">
                  0{student.contactNumber}
                </Box>
              </Typography>

              <Typography
                variant="body2"
                sx={{ fontWeight: 500 }}
                color="text.secondary"
              >
                Email:{" "}
                <Box component="span" fontWeight={600} color="text.primary">
                  {student.email}
                </Box>
              </Typography>

              <Button
                variant={isStudentAlreadyAdded(student._id) ? "text" : "soft"}
                sx={{ mt: "16px" }}
                disabled={isStudentAlreadyAdded(student._id)}
                onClick={() => handleAddStudent(student)}
              >
                {isStudentAlreadyAdded(student._id)
                  ? "Already added"
                  : "Add to list"}
              </Button>
            </Stack>
          ))
        )}
      </Stack>
  )
}
