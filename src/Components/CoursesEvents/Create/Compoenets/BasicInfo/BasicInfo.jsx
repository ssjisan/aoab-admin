import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Calender, DownArrow, Remove } from "../../../../../assets/IconSet";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PropTypes from "prop-types";

export default function BasicInfo({
  courses,
  selectedCourses,
  setSelectedCourses,
  handleStartDateChange,
  handleEndDateChange,
  title,
  setTitle,
  location,
  setLocation,
  fees,
  setFees,
  startDate,
  endDate,
  contactPersons,
  startDateError,
  endDateError,
  handleContactChange,
  addContact,
  removeContact,
}) {
  const CalenderIcon = () => {
    return <Calender color="grey" size={24} />;
  };
  const ExpandMoreIcon = () => {
    return (
      <div style={{ marginRight: "12px" }}>
        <DownArrow size="20px" color="#000" />
      </div>
    );
  };

  return (
    <Stack
      gap="24px"
      sx={{
        width: {
          xs: "100%", // ≤600px
          sm: "100%", // >600px
          md: "50%", // >900px
        },
        mb:"40px"
      }}
    >
      <FormControl fullWidth>
        <InputLabel>AO Course</InputLabel>
        <Select
          value={selectedCourses ? selectedCourses._id : ""}
          label="AO Course"
          onChange={(event) => {
            const selectedCourse = courses.find(
              (course) => course._id === event.target.value
            );
            setSelectedCourses(selectedCourse);
            console.log("Selected Course ID:", selectedCourse._id);
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
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <Stack direction="row" gap="24px">
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
        />
        <TextField
          label="Fee"
          type="number"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
          fullWidth
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </Stack>
      <Stack direction="row" gap="24px">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            slots={{
              openPickerIcon: CalenderIcon,
            }}
            label="Start Date"
            value={startDate ? dayjs(startDate) : null} // Convert stored date back to dayjs object for display
            format="DD/MM/YYYY"
            onChange={handleStartDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!startDateError, // Show red outline if there's an error
                helperText: startDateError, // Show error message
              },
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            slots={{
              openPickerIcon: CalenderIcon,
            }}
            label="End Date"
            value={endDate ? dayjs(endDate) : null} // Convert stored date back to dayjs object for display
            format="DD/MM/YYYY"
            onChange={handleEndDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!endDateError, // Show red outline if there's an error
                helperText: endDateError, // Show error message
              },
            }}
          />
        </LocalizationProvider>
      </Stack>
      {contactPersons.map((person, index) => (
        <Stack direction="row" gap="24px" key={index} alignItems="center">
          <TextField
            label="Contact Person"
            value={person.name}
            onChange={(e) => handleContactChange(index, "name", e.target.value)}
            fullWidth
          />
          <TextField
            label="Contact Email"
            value={person.email}
            onChange={(e) =>
              handleContactChange(index, "email", e.target.value)
            }
            fullWidth
          />
          {contactPersons.length > 1 && (
            <Button
              onClick={() => removeContact(index)}
              color="error"
              startIcon={<Remove color="#DC3545" size={20} />}
              sx={{ minWidth: "100px" }}
            >
              Remove
            </Button>
          )}
        </Stack>
      ))}
      <Button
        onClick={addContact}
        variant="soft"
        size="small"
        sx={{ width: "fit-content" }}
      >
        Add More
      </Button>
    </Stack>
  );
}

BasicInfo.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      courseName: PropTypes.string.isRequired,
    })
  ).isRequired,

  selectedCourses: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    courseName: PropTypes.string.isRequired,
  }),

  setSelectedCourses: PropTypes.func.isRequired,

  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,

  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,

  fees: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setFees: PropTypes.func.isRequired,

  startDate: PropTypes.string,
  setStartDate: PropTypes.func.isRequired,

  endDate: PropTypes.string,
  setEndDate: PropTypes.func.isRequired,

  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,

  contactPersons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  setContactPersons: PropTypes.func.isRequired,

  error: PropTypes.string,
  setError: PropTypes.func.isRequired,

  startDateError: PropTypes.string,
  setStartDateError: PropTypes.func.isRequired,

  endDateError: PropTypes.string,
  setEndDateError: PropTypes.func.isRequired,

  handleContactChange: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  removeContact: PropTypes.func.isRequired,
};
