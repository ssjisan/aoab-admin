import { Box, Grid } from "@mui/material";
import UploadAlbumForm from "./UploadAlbumForm";
import UploadImagePreview from "./UploadImagePreview";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // Import react-hot-toast for notifications
import { useNavigate } from "react-router-dom";

export default function UploadNewAlbum() {
  const [images, setImages] = useState([]); // State to hold uploaded images
  const [isSubmitting, setIsSubmitting] = useState(false); // State for create button loading
  const [albumName, setAlbumName] = useState(""); // State for album name
  const navigate = useNavigate();
  // Handle image uploads
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file, index) => ({
      id: `${file.name}-${index}-${Date.now()}`, // Generate a unique id
      src: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2),
      file,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Handle image removal
  const handleRemoveImage = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  // Handle album form submission (send data to the backend)
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!albumName) {
      toast.error("Album name is required");
      return;
    }
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsSubmitting(true); // Show CircularProgress on create button

    // Prepare form data
    const formData = new FormData();
    formData.append("name", albumName); // Add the album name
    images.forEach((image) => {
      formData.append("images", image.file); // Append the image files
    });

    try {
      const response = await axios.post("/upload_album", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        navigate("/album_list");
        toast.success("Album created successfully");
        setAlbumName(""); // Clear album name
        setImages([]); // Clear uploaded images
      }
    } catch (error) {
      console.error("Error creating album:", error);

      // Handle specific errors from the backend
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;

        if (errorMessage.includes("File size too large")) {
          toast.error("File size too large. Maximum allowed is 10MB.");
        } else if (errorMessage.includes("E11000 duplicate key error")) {
          toast.error(
            "An album with this name already exists. Please choose a different name."
          );
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false); // Re-enable button after submission
    }
  };

  return (
    <Box sx={{ p: "24px 24px 0px 24px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <UploadAlbumForm
            onImageUpload={handleImageUpload}
            onFormSubmit={handleFormSubmit}
            albumName={albumName}
            setAlbumName={setAlbumName} // Pass the album name state and setter
            isSubmitting={isSubmitting} // Pass loading state to the form
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={9}>
          <UploadImagePreview
            images={images}
            setImages={setImages}
            handleRemoveImage={handleRemoveImage}
            isSubmitting={isSubmitting} // Pass submission state
          />
        </Grid>
      </Grid>
    </Box>
  );
}
