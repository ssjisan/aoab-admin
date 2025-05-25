import { Stack } from "@mui/material";
import CourseEventCover from "./../../../Update/CourseEventCover";
import CourseEventDetails from "./../../../Update/CourseEventDetails";
import PropTypes from "prop-types";

export default function DetailsAndCover({
  details,
  handleQuillChange,
  coverPhoto,
  photoUploadError,
  handleCoverPhoto,
  removeImage,
}) {
  return (
    <Stack
      gap="24px"
      sx={{
        width: {
          xs: "100%", // ≤600px
          sm: "100%", // >600px
          md: "50%", // >900px
        },
        mb: "40px",
      }}
    >
      <CourseEventDetails
        details={details}
        handleQuillChange={handleQuillChange}
      />
      <CourseEventCover
        coverPhoto={coverPhoto}
        photoUploadError={photoUploadError}
        handleCoverPhoto={handleCoverPhoto}
        removeImage={removeImage}
      />
    </Stack>
  );
}
DetailsAndCover.propTypes = {
  details: PropTypes.string.isRequired,
  handleQuillChange: PropTypes.func.isRequired,
  coverPhoto: PropTypes.oneOfType([
    PropTypes.instanceOf(File),
    PropTypes.string,
    PropTypes.object,
    PropTypes.null,
  ]),
  photoUploadError: PropTypes.string,
  handleCoverPhoto: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
};

DetailsAndCover.defaultProps = {
  coverPhoto: null,
  photoUploadError: null,
};
