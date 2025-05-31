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
    <Box sx={{ background: "#f0f0f0", pb: "48px" }}>
      <PreviewTopBar id={id} />
      <Container sx={{ mt: "64px", width: "960px", maxWidth: "100%" }}>
        <Box sx={{ width: "100%", height: "480px" }}>
          {/* Check if coverPhoto and coverPhoto[0] exist before rendering */}
          {courseEvent.coverPhoto ? (
            <img
              src={courseEvent.coverPhoto.url}
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
        <Stack
          gap="16px"
          sx={{ mt: "48px" }}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Stack gap="16px">
            <Stack gap="8px" flexDirection="row">
              <Calender color="#008549" size={24} />
              <Typography variant="body1" color="text.primary">
                {formattedDate} &nbsp; - &nbsp; {formattedDate}
              </Typography>
            </Stack>
            <Stack gap="0px" flexDirection="column">
              <Stack gap="8px" flexDirection="row">
                <Calender color="#008549" size={24} />
                <Typography variant="body1" color="text.primary">
                  Enrollment Fee {courseEvent.fee} taka
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Button variant="contained">Register</Button>
        </Stack>
        {courseEvent.contactPersons &&
          courseEvent.contactPersons.length > 0 && (
            <Stack direction="row" spacing={2} mt={4} flexWrap="wrap">
              {courseEvent.contactPersons.map((person, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "12px",
                    backgroundColor: "#fafafa",
                    padding: "16px",
                    minWidth: "240px",
                    flex: "1 1 auto",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="700" gutterBottom>
                    Contact Person {index + 1}
                  </Typography>
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="span"
                    >
                      Name:&nbsp;
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      component="span"
                      fontWeight="600"
                    >
                      {person.name}
                    </Typography>
                  </Box>
                  {person.email && (
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="span"
                      >
                        Email:&nbsp;
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        component="span"
                        fontWeight="600"
                      >
                        {person.email}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>
          )}

        <Typography
          sx={{ whiteSpace: "pre-wrap" }} // Ensure white space is preserved
          dangerouslySetInnerHTML={{ __html: courseEvent.details }} // Render HTML content safely
        />
      </Container>
    </Box>
  );
}
