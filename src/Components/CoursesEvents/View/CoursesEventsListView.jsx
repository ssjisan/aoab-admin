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
  const [upcomingCourses, setUpcomingCourses] = useState([]);
  const [archivedCourses, setArchivedCourses] = useState([]);
  const [upcomingSkip, setUpcomingSkip] = useState(0);
  const [archivedSkip, setArchivedSkip] = useState(0);
  const [upcomingHasMore, setUpcomingHasMore] = useState(true);
  const [archivedHasMore, setArchivedHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const limit = 5;
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);

  useEffect(() => {
    loadCourses(true);
  }, [selectedTab]);

  const loadCourses = async (initial = false) => {
    if (loading) return;

    try {
      setLoading(true);

      const currentUpcomingSkip = initial ? 0 : upcomingSkip;
      const currentArchivedSkip = initial ? 0 : archivedSkip;

      const { data } = await axios.get("/courses/status", {
        params: {
          limit,
          upcomingSkip: currentUpcomingSkip,
          archivedSkip: currentArchivedSkip,
        },
      });

      if (initial) {
        setUpcomingCourses(data.upcomingCourses);
        setUpcomingSkip(limit);
        setUpcomingHasMore(data.upcomingCourses.length === limit);

        setArchivedCourses(data.archivedCourses);
        setArchivedSkip(limit);
        setArchivedHasMore(data.archivedCourses.length === limit);
      } else {
        if (selectedTab === "upcoming") {
          setUpcomingCourses((prev) => [...prev, ...data.upcomingCourses]);
          setUpcomingSkip(currentUpcomingSkip + limit);
          setUpcomingHasMore(data.upcomingCourses.length === limit);
        } else {
          setArchivedCourses((prev) => [...prev, ...data.archivedCourses]);
          setArchivedSkip(currentArchivedSkip + limit);
          setArchivedHasMore(data.archivedCourses.length === limit);
        }
      }
    } catch (err) {
      toast.error("Error loading courses");
    } finally {
      setLoading(false);
    }
  };
// Drag and change sequence end here //
  const coursesToDisplay =
    selectedTab === "upcoming" ? upcomingCourses : archivedCourses;
  const hasMore =
    selectedTab === "upcoming" ? upcomingHasMore : archivedHasMore;
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenMenu = (event, eventData) => {
    setOpen(event.currentTarget);
    setSelectedRowId(eventData);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handlePreview = (event) => {
    navigate(`/course_event/${event._id}`);
  };

  const redirectEdit = (event, data) => {
    event.preventDefault();
    navigate(`/course/${data._id}`);
  };

  const removeData = async (id) => {
    const toastId = toast.loading("Deleting...");
    try {
      const { data } = await axios.delete(`/courses_events/${id}`);
      toast.dismiss(toastId);
      toast.success(data.message || "Course or Event deleted successfully");
      const updateState =
        selectedTab === "upcoming" ? setUpcomingCourses : setArchivedCourses;
      updateState((prev) => prev.filter((course) => course._id !== id));
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Unable to delete course or event at the moment.");
    }
  };

  const handleRemove = () => {
    if (dataToDelete) {
      removeData(dataToDelete._id);
      setIsModalOpen(false);
      setDataToDelete(null);
    }
  };

  // Drag and change sequence start here //

  const onDragEnd = async (result) => {
    if (selectedTab !== "upcoming") return; // Only allow drag in 'running' tab
    if (!result.destination) return;

    const reorderedCourseEvent = Array.from(upcomingCourses);
    const [movedResource] = reorderedCourseEvent.splice(result.source.index, 1);
    reorderedCourseEvent.splice(result.destination.index, 0, movedResource);
    setUpcomingCourses(reorderedCourseEvent);

    try {
      await axios.post("/update-course-event-order", { reorderedCourseEvent });
      toast.success("Courses & Events order updated successfully!");
    } catch (error) {
      toast.error("Failed to update courses & events order.");
    }
  };

  
console.log(selectedTab);

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
          <Tab label="Upcoming Courses" value="upcoming" />
          <Tab label="Archived Courses" value="archived" />
        </Tabs>
        <Table sx={{ mt: "16px" }}>
          <Header selectedTab={selectedTab} />
          <Body
            coursesEvents={coursesToDisplay}
            selectedTab={selectedTab}
            open={open}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
            showModal={showModal}
            selectedRowId={selectedRowId}
            setDataToDelete={setDataToDelete}
            setIsModalOpen={setIsModalOpen}
            handlePreview={handlePreview}
            redirectEdit={redirectEdit}
            onDragEnd={onDragEnd}
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
              onClick={() => loadCourses(false)}
              variant="contained"
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
