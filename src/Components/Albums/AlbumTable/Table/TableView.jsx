import { Box, Table, TableContainer } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Body";
import Pagination from "./Pagination";
import RemoveAlbum from "../../RemoveAlbum/RemoveAlbum";
import Gallery from "../../GalleryViewer/Gallery";
import { useNavigate } from "react-router-dom";

export default function TableView() {
  const [albums, setAlbums] = useState([]);
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState(null);
  const [albumOpen, setAlbumOpen] = useState(false);
  const navigate = useNavigate();
  // Load Albums Start //
  useEffect(() => {
    loadAlbums();
  }, []);
  const loadAlbums = async () => {
    try {
      const { data } = await axios.get("/albums");
      setAlbums(data);
    } catch (err) {
      toast.error("Check");
    }
  };

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
    setOpen(event.currentTarget);
    setSelectedAlbum(data);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  // Gallery Controller Start //

  const handleAlbumClose = () => setAlbumOpen(false);

  const handlePreviewAlbum = () => {
    setAlbumOpen(true);
    handleCloseMenu(); // Close popover
  };

  // Gallery Remove Controller Start //

  const handleCloseRemoveAlbum = () => {
    setConfirmationModalOpen(false);
  };
  const showConfirmationModal = () => {
    setAlbumToDelete(selectedAlbum);
    setConfirmationModalOpen(true);
    handleCloseMenu();
  };

  const removeProduct = async (id) => {
    try {
      // Show loading toast
      const loadingToastId = toast.loading("Deleting album...");
      await axios.delete(`/album/${id}`);
      // Remove the deleted album from the state
      setAlbums(albums.filter((album) => album._id !== id));
      // Dismiss loading toast and show success toast
      toast.success("Album deleted successfully!", { id: loadingToastId });
    } catch (error) {
      // Dismiss loading toast and show error toast
      toast.error("Failed to delete album.");
    }
  };

  const handleConfirmRemove = () => {
    if (albumToDelete) {
      removeProduct(albumToDelete._id);
      setConfirmationModalOpen(false);
      setAlbumToDelete(null);
    }
  };

  // Edit Album Controller Start

  const redirectEdit = (e, selectedAlbum) => {
    navigate(`/album/${selectedAlbum._id}`);
  };

  // Dragging and reorder
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedAlbums = Array.from(albums);
    const [movedAlbum] = reorderedAlbums.splice(result.source.index, 1);
    reorderedAlbums.splice(result.destination.index, 0, movedAlbum);
    setAlbums(reorderedAlbums);

    // Send reordered video IDs to the backend
    const reorderedIds = reorderedAlbums.map((album) => album._id);
    console.log("Sending reordered videos to the server:", reorderedIds);

    try {
      await axios.post("/update-album-order", { reorderedAlbums });
      toast.success("Album order updated successfully!");
    } catch (error) {
      console.error("Error updating album order:", error);
      toast.error("Failed to update album order.");
    }
  };

  return (
    <Box
      sx={{
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        borderRadius: "16px",
        p: 2,
        mt: 3,
      }}
    >
      <TableContainer>
        <Table>
          <Header />
          <Body
            onDragEnd={onDragEnd}
            albums={albums}
            page={page}
            rowsPerPage={rowsPerPage}
            open={open}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
            selectedAlbum={selectedAlbum}
            albumOpen={albumOpen}
            setAlbumOpen={setAlbumOpen}
            handlePreviewAlbum={handlePreviewAlbum}
            handleAlbumClose={handleAlbumClose}
            showConfirmationModal={showConfirmationModal}
            redirectEdit={redirectEdit}
          />
          <Pagination
            albums={albums}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Table>
      </TableContainer>
      <Gallery
        selectedImages={selectedAlbum?.images}
        handleAlbumClose={handleAlbumClose}
        albumOpen={albumOpen}
      />
      <RemoveAlbum
        confirmationModalOpen={confirmationModalOpen}
        albumName={albumToDelete ? albumToDelete.name : ""}
        setConfirmationModalOpen={setConfirmationModalOpen}
        handleCloseRemoveAlbum={handleCloseRemoveAlbum}
        handleConfirmRemove={handleConfirmRemove}
      />
    </Box>
  );
}
