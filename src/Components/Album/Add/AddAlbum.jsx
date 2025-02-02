import { Grid } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // Import react-hot-toast for notifications
import { useNavigate } from "react-router-dom";
import AlbumDetails from "./AlbumDetails";
import ImageList from "./ImageList";

export default function AddAlbum() {
  const [images, setImages] = useState([]); // State to hold uploaded images
  const [isSubmitting, setIsSubmitting] = useState(false); // State for create button loading
  const [albumName, setAlbumName] = useState(""); // State for album name
  const navigate = useNavigate();
console.log(images);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];
  
    const newImages = files.map((file, index) => {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      const fileType = file.type;
  
      if (!ALLOWED_FORMATS.includes(fileType)) {
        return {
          id: `${file.name}-${index}-${Date.now()}`,
          name: file.name,
          size: sizeInMB,
          error: "Invalid format", // Mark invalid format as an error
        };
      }
  
      if (sizeInMB > 5) {
        return {
          id: `${file.name}-${index}-${Date.now()}`,
          name: file.name,
          size: sizeInMB,
          error: "File too large", // Mark oversized files
        };
      } else {
        return {
          id: `${file.name}-${index}-${Date.now()}`,
          src: URL.createObjectURL(file),
          name: file.name,
          size: sizeInMB,
          file,
          error: false,
        };
      }
    });
  
    // Separate valid and invalid images
  const validImages = newImages.filter((img) => !img.error); // Only valid images
  setImages((prevImages) => [...prevImages, ...validImages]); // Update state only with valid images

  // You can handle displaying errors separately using the newImages array
  };
  
  // Handle image removal
  const handleRemoveImage = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

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
  
    setIsSubmitting(true); // Disable button while uploading
    const uploadingToast = toast.loading("Uploading album...");
  
    const formData = new FormData();
    formData.append("name", albumName);
    images.forEach((image) => {
      formData.append("images", image.file);
    });
  
    try {
      const response = await axios.post("/create-album", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 201) {
        toast.dismiss(uploadingToast); // Remove uploading toast
        toast.success("Album created successfully"); // Show success toast
        navigate("/albums"); // Redirect
        setAlbumName("");
        setImages([]);
      }
    } catch (error) {
      toast.dismiss(uploadingToast); // Remove uploading toast
  
      let errorMessage = "Something went wrong. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
        if (errorMessage.includes("File size too large")) {
          errorMessage = "File size too large. Maximum allowed is 10MB.";
        } else if (errorMessage.includes("E11000 duplicate key error")) {
          errorMessage =
            "An album with this name already exists. Please choose a different name.";
        }
      }
      toast.error(errorMessage); // Show error toast
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };
  
  

  return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <AlbumDetails
            onImageUpload={handleImageUpload}
            onFormSubmit={handleFormSubmit}
            albumName={albumName}
            setAlbumName={setAlbumName} // Pass the album name state and setter
            isSubmitting={isSubmitting} // Pass loading state to the form
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={9}>
          <ImageList
            images={images}
            setImages={setImages}
            handleRemoveImage={handleRemoveImage}
            isSubmitting={isSubmitting} // Pass submission state
          />
        </Grid>
      </Grid>
  );
}
