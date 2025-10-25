import { Box, Grid } from "@mui/material";
import UploadAlbumForm from "./UploadAlbumForm";
import UploadImagePreview from "./UploadImagePreview";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UploadNewAlbum() {
  const [images, setImages] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const navigate = useNavigate();

  // Handle image uploads
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const validImages = [];
    const rejected = [];

    files.forEach((file, index) => {
      if (file.size > 5 * 1024 * 1024) {
        rejected.push(file.name);
      } else {
        validImages.push({
          id: `${file.name}-${index}-${Date.now()}`,
          src: URL.createObjectURL(file),
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2),
          file,
        });
      }
    });

    if (rejected.length > 0) {
      setRejectedFiles((prev) => [...prev, ...rejected]);
      toast.error("Some files exceed the 5MB size limit");
    }

    setImages((prevImages) => [...prevImages, ...validImages]);
  };

  // Handle image removal
  const handleRemoveImage = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!albumName.trim()) {
      toast.error("Please enter an album name");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one valid image");
      return;
    }

    setIsSubmitting(true);

    let elapsedSeconds = 0;
    const toastId = toast.loading(`Uploading... 0s elapsed`);

    // Timer to update the toast every second
    const timer = setInterval(() => {
      elapsedSeconds += 1;
      toast.loading(`Uploading... ${elapsedSeconds}s elapsed`, { id: toastId });
    }, 1000);

    try {
      const formData = new FormData();
      formData.append("albumName", albumName);
      images.forEach((img) => {
        formData.append("images", img.file);
      });

      const response = await axios.post(`/create-album`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          toast.loading(
            `Uploading... ${progress}% | ${elapsedSeconds}s elapsed`,
            { id: toastId }
          );
        },
      });

      clearInterval(timer);

      if (response.data.success) {
        toast.success(`Album uploaded successfully in ${elapsedSeconds}s!`, {
          id: toastId,
        });
        setAlbumName("");
        setImages([]);
        setRejectedFiles([]);
        navigate("/album_list");
      } else {
        toast.error(response.data.error || "Failed to upload album", {
          id: toastId,
        });
      }
    } catch (error) {
      clearInterval(timer);
      console.error("Error uploading album:", error);
      toast.error("Failed to upload album", { id: toastId });
    } finally {
      clearInterval(timer);
      setIsSubmitting(false);
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
            setAlbumName={setAlbumName}
            isSubmitting={isSubmitting}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={9}>
          <UploadImagePreview
            images={images}
            setImages={setImages}
            handleRemoveImage={handleRemoveImage}
            rejectedFiles={rejectedFiles}
            isSubmitting={isSubmitting}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
