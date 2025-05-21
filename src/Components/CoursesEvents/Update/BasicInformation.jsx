import { Autocomplete, InputAdornment, Stack, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import PropTypes from "prop-types"; // Import PropTypes
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Calender } from "../../../assets/IconSet";
import dayjs from "dayjs";

export default function BasicInformation({
  title,
  setTitle,
  location,
  setLocation,
  language,
  fees,
  setFees,
  setLanguage,
  contactPerson,
  setContactPerson,
  contactMail,
  setContactMail,
  startDate,
  endDate,
  startDateError,
  endDateError,
  handleStartDateChange,
  handleEndDateChange,
  courses,
  selectedCourses,
  setSelectedCourses,
}) {
  const CalenderIcon = () => {
    return <Calender color="grey" size={24} />;
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
      }}
    >
      <Autocomplete
        multiple
        options={courses}
        getOptionLabel={(option) => option.courseName}
        value={selectedCourses}
        onChange={(event, newValue) => {
          setSelectedCourses(newValue);
          console.log(
            "Selected Course IDs:",
            newValue.map((course) => course._id)
          ); // ✅ Confirm you're getting the IDs
        }}
        renderInput={(params) => <TextField {...params} label="Ao Courses" />}
        sx={{ width: "100%" }}
      />
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
          label="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
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
      <Stack direction="row" gap="24px">
        <TextField
          label="Contact Person"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
          fullWidth
        />
        <TextField
          label="Contact Email"
          value={contactMail}
          onChange={(e) => setContactMail(e.target.value)}
          fullWidth
        />
      </Stack>
    </Stack>
  );
}

// Define PropTypes
BasicInformation.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
  fees: PropTypes.func.isRequired,
  setFees: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
  contactPerson: PropTypes.string.isRequired,
  setContactPerson: PropTypes.func.isRequired,
  contactMail: PropTypes.string.isRequired,
  setContactMail: PropTypes.func.isRequired,
  startDate: PropTypes.string, // Can be null or an ISO date string
  handleStartDateChange: PropTypes.func.isRequired,
  endDate: PropTypes.string, // Can be null or an ISO date string
  handleEndDateChange: PropTypes.func.isRequired,
  startDateError: PropTypes.string,
  endDateError: PropTypes.string,
  courses:PropTypes.any,
  selectedCourses:PropTypes.any,
  setSelectedCourses:PropTypes.any,
};
