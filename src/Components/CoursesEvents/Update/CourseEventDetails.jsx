import { Box, Stack, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";

export default function CourseEventDetails({ details, handleQuillChange }) {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link"], // Adding image option
      [{ align: [] }],
    ],
  };
  return (
    <Stack gap="16px">
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        Details
      </Typography>
      <Box>
        <ReactQuill
          modules={modules}
          className="custom-quill ql-container ql-snow ql-editor"
          value={details}
          onChange={handleQuillChange}
          placeholder="Write information here..."
        />
      </Box>
    </Stack>
  );
}

// Define PropTypes
CourseEventDetails.propTypes = {
  details: PropTypes.string.isRequired, // The content for the Quill editor, should be a string
  handleQuillChange: PropTypes.func.isRequired, // Callback for handling editor changes
};
