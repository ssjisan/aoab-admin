import { Grid, useMediaQuery } from "@mui/material";
import Form from "./Form";
import View from "./View";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ConfirmationModal from "../../Common/RemoveConfirmation/ConfirmationModal";

export default function Setup() {
  const [name, setName] = useState("");
  const [typeOfParticipation, setTypeOfParticipation] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    if (!name) {
      toast.error("Please enter a course title.");
      return;
    }

    setLoading(true);

    try {
      if (selectedRowId) {
        // Editing existing
        const response = await axios.put(`/category_list/${selectedRowId._id}`, {
          courseName: name,
          typeOfParticipation: Number(typeOfParticipation),
        });

        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          toast.success("Successfully updated");
          setSelectedRowId(null); // Clear after edit
        }
      } else {
        // Adding new
        const response = await axios.post("/category_setup", {
          courseName: name,
          typeOfParticipation: Number(typeOfParticipation),
        });

        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          toast.success("Successfully added");
        }
      }

      setName("");
      setTypeOfParticipation(0);
      await loadLinks();
    } catch (error) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong.");
      }
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [courseSetup, setCourseSetup] = useState([]);
const isSmDown = useMediaQuery("(max-width:767px)");

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      const { data } = await axios.get("/category_list");
      setCourseSetup(data);
    } catch (err) {
      toast.error("Internal Error", err);
    }
  };

  // Dragging and reorder
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedSetupCourse = Array.from(courseSetup);
    const [movedResource] = reorderedSetupCourse.splice(result.source.index, 1);
    reorderedSetupCourse.splice(result.destination.index, 0, movedResource);
    setCourseSetup(reorderedSetupCourse);

    // Send reordered links IDs to the backend
    const reorderedIds = reorderedSetupCourse.map((link) => link._id);
    console.log("Sending reordered links to the server:", reorderedIds);

    try {
      await axios.post("/update-category-list-order", { reorderedSetupCourse });
      toast.success("List order updated successfully!");
    } catch (error) {
      console.error("Error updating list order:", error);
      toast.error("Failed to update list order.");
    }
  };

  const handleOpenMenu = (event, events) => {
    setOpen(event.currentTarget);
    setSelectedRowId(events);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRemove = async () => {
    if (!dataToDelete?._id) {
      toast.error("No item selected to delete.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.delete(`/category_list/${dataToDelete._id}`);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Successfully deleted");
        await loadLinks(); // reload the list
      }
    } catch (error) {
      console.error("Error deleting course setup:", error);
      toast.error(
        error.response?.data?.error || "Failed to delete course setup."
      );
    } finally {
      setLoading(false);
      setIsModalOpen(false); // Close the confirmation modal
      setDataToDelete(null); // Clear the selected item
    }
  };

  const redirectEdit = (rowData) => {
    if (!rowData) return;
    console.log(rowData);

    setName(rowData.courseName);
    setTypeOfParticipation(rowData.typeOfParticipation);
    setSelectedRowId(rowData);
  };

  return (
    <Grid
      container
      spacing={2}
      
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={3}
        lg={3}
        sx={{
          position: isSmDown ? "static" : "sticky",
          top: isSmDown ? "auto" : "80px", // adjust depending on your header height
          alignSelf: "flex-start",
          zIndex: 1,
          backgroundColor: "#fff",
        }}
      >
        <Form
          name={name}
          setName={setName}
          typeOfParticipation={typeOfParticipation}
          setTypeOfParticipation={setTypeOfParticipation}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={9}
        lg={9}
        sx={{
          height: "100%",
          overflowY: "auto",
          pr: 1,
        }}
      >
        <View
          courseSetup={courseSetup}
          onDragEnd={onDragEnd}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          handleCloseMenu={handleCloseMenu}
          handleOpenMenu={handleOpenMenu}
          open={open}
          selectedRowId={selectedRowId}
          dataToDelete={dataToDelete}
          setDataToDelete={setDataToDelete}
          setIsModalOpen={setIsModalOpen}
          redirectEdit={redirectEdit}
        />
        <ConfirmationModal
          open={isModalOpen}
          title="Delete important links"
          itemName={dataToDelete?.courseName || ""}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleRemove}
        />
      </Grid>
    </Grid>
  );
}
