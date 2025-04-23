import { Box, Table, TableContainer } from "@mui/material";
import Body from "./Body";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import VideoPlay from "../../VideoPlay/VideoPlay";
import { useNavigate } from "react-router-dom";
import CustomeHeader from "../../../Common/Table/CustomeHeader";
import CustomePagination from "../../../Common/Table/CustomePagination";
import ConfirmationModal from "../../../Common/RemoveConfirmation/ConfirmationModal";

export default function TableViewer() {
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
      const loadingToastId = toast.loading("Deleting video..."); // Show loading toast
      await axios.delete(`/video/${slug}`); // Perform DELETE request with slug
      setVideos(videos.filter((video) => video.slug !== slug)); // Remove the deleted video from the state
      toast.success("Video deleted successfully!", { id: loadingToastId }); // Dismiss loading toast and show success toast
    } catch (error) {
      toast.error("Failed to delete video."); // Dismiss loading toast and show error toast
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

  // ***************** Table Header Columns ************************* //

  const columns = [
    { key: "video title", label: "Video Title" },
    { key: "source	", label: "Source	" },
    { key: "upload date	", label: "Upload Date" },
  ];

  // ***************** Table Header Columns ************************* //

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
          <CustomeHeader
            columns={columns}
            includeActions={true}
            includeDrag={true}
          />
          <Body
            videos={videos.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
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
          <CustomePagination
            count={videos.length}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </Table>
      </TableContainer>
      <VideoPlay
        videoOpen={videoOpen}
        handleVideoClose={handleVideoClose}
        source={selectedVideo?.url}
      />
      <ConfirmationModal
        open={confirmationModalOpen}
        title="Delete Video"
        itemName={videoToDelete?.title || ""}
        onClose={handleCloseRemoveAlbum}
        onConfirm={handleConfirmRemove}
      />
    </Box>
  );
}
