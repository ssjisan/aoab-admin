import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Video } from "../../../assets/IconSet";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdateVideoForm() {
  // State to store video data
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [image, setImage] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [embedUrl, setEmbedUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [videoType, setVideoType] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    loadVideo();
  }, []);

  const loadVideo = async () => {
    try {
      const { data } = await axios.get(`/video/${params.slug}`);
      setVideoTitle(data.title);
      setVideoUrl(data.url);
      const videoData = extractVideoId(data.url);
      setEmbedUrl(convertToEmbedUrl(videoData)); // Set initial embed URL
      setVideoType(videoData?.type || "");
      if (
        data.thumbnail &&
        Array.isArray(data.thumbnail) &&
        data.thumbnail.length > 0
      ) {
        setThumbnail(data.thumbnail[0].url);
      } else {
        setThumbnail("");
      }
    } catch (err) {
      toast.error("Failed to load video data");
    }
  };

  // Helper function to extract video ID from YouTube or Google Drive URL
  const extractVideoId = (url) => {
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:\S+\?v=))|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const googleDriveRegex =
      /(?:https:\/\/)?(?:drive\.google\.com\/file\/d\/|drive\.google\.com\/open\?id=)([a-zA-Z0-9_-]+)/;

    const youtubeMatch = url.match(youtubeRegex);
    const googleDriveMatch = url.match(googleDriveRegex);

    if (youtubeMatch) {
      return { id: youtubeMatch[1], type: "youtube" };
    }
    if (googleDriveMatch) {
      return { id: googleDriveMatch[1], type: "google-drive" };
    }
    return null;
  };

  // Helper function to convert video URL to an embed URL based on type
  const convertToEmbedUrl = (videoData) => {
    if (!videoData) return "";
    return videoData.type === "youtube"
      ? `https://www.youtube.com/embed/${videoData.id}`
      : `https://drive.google.com/file/d/${videoData.id}/preview`;
  };

  // Handler for video URL input change
  const handleVideoUrlChange = (e) => {
    const newUrl = e.target.value;
    setVideoUrl(newUrl);

    if (newUrl) {
      setIsLoading(true); // Show loader while video is being processed

      // Update embed URL when user changes the video URL
      const videoData = extractVideoId(newUrl);
      setEmbedUrl(convertToEmbedUrl(videoData));
      setVideoType(videoData?.type || "");
      setIsLoading(false);
    } else {
      setEmbedUrl(""); // Clear embed URL if input is empty
      setVideoType("");
      setIsLoading(false);
    }
  };

  // Handle thumbnail change
  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // Set new image file
      setThumbnail(URL.createObjectURL(e.target.files[0])); // Preview the new image
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setUploading(true); // Indicate that the update is in progress

    // Show the loading toast
    const loadingToastId = toast.loading("Updating video...");

    try {
      const formData = new FormData();
      formData.append("title", videoTitle);
      formData.append("url", videoUrl);

      // Append the image file if it exists
      if (image) {
        formData.append("thumbnail", image); // Use the image file here
      }

      const { data } = await axios.put(`/video/${params.slug}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle error response from the server
      if (data?.err) {
        toast.error("Video update failed", {
          id: loadingToastId, // Close the loading toast and show error message
        });
      } else {
        toast.success("Video updated successfully", {
          id: loadingToastId, // Close the loading toast and show success message
        });
        navigate("/video_list");
      }
    } catch (err) {
      // Show error message if request fails
      toast.error(`Update failed: ${err.message}`, {
        id: loadingToastId, // Close the loading toast and show error message
      });
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  return (
    <Box component="form" onSubmit={handleUpdate}>
      <Typography variant="h4" sx={{ mb: "40px" }}>
        Update video
      </Typography>
      <Stack direction="column" spacing={3}>
        <TextField
          label="Video Title"
          variant="outlined"
          fullWidth
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          sx={{ mb: 3 }}
        />
        <TextField
          label="YouTube or Google Drive Video Link"
          variant="outlined"
          fullWidth
          value={videoUrl}
          onChange={handleVideoUrlChange}
          placeholder="Paste a YouTube or Google Drive video link here"
        />

        {/* Thumbnail upload section if video is Google Drive */}
        {videoType === "google-drive" && (
          <Stack gap="16px">
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Thumbnail
            </Typography>
            <Box
              sx={{
                width: "320px",
                height: "180px",
                background: "#F6F7F8",
                borderRadius: "8px",
                border: "3px solid #fff",
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.12)",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() =>
                document.getElementById("thumbnail-upload-input").click()
              }
            >
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt="Video Thumbnail"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Stack sx={{ textAlign: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#919EAB",
                      fontWeight: 500,
                    }}
                  >
                    Click here to upload a thumbnail
                  </Typography>
                </Stack>
              )}
              <input
                type="file"
                hidden
                id="thumbnail-upload-input"
                accept="image/*"
                onChange={handleThumbnailChange}
              />
            </Box>
          </Stack>
        )}

        {/* Video Preview Section */}
        <Stack
          sx={{
            mt: "40px",
            width: "100%",
            height: "320px",
            backgroundImage:
              "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23333' stroke-width='1' stroke-dasharray='12' stroke-dashoffset='15' stroke-linecap='round'/%3e%3c/svg%3e\")",
            borderRadius: "16px",
            p: videoUrl ? "0px" :"16px"
          }}
          justifyContent={"center"}
          alignItems={"center"}
          gap="16px"
        >
          {isLoading ? (
            <CircularProgress size={48} />
          ) : embedUrl ? (
            <Stack
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video Preview"
              />
            </Stack>
          ) : (
            <Stack sx={{ height: "48px", width: "48px" }}>
              <Video size={"48px"} color="#637381" />
            </Stack>
          )}

          {!embedUrl && !isLoading && (
            <Typography variant="body1" color={"text.secondary"}>
              Paste a YouTube or Google Drive video link to preview it here.
            </Typography>
          )}
        </Stack>
        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 3 }}
          disabled={uploading}
        >
          {uploading ? "Updating..." : "Update"}
        </Button>
      </Stack>
    </Box>
  );
}
