import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import PreviewTopBar from "./PreviewTopBar";
import { Calender } from "../../../assets/IconSet";

export default function PreviewBody() {
  const { id } = useParams();
  const [courseEvent, setCourseEvent] = useState(null); // Initialize blog as null

  useEffect(() => {
    loadBlog();
  }, []);

  const loadBlog = async () => {
    try {
      const { data } = await axios.get(`/courses_events/${id}`);
      setCourseEvent(data); // Store the blog data
    } catch (err) {
      toast.error("Error loading blog details");
    }
  };

  if (!courseEvent) {
    // Add a loading indicator or a placeholder when courseEvent data is not available yet
    return <Typography>Loading...</Typography>;
  }
  const formattedDate = new Date(courseEvent.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  return (
    <Box>
      <PreviewTopBar id={id} />
      <Container
        sx={{ mt: "64px", mb: "64px", width: "960px", maxWidth: "100%" }}
      >
        <Box sx={{ width: "100%", height: "480px", mb: "48px" }}>
          {/* Check if coverPhoto and coverPhoto[0] exist before rendering */}
          {courseEvent.coverPhoto && courseEvent.coverPhoto[0] ? (
            <img
              src={courseEvent.coverPhoto[0].url}
              alt={courseEvent.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Typography>No cover photo available</Typography>
          )}
        </Box>
        <Typography variant="h3" sx={{ mt: 2 }}>
          {courseEvent.title}
        </Typography>
        <Stack gap="16px" sx={{mt:"48px"}} flexDirection="row" justifyContent="space-between">
          <Stack gap="8px" flexDirection="row">
            <Calender color="#008549" size={24}/>
            <Typography variant="body1" color="text.secondary">
              {formattedDate} &nbsp; - &nbsp; {formattedDate}
            </Typography>
          </Stack>
          <Stack gap="0px" flexDirection="column">
          <Typography variant="body2" color="text.secondary">Enrollment Fee</Typography>
            <Typography variant="h6" color="text.primary">
              {courseEvent.fees}
            </Typography>
          </Stack>
          <Button variant="contained">Register</Button>
        </Stack>
        <Typography
          sx={{ whiteSpace: "pre-wrap" }} // Ensure white space is preserved
          dangerouslySetInnerHTML={{ __html: courseEvent.details }} // Render HTML content safely
        />
      </Container>
    </Box>
  );
}
