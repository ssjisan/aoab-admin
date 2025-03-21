import { Box, IconButton, Modal, useMediaQuery } from "@mui/material";
import { Cross } from "../../../assets/IconSet";
import PropTypes from "prop-types";

export default function VideoPlay({ videoOpen, handleVideoClose, source }) {
  const forBelow767 = useMediaQuery("(max-width:767px)");

  // Styles for the modal and video container
  const GalleryStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: forBelow767 ? "90%" : "70%", // 90% for mobile, 70% for larger screens
    height: "auto",
    p: 0,
    border: "0px solid transparent",
    boxShadow: 0,
    position: "relative",
  };

  const convertToEmbedUrl = (url) => {
    if (url.includes("youtube.com/watch?v=")) {
      // Strip out any additional parameters by splitting at '&'
      const videoId = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("drive.google.com/file/d/")) {
      const videoId = url.split("/d/")[1].split("/")[0];
      return `https://drive.google.com/file/d/${videoId}/preview`;
    }
    return ""; // Return an empty string if the format is not recognized
  };
  
  const embedUrl = source ? convertToEmbedUrl(source) : "";

  return (
    <Modal
      open={videoOpen}
      onClose={handleVideoClose}
      sx={{
        backdrop: {
          backgroundColor: "rgba(0, 32, 51, 0.64)",
        },
      }}
    >
      <Box sx={GalleryStyle}>
        {/* Close Button */}
        <IconButton
          onClick={handleVideoClose}
          sx={{
            position: "absolute",
            top: 10, // 10 pixels from the top
            right: 10, // 10 pixels from the right
            zIndex: "1000", // High z-index to keep it on top
            bgcolor: "white", // Button background color
            "&:hover": {
              bgcolor: "rgba(255, 0, 0, 0.5)", // Change color on hover
            },
          }}
        >
          <Cross size={24} color="red" />
        </IconButton>

        {/* Responsive Video Player */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 0,
            paddingBottom: "56.25%", // 16:9 Aspect Ratio
            overflow: "hidden",
          }}
        >
          <iframe
            src={embedUrl}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video Preview"
          />
        </Box>
      </Box>
    </Modal>
  );
}

VideoPlay.propTypes = {
  videoOpen: PropTypes.bool.isRequired, // Indicates whether the modal is open
  handleVideoClose: PropTypes.func.isRequired, // Function to close the modal
  source: PropTypes.string.isRequired, // The video URL to be played
};
