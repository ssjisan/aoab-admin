import { Box, Grid } from "@mui/material";
import UploadAlbumForm from "./UploadAlbumForm";
import UploadImagePreview from "./UploadImagePreview";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ⚙️ Cloudinary credentials
const CLOUD_NAME = "dzcpx6hrf";
const UPLOAD_PRESET = "aoa-albums-preset";

export default function UploadNewAlbum() {
  const [images, setImages] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const navigate = useNavigate();

  const MAX_FILE_SIZE_MB = 5;

  // ---------------------------------------------------------------------
  // 📤 Upload a single image to Cloudinary with progress
  // ---------------------------------------------------------------------
  const uploadToCloudinary = (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      xhr.open("POST", url);

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded * 100) / event.total);
          onProgress(percent);
        }
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } else {
            reject(new Error("Upload failed"));
          }
        }
      };

      xhr.send(formData);
    });
  };

  // ---------------------------------------------------------------------
  // 📁 Handle file selection & auto upload
  // ---------------------------------------------------------------------
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];
    const rejected = [];

    files.forEach((file, index) => {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        rejected.push(file.name);
      } else {
        validFiles.push({
          id: `${file.name}-${index}-${Date.now()}`,
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2),
          file,
          progress: 0,
          uploading: true,
          uploaded: false,
          src: URL.createObjectURL(file),
        });
      }
    });

    if (rejected.length > 0) {
      setRejectedFiles((prev) => [...prev, ...rejected]);
      toast.error(`Some files exceed the ${MAX_FILE_SIZE_MB}MB limit`);
    }

    setImages((prev) => [...prev, ...validFiles]);
    setIsUploading(true);

    for (const img of validFiles) {
      try {
        const res = await uploadToCloudinary(img.file, (percent) => {
          setImages((prev) =>
            prev.map((i) => (i.id === img.id ? { ...i, progress: percent } : i))
          );
        });

        // ✅ Upload completed
        setImages((prev) =>
          prev.map((i) =>
            i.id === img.id
              ? {
                  ...i,
                  src: res.secure_url,
                  public_id: res.public_id,
                  size: (res.bytes / (1024 * 1024)).toFixed(2),
                  uploading: false,
                  uploaded: true,
                  progress: 100,
                }
              : i
          )
        );
      } catch (error) {
        console.error("Cloudinary upload failed:", error);
        toast.error(`Failed to upload ${img.name}`);
        setImages((prev) => prev.filter((i) => i.id !== img.id));
      }
    }

    setIsUploading(false);
  };

  // ---------------------------------------------------------------------
  // 🗑️ Remove image from preview
  // ---------------------------------------------------------------------
  const handleRemoveImage = async (id, public_id) => {
    const toastId = toast.loading("Removing image...");

    try {
      // If public_id exists, call backend to remove from Cloudinary
      if (public_id) {
        const res = await axios.post("/delete-image", { public_id });

        if (!res.data.success) {
          toast.error(res.data.message || "Failed to remove image", {
            id: toastId,
          });
          return;
        }
      }

      // Remove from local state in any case
      setImages((prev) => prev.filter((img) => img.id !== id));
      toast.success("Image removed successfully!", { id: toastId });
    } catch (error) {
      console.error("Failed to remove image:", error);
      toast.error("Failed to remove image", { id: toastId });
    }
  };

  // ---------------------------------------------------------------------
  // 💾 Save album info to backend
  // ---------------------------------------------------------------------
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!albumName.trim()) {
      toast.error("Please enter an album name");
      return;
    }

    const uploadedImages = images.filter((img) => img.uploaded);
    if (uploadedImages.length === 0) {
      toast.error("Please upload at least one valid image");
      return;
    }

    setIsSaving(true);
    const toastId = toast.loading("Saving album...");

    try {
      const payload = {
        albumName,
        images: uploadedImages.map((img) => ({
          src: img.src,
          public_id: img.public_id,
          name: img.name,
          size: img.size,
        })),
      };

      const res = await axios.post("/create-album", payload);

      if (res.data.success) {
        toast.success("Album saved successfully!", { id: toastId });
        setAlbumName("");
        setImages([]);
        setRejectedFiles([]);
        navigate("/album_list");
      } else {
        toast.error(res.data.error || "Failed to save album", { id: toastId });
      }
    } catch (err) {
      console.error("Album save error:", err);
      toast.error("Failed to save album. Try again.", { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  // ---------------------------------------------------------------------
  // 🧩 Render
  // ---------------------------------------------------------------------
  return (
    <Box sx={{ p: "24px 24px 0px 24px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <UploadAlbumForm
            onImageUpload={handleImageUpload}
            onFormSubmit={handleFormSubmit}
            albumName={albumName}
            setAlbumName={setAlbumName}
            isSubmitting={isSaving || isUploading}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <UploadImagePreview
            images={images}
            setImages={setImages}
            handleRemoveImage={handleRemoveImage}
            rejectedFiles={rejectedFiles}
            isSubmitting={isSaving || isUploading}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
