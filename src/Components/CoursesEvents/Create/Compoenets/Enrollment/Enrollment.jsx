import { Stack, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Calender } from "../../../../../assets/IconSet";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PropTypes from "prop-types";

export default function Enrollment({
  registrationStartDate,
  registrationStartDateError,
  handleRegistrationStartDateChange,
  registrationEndDate,
  registrationEndDateError,
  handleRegistrationEndDateChange,
  studentCap,
  setStudentCap,
  waitlistCap,
  setWaitlistCap,
  paymentReceiveStartDate,
  paymentReceiveStartDateError,
  handlePaymentReceiveStartDateChange,
  paymentReceiveEndDate,
  paymentReceiveEndDateError,
  handlePaymentReceiveEndDateChange,
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
      <Stack direction="row" gap="24px">
        <TextField
          label="Total Seat"
          value={studentCap}
          onChange={(e) => setStudentCap(e.target.value)}
          fullWidth
        />
        <TextField
          label="Waiting List"
          type="number"
          value={waitlistCap}
          onChange={(e) => setWaitlistCap(e.target.value)}
          fullWidth
        />
      </Stack>
      <Stack direction="row" gap="24px">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            slots={{
              openPickerIcon: CalenderIcon,
            }}
            label="Registration Start Date"
            value={registrationStartDate ? dayjs(registrationStartDate) : null} // Convert stored date back to dayjs object for display
            format="DD/MM/YYYY"
            onChange={handleRegistrationStartDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!registrationStartDateError, // Show red outline if there's an error
                helperText: registrationStartDateError, // Show error message
              },
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            slots={{
              openPickerIcon: CalenderIcon,
            }}
            label="Registration End Date"
            value={registrationEndDate ? dayjs(registrationEndDate) : null} // Convert stored date back to dayjs object for display
            format="DD/MM/YYYY"
            onChange={handleRegistrationEndDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!registrationEndDateError, // Show red outline if there's an error
                helperText: registrationEndDateError, // Show error message
              },
            }}
          />
        </LocalizationProvider>
      </Stack>
      <Stack direction="row" gap="24px">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            slots={{
              openPickerIcon: CalenderIcon,
            }}
            label="Payment Receive Start Date"
            value={
              paymentReceiveStartDate ? dayjs(paymentReceiveStartDate) : null
            } // Convert stored date back to dayjs object for display
            format="DD/MM/YYYY"
            onChange={handlePaymentReceiveStartDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!paymentReceiveStartDateError, // Show red outline if there's an error
                helperText: paymentReceiveStartDateError, // Show error message
              },
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            slots={{
              openPickerIcon: CalenderIcon,
            }}
            label="Payment Receive End Date"
            value={paymentReceiveEndDate ? dayjs(paymentReceiveEndDate) : null} // Convert stored date back to dayjs object for display
            format="DD/MM/YYYY"
            onChange={handlePaymentReceiveEndDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!paymentReceiveEndDateError, // Show red outline if there's an error
                helperText: paymentReceiveEndDateError, // Show error message
              },
            }}
          />
        </LocalizationProvider>
      </Stack>
    </Stack>
  );
}

Enrollment.propTypes = {
  studentCap: PropTypes.string.isRequired,
  setStudentCap: PropTypes.func.isRequired,

  waitlistCap: PropTypes.string.isRequired,
  setWaitlistCap: PropTypes.func.isRequired,

  fees: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setFees: PropTypes.func.isRequired,

  registrationStartDate: PropTypes.string,
  registrationEndDate: PropTypes.string,

  handleRegistrationStartDateChange: PropTypes.func.isRequired,
  handleRegistrationEndDateChange: PropTypes.func.isRequired,

  registrationStartDateError: PropTypes.string,

  registrationEndDateError: PropTypes.string,
  paymentReceiveStartDate: PropTypes.string,
  paymentReceiveStartDateError: PropTypes.string,
  handlePaymentReceiveStartDateChange: PropTypes.func.isRequired,
  paymentReceiveEndDate: PropTypes.string,
  paymentReceiveEndDateError: PropTypes.string,
  handlePaymentReceiveEndDateChange: PropTypes.func.isRequired,
};
