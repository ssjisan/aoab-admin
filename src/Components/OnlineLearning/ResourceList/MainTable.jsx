import { Box, Table, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Pagination from "./Table/Pagination";
import Body from "./Table/Body";
import Header from "./Table/Header";

import { useNavigate } from "react-router-dom";
import RemoveResourceModal from "../RemoveResource/RemoveResourceModal";

export default function MainTable() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const { data } = await axios.get("/resources");
      setResources(data);
    } catch (err) {
      toast.error("Resources can't load");
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

    const reorderedResources = Array.from(resources);
    const [movedResource] = reorderedResources.splice(result.source.index, 1);
    reorderedResources.splice(result.destination.index, 0, movedResource);
    setResources(reorderedResources);

    // Send reordered resources IDs to the backend
    const reorderedIds = reorderedResources.map((journal) => journal._id);
    console.log("Sending reordered resources to the server:", reorderedIds);

    try {
      await axios.post("/update-resource-order", { reorderedResources });
      toast.success("Resources order updated successfully!");
    } catch (error) {
      console.error("Error updating resources order:", error);
      toast.error("Failed to update resources order.");
    }
  };

  const removeResource = async (id) => {
    try {
      // Make a DELETE request to the backend to delete the resource by its ID
      const { data } = await axios.delete(`/resource/${id}`);

      // Notify the user of the successful deletion
      toast.success(data.message || "Resource deleted successfully");

      // Update the state by filtering out the deleted resource
      setResources((prevresources) =>
        prevresources.filter((resource) => resource._id !== id)
      );
    } catch (err) {
      console.error("Error deleting resource:", err);
      toast.error("Unable to delete resource at the moment.");
    }
  };

  const handleOpenMenu = (event, events) => {
    setOpen(event.currentTarget);
    setSelectedResource(events);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const redirectEdit = (event, data) => {
    event.preventDefault();
    navigate(`/resource/${data._id}`);
  };

  const handleRemove = () => {
    if (resourceToDelete) {
      // Call the removeResource function with the ID of the resource to delete
      removeResource(resourceToDelete._id);

      // Close the modal and reset the resourceToDelete state
      setIsModalOpen(false);
      setResourceToDelete(null);
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
            resources={resources}
            page={page}
            rowsPerPage={rowsPerPage}
            isModalOpen={isModalOpen}
            showModal={showModal}
            selectedResource={selectedResource}
            onDragEnd={onDragEnd}
            redirectEdit={redirectEdit}
            handleCloseMenu={handleCloseMenu}
            setIsModalOpen={setIsModalOpen}
            handleOpenMenu={handleOpenMenu}
            open={open}
            setResourceToDelete={setResourceToDelete}
          />
        </Table>
        <Pagination
          resources={resources}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
      <RemoveResourceModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        resourceTitle={resourceToDelete ? resourceToDelete.title : ""}
        handleRemove={handleRemove}
      />
    </Box>
  );
}
