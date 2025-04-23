import { Box, Stack, Typography } from "@mui/material";
import { MatrixIconVideos } from "../../../assets/Icons/MatrixIconVideos";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function VideoCount() {
    const [videos, setVideos] = useState([]);
  
 // Load Videos Start //
 useEffect(() => {
  loadVideos();
}, []);
const loadVideos = async () => {
  try {
    const { data } = await axios.get("/list_videos");
    setVideos(data);
  } catch (err) {
    toast.error("Problem loading videos");
  }
};
  return (
    <Box
      sx={{
        borderRadius: "16px",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        p: "40px 24px",
        display: "flex",
        gap: "24px",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <MatrixIconVideos />
      <Stack>
        <Typography variant="h4">{videos.length}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Total Videos
        </Typography>
      </Stack>
    </Box>
  );
}
