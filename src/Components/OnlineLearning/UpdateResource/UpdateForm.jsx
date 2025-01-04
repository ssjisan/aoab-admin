import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, CircularProgress, Grid, Stack, TextField } from "@mui/material";
import toast from "react-hot-toast";

export default function UpdateForm() {
  const { resourceId } = useParams(); // Get the resource ID from the URL
  const navigate = useNavigate();

  const [resourceData, setResourceData] = useState({
    title: "",
    link: "",
  });

  const [isUpdating, setIsUpdating] = useState(false); // State to manage button disabled status

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(`/resource/${resourceId}`);
        setResourceData({
          title: response.data.title,
          link: response.data.link,
        });
      } catch (err) {
        toast.error("Failed to fetch resource data");
      }
    };

    fetchResource();
  }, [resourceId]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setIsUpdating(true); // Disable the button

    try {
      await axios.put(`/resource/${resourceId}`, resourceData);
      toast.success("Resource updated successfully");
      navigate("/online_learning_list"); // Redirect to the resources route
    } catch (err) {
      toast.error("Failed to update resource");
    } finally {
      setIsUpdating(false); // Re-enable the button
    }
  };

  return (
    <Box sx={{ p: "24px" }} component="form" onSubmit={handleUpdate}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={resourceData.title}
              onChange={(e) =>
                setResourceData({ ...resourceData, title: e.target.value })
              }
            />
            <TextField
              label="Link"
              variant="outlined"
              fullWidth
              value={resourceData.link}
              onChange={(e) =>
                setResourceData({ ...resourceData, link: e.target.value })
              }
            />
            <Button
              variant="contained"
              type="submit"
              disabled={isUpdating}
              endIcon={isUpdating ? <CircularProgress color="inherit" size={24} /> : null}
            >
              {isUpdating ? "Updating" : "Update"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
