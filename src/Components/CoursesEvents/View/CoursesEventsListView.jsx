import {
  Box,
  Button,
  Stack,
  Tab,
  Table,
  TableContainer,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Table/Body";
import Header from "./Table/Header";
import RemoveCourseEventModal from "../Remove/RemoveCourseEventModal";
import { useNavigate } from "react-router-dom";

export default function CoursesEventsListView() {
  const [coursesEvents, setCoursesEvents] = useState([]); // For set data from api
  const [skip, setSkip] = useState(0); // Track how many events to skip
  const [hasMore, setHasMore] = useState(true); // Whether there are more events to load
  const [loading, setLoading] = useState(false); // Track loading state
  const limit = 5; // Number of events to load per request
  const [selectedTab, setSelectedTab] = useState("running"); // Active tab state
  const navigate = useNavigate(); // For navigation
  const [open, setOpen] = useState(null); // For open pop up menu
  const [selectedRowId, setSelectedRowId] = useState(null); // Tracks the ID of the currently selected row to display the action menu.
  const [isModalOpen, setIsModalOpen] = useState(false); // For open remove modal
  const [dataToDelete, setDataToDelete] = useState(null); // For selected data to remove

  useEffect(() => {
    loadCoursesEvents(true); // Initial load or on tab change
  }, [selectedTab]);

  const loadCoursesEvents = async (initial = false) => {
    if (loading) return; // Prevent multiple requests
    if (!hasMore && !initial) return; // Stop if no more events

    try {
      setLoading(true);

      const currentSkip = initial ? 0 : skip;

      // Call the API with limit, skip, and status
      const { data } = await axios.get("/courses_events", {
        params: { limit, skip: currentSkip, status: selectedTab },
      });

      if (initial) {
        // Reset state on initial load or tab change
        setCoursesEvents(data.coursesEvents);
        setSkip(limit); // Reset skip for the next batch
      } else {
        // Append new events to the list
        setCoursesEvents((prev) => [...prev, ...data.coursesEvents]);
        setSkip(currentSkip + limit); // Increment skip for next batch
      }

      setHasMore(data.hasMore); // Update hasMore
    } catch (err) {
      toast.error("Error loading events");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSkip(0); // Reset skip
    setHasMore(true); // Reset hasMore
  };

  // Open the popup menu funtion start here //

  const handleOpenMenu = (event, eventData) => {
    setOpen(event.currentTarget);
    setSelectedRowId(eventData);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  // Open the popup menu funtion end here //

  // Drag and change sequence start here //

  const onDragEnd = async (result) => {
    if (selectedTab !== "running") return; // Only allow drag in 'running' tab
    if (!result.destination) return;

    const reorderedCourseEvent = Array.from(coursesEvents);
    const [movedResource] = reorderedCourseEvent.splice(result.source.index, 1);
    reorderedCourseEvent.splice(result.destination.index, 0, movedResource);
    setCoursesEvents(reorderedCourseEvent);

    try {
      await axios.post("/update-course-event-order", { reorderedCourseEvent });
      toast.success("Courses & Events order updated successfully!");
    } catch (error) {
      toast.error("Failed to update courses & events order.");
    }
  };

  // Drag and change sequence end here //

  // Open Up the remove modal Start Here //

  const showModal = () => {
    setIsModalOpen(true);
  };

  // Open up the remove modal end here //

  //  Navigate the Preview Event or COurse Start here //

  const handlePreview = (event) => {
    navigate(`/course_event/${event._id}`);
  };

  //  Navigate the Preview Event or COurse End here //

  // Navigate to update the selected row id start here //

  const redirectEdit = (event, data) => {
    event.preventDefault();
    navigate(`/course/${data._id}`);
  };

  // Remove Event or course Start here //

  const removeData = async (id) => {
    // Show a "deleting" toast
    const toastId = toast.loading("Deleting...");

    try {
      // Make a DELETE request to the backend to delete the resource by its ID
      const { data } = await axios.delete(`/courses_events/${id}`);

      // Notify the user of the successful deletion
      toast.dismiss(toastId); // Close the "deleting" toast
      toast.success(data.message || "Course or Event deleted successfully");

      // Update the state by filtering out the deleted resource
      setCoursesEvents((prevcoursesEvents) =>
        prevcoursesEvents.filter((courseEvent) => courseEvent._id !== id)
      );
    } catch (err) {
      console.error("Error deleting Course or Event:", err);

      // Close the "deleting" toast and show an error toast
      toast.dismiss(toastId);
      toast.error("Unable to delete course or event at the moment.");
    }
  };

  const handleRemove = () => {
    if (dataToDelete) {
      // Call the removeResource function with the ID of the resource to delete
      removeData(dataToDelete._id);

      // Close the modal and reset the resourceToDelete state
      setIsModalOpen(false);
      setDataToDelete(null);
    }
  };

  // Remove Event or course End here //

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
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Running Events" value="running" />
          <Tab label="Archived Events" value="archived" />
        </Tabs>
        <Table sx={{ mt: "16px" }}>
          <Header selectedTab={selectedTab} />
          <Body
            coursesEvents={coursesEvents}
            selectedTab={selectedTab} // Pass the selectedTab to Body
            open={open}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
            onDragEnd={onDragEnd}
            showModal={showModal}
            selectedRowId={selectedRowId}
            setDataToDelete={setDataToDelete}
            setIsModalOpen={setIsModalOpen}
            handlePreview={handlePreview}
            redirectEdit={redirectEdit}
          />
        </Table>
        {hasMore && !loading && (
          <Stack
            sx={{
              width: "100%",
              borderTop: 1,
              borderColor: "divider",
              pt: "16px",
            }}
            alignItems="flex-end"
          >
            <Button
              onClick={() => loadCoursesEvents(false)}
              variant="contained" // Changed to 'contained' for better visibility
              sx={{ width: "120px" }}
            >
              Load More
            </Button>
          </Stack>
        )}
        {loading && (
          <Stack alignItems="center" sx={{ pt: "16px" }}>
            <Typography variant="body1">Loading...</Typography>
          </Stack>
        )}
      </TableContainer>
      <RemoveCourseEventModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        resourceTitle={dataToDelete ? dataToDelete.title : ""}
        handleRemove={handleRemove}
      />
    </Box>
  );
}
