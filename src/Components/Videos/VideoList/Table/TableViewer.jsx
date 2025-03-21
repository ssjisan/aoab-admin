import { Box, Table, TableContainer } from "@mui/material";
import Body from "./Body";
import Header from "./Header";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import RemoveVideo from "../../RemoveVideo/RemoveVideo";
import VideoPlay from "../../VideoPlay/VideoPlay";
import { useNavigate } from "react-router-dom";

export default function TableViewer() {
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const navigate = useNavigate();

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
  console.log(videos);

  // Paginations Controller Start //

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Popover Menu Controller Start //

  const handleOpenMenu = (event, data) => {
    setSelectedVideo(data);
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const formatDate = (timestamp) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(timestamp).toLocaleString("en-GB", options);
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedVideos = Array.from(videos);
    const [movedVideo] = reorderedVideos.splice(result.source.index, 1);
    reorderedVideos.splice(result.destination.index, 0, movedVideo);
    setVideos(reorderedVideos);

    // Send reordered video IDs to the backend
    const reorderedIds = reorderedVideos.map((video) => video._id);
    console.log("Sending reordered videos to the server:", reorderedIds);

    try {
      await axios.post("/update-video-order", { reorderedVideos });
      toast.success("Video order updated successfully!");
    } catch (error) {
      console.error("Error updating video order:", error);
      toast.error("Failed to update video order.");
    }
  };

  // Album Remove Controller Start //

  const handleCloseRemoveAlbum = () => {
    setConfirmationModalOpen(false);
  };
  const showConfirmationModal = () => {
    setVideoToDelete(selectedVideo);
    setConfirmationModalOpen(true);
    handleCloseMenu();
  };

  const removeVideo = async (slug) => {
    console.log(slug);

    try {
      // Show loading toast
      const loadingToastId = toast.loading("Deleting video...");

      // Perform DELETE request with slug
      await axios.delete(`/video/${slug}`);

      // Remove the deleted video from the state
      setVideos(videos.filter((video) => video.slug !== slug));

      // Dismiss loading toast and show success toast
      toast.success("Video deleted successfully!", { id: loadingToastId });
    } catch (error) {
      // Dismiss loading toast and show error toast
      toast.error("Failed to delete video.");
    }
  };

  const handleConfirmRemove = () => {
    if (videoToDelete) {
      removeVideo(videoToDelete.slug);
      setConfirmationModalOpen(false);
      setVideoToDelete(null);
    }
  };

  // VideoPlay Controller Start //

  const handleVideoClose = () => setVideoOpen(false);

  const handleVideoPlay = () => {
    setVideoOpen(true);
    handleCloseMenu(); // Close popover
  };


  // Edit Video COntroller Start

  const redirectEdit = (e, selectedAlbum) => {
    navigate(`/video/${selectedAlbum.slug}`);
  };

  return (
    <Box
      sx={{
        p: 2,
        mt: 3,
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        borderRadius: "16px",
      }}
    >
      <TableContainer>
        <Table>
          <Header />
          <Body
            videos={videos}
            page={page}
            rowsPerPage={rowsPerPage}
            open={open}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
            formatDate={formatDate}
            onDragEnd={onDragEnd}
            showConfirmationModal={showConfirmationModal}
            selectedVideo={selectedVideo}
            handleVideoPlay={handleVideoPlay}
            redirectEdit={redirectEdit}
          />
          <Pagination
            videos={videos}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Table>
      </TableContainer>
      <VideoPlay videoOpen={videoOpen} handleVideoClose={handleVideoClose} source={selectedVideo?.url}/>
      <RemoveVideo
        confirmationModalOpen={confirmationModalOpen}
        videoName={videoToDelete ? videoToDelete.title : ""}
        setConfirmationModalOpen={setConfirmationModalOpen}
        handleCloseRemoveAlbum={handleCloseRemoveAlbum}
        handleConfirmRemove={handleConfirmRemove}
      />
    </Box>
  );
}
