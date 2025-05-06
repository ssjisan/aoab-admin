import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

export default function Form({
  name,
  setName,
  typeOfParticipation,
  setTypeOfParticipation,
  loading,
  handleSubmit,
}) {
  return (
    <Stack>
      <Stack gap="16px">
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Stack>
          <Typography variant="body1" sx={{ fontWeight: "700" }}>
            Participation type
          </Typography>
          <RadioGroup
            value={typeOfParticipation}
            onChange={(e) => setTypeOfParticipation(e.target.value)}
            row
          >
            <FormControlLabel value={0} control={<Radio />} label="Single" />
            <FormControlLabel value={1} control={<Radio />} label="Multiple" />
          </RadioGroup>
        </Stack>
        <Button
          variant="contained"
          sx={{ width: "120px" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Stack>
    </Stack>
  );
}

Form.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  typeOfParticipation: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setTypeOfParticipation: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
