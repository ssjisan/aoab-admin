import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import UpdateAlbumForm from "./UpdateAlbumForm";
import UpdateImagePreview from "./UpdateImagePreview";

export default function UpdateMarkedAlbum() {
  const { albumId } = useParams();
  const [albumName, setAlbumName] = useState("");
  const [images, setImages] = useState([]); // State for both existing and new images
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    loadAlbum();
  }, []);

  const loadAlbum = async () => {
    try {
      const { data } = await axios.get(`/album/${albumId}`);
      setAlbumName(data.name);
      const formattedImages = data.images.map((image) => ({
        src: image.src,
        public_id: image.public_id,
        size: image.size,
        name: image.name,
        _id: image._id,
        fromDatabase: true, // Existing image
      }));
      setImages(formattedImages); // Set the existing images
    } catch (err) {
      toast.error("Failed to load album data");
      console.error("Error loading album:", err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("albumName", albumName);

      // Add new images to the form data (only files)
      images.forEach((image) => {
        if (!image.fromDatabase) {
          formData.append("newImages", image.file); // Append actual file object
        }
      });

      // Add existing images' metadata
      const existingImages = images
        .filter((image) => image.fromDatabase)
        .map((image) => ({
          _id: image._id,
          public_id: image.public_id,
          src: image.src,
          name: image.name,
          size: image.size,
        }));

      formData.append("existingImages", JSON.stringify(existingImages));

      const { data } = await axios.put(`/album/${albumId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(data.message);
      navigate("/album_list"); // Redirect after success
    } catch (err) {
      console.error("Error updating album:", err);
      toast.error("Failed to update album");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: "24px 24px 0px 24px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <UpdateAlbumForm
            albumName={albumName}
            setAlbumName={setAlbumName}
            images={images} // Pass the combined images array to the form
            setImages={setImages} // Pass the setter function to update images
            isLoading={isLoading} // Pass loading state to form
            handleSubmit={handleSubmit}
          />
        </Grid>
        <Grid item xs={12} lg={9}>
          <UpdateImagePreview
            images={images} // Use combined images state (existing + new)
            setImages={setImages} // Pass the setter function to update images
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
