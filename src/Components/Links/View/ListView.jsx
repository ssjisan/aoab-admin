import { Box, Table, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Pagination from "./Table/Pagination";
import Body from "./Table/Body";
import Header from "./Table/Header";

import { useNavigate } from "react-router-dom";
import RemoveModal from "../Remove/RemoveModal";

export default function ListView() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [links, setLinks] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      const { data } = await axios.get("/links");
      setLinks(data);
    } catch (err) {
      toast.error("Links can't load");
    }
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Dragging and reorder
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedLinks = Array.from(links);
    const [movedResource] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, movedResource);
    setLinks(reorderedLinks);

    // Send reordered links IDs to the backend
    const reorderedIds = reorderedLinks.map((link) => link._id);
    console.log("Sending reordered links to the server:", reorderedIds);

    try {
      await axios.post("/update-link-order", { reorderedLinks });
      toast.success("Links order updated successfully!");
    } catch (error) {
      console.error("Error updating links order:", error);
      toast.error("Failed to update links order.");
    }
  };

  const removeResource = async (id) => {
    try {
      // Make a DELETE request to the backend to delete the link by its ID
      const { data } = await axios.delete(`/link/${id}`);

      // Notify the user of the successful deletion
      toast.success(data.message || "Link deleted successfully");

      // Update the state by filtering out the deleted resource
      setLinks((prevlinks) =>
        prevlinks.filter((link) => link._id !== id)
      );
    } catch (err) {
      console.error("Error deleting link:", err);
      toast.error("Unable to delete link at the moment.");
    }
  };

  const handleOpenMenu = (event, events) => {
    setOpen(event.currentTarget);
    setSelectedRowId(events);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const redirectEdit = (event, data) => {
    event.preventDefault();
    navigate(`/link/${data._id}`);
  };

  const handleRemove = () => {
    if (dataToDelete) {
      // Call the removeResource function with the ID of the resource to delete
      removeResource(dataToDelete._id);

      // Close the modal and reset the dataToDelete state
      setIsModalOpen(false);
      setDataToDelete(null);
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
            links={links}
            page={page}
            rowsPerPage={rowsPerPage}
            isModalOpen={isModalOpen}
            showModal={showModal}
            selectedRowId={selectedRowId}
            onDragEnd={onDragEnd}
            redirectEdit={redirectEdit}
            handleCloseMenu={handleCloseMenu}
            setIsModalOpen={setIsModalOpen}
            handleOpenMenu={handleOpenMenu}
            open={open}
            setDataToDelete={setDataToDelete}
          />
        </Table>
        <Pagination
          links={links}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
      <RemoveModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        resourceTitle={dataToDelete ? dataToDelete.title : ""}
        handleRemove={handleRemove}
      />
    </Box>
  );
}
