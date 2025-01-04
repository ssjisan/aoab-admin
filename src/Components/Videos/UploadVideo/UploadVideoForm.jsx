import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UploadVideoForm() {
  // State to store video data
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [embedUrl, setEmbedUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [videoType, setVideoType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleVideoUrlChange = (e) => {
    const newUrl = e.target.value;
    setVideoUrl(newUrl);

    if (newUrl) {
      setIsLoading(true);

      const videoData = extractVideoId(newUrl);
      if (videoData) {
        const embedUrl =
          videoData.type === "youtube"
            ? `https://www.youtube.com/embed/${videoData.id}`
            : `https://drive.google.com/file/d/${videoData.id}/preview`;
        setEmbedUrl(embedUrl);
        setVideoType(videoData.type);
        setIsLoading(false);
      } else {
        setEmbedUrl("");
        setIsLoading(false);
        setVideoType("");
      }
    } else {
      setIsLoading(false);
      setEmbedUrl("");
      setVideoType("");
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError("");

    const loadingToast = toast.loading("Uploading video...");

    try {
      if (!videoTitle || !videoUrl) {
        toast.error("Please provide a valid video title and URL.", {
          id: loadingToast,
        });
        setUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", videoTitle);
      formData.append("url", videoUrl);
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      const { data } = await axios.post("/upload_video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.error) {
        toast.error(data.error, { id: loadingToast });
      } else {
        navigate("/video_list");
        toast.success("Video uploaded successfully!", { id: loadingToast });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while uploading the video.", {
        id: loadingToast,
      });
    } finally {
      setUploading(false);
      setTimeout(() => toast.dismiss(loadingToast), 3000);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ mb: "40px" }}>
        Upload a new video
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

        {videoType === "google-drive" && (
          <Stack gap="16px">
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Thumbnail
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "220px",
                background: "#F6F7F8",
                borderRadius: "8px",
                backgroundImage:
                  "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23333' stroke-width='1' stroke-dasharray='12' stroke-dashoffset='15' stroke-linecap='round'/%3e%3c/svg%3e\")",
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
                  src={URL.createObjectURL(thumbnail)}
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

        <Stack gap="16px">
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Video Preview
          </Typography>
          <Stack
            sx={{
              width: "100%",
              height: "320px",
              backgroundImage:
                "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23333' stroke-width='1' stroke-dasharray='12' stroke-dashoffset='15' stroke-linecap='round'/%3e%3c/svg%3e\")",
              borderRadius: "16px",
              p: videoUrl ? "0px" : "16px",
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
              <Typography
                variant="body1"
                color={"text.secondary"}
                sx={{ textAlign: "center" }}
              >
                Paste a YouTube or Google Drive video link to preview it here.
              </Typography>
            )}
          </Stack>
        </Stack>

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 3 }}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </Stack>
    </Box>
  );
}
