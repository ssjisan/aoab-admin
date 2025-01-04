import { Box, IconButton, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Cross } from "../../../assets/IconSet";

export default function CourseEventCover({
  coverPhoto,
  handleCoverPhoto,
  removeImage,
  error,
}) {
  return (
    <Stack gap="16px">
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        Cover
      </Typography>
      <Box
        onClick={() =>
          document.getElementById("blog-cover-upload-input").click()
        } // Click on the hidden input when the box is clicked
        sx={{
          width: "100%",
          height: "320px",
          background: "#F6F7F8",
          borderRadius: "8px",
          border: "3px solid #fff",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {coverPhoto ? (
          <>
            <img
              src={URL.createObjectURL(coverPhoto)}
              alt="Blog Cover"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <IconButton
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the image upload dialog when clicking on the remove button
                removeImage();
              }}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "#000",
                borderRadius: "100%",
                width: "32px",
                height: "32px",
                "&:hover": {
                  background: "#7A7A7A",
                },
              }}
            >
              <Cross size="24px" color="#fff" />
            </IconButton>
          </>
        ) : (
          <Stack sx={{ textAlign: "center" }}>
            <Typography
              color="text.primary"
              variant="h6"
              sx={{
                fontWeight: 500,
              }}
            >
              Click here to upload a cover
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#919EAB",
                fontWeight: 500,
              }}
            >
              Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 Mb
            </Typography>
          </Stack>
        )}

        <input
          type="file"
          hidden
          id="blog-cover-upload-input"
          accept="image/*"
          onChange={handleCoverPhoto} // Trigger the image upload
        />
      </Box>
      {error && (
        <Stack
          sx={{ p: "16px", backgroundColor: "#FFF2EF", borderRadius: "12px" }}
        >
          <Typography
            color="text.primary"
            variant="body2"
            sx={{
              fontWeight: 600,
            }}
          >
            {error.fileName} - {error.fileSize} Mb
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#919EAB",
              fontWeight: 500,
            }}
          >
            {error.message}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}

CourseEventCover.propTypes = {
  coverPhoto: PropTypes.any.isRequired,
  handleCoverPhoto: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
  error: PropTypes.any.isRequired,
};
