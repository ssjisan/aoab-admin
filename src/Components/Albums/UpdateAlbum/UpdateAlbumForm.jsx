import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AlbumAdd } from "../../../assets/IconSet";
import PropTypes from "prop-types";

export default function UpdateAlbumForm({
  albumName,
  setAlbumName,
  images, // New prop to handle the images array
  setImages, // Prop to update the images array
  isLoading,
  handleSubmit,
}) {
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      src: URL.createObjectURL(file), // Generate a preview URL
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2), // Convert size to MB
      file: file, // Store the actual file for uploading
      fromDatabase: false, // Mark as newly uploaded image
    }));

    setImages((prevImages) => [...prevImages, ...newImages]); // Add to existing images
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ mb: "40px" }}>
        Update Album
      </Typography>
      <Stack direction="column" spacing={3}>
        <TextField
          label="Album Name"
          variant="outlined"
          fullWidth
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)} // Update album name
          sx={{ mb: 3 }}
        />
        <Button
          color="inherit"
          variant="soft"
          startIcon={<AlbumAdd size="24px" color={"#060415"} />}
          component="label"
          sx={{ mb: 3 }}
        >
          Upload Image
          <input
            type="file"
            accept="image/*"
            hidden
            multiple
            onChange={handleFileUpload} // Handle file upload
          />
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading} // Disable button while loading
          endIcon={isLoading && <CircularProgress size={24} sx={{ color: "white" }} />}
        >
          Update Album
        </Button>
      </Stack>
    </Box>
  );
}

UpdateAlbumForm.propTypes = {
  albumName: PropTypes.string.isRequired,
  setAlbumName: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
