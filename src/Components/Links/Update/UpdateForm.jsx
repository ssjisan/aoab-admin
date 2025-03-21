import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, CircularProgress, Grid, Stack, TextField } from "@mui/material";
import toast from "react-hot-toast";

export default function UpdateForm() {
  const { linkId } = useParams(); // Get the resource ID from the URL
  const navigate = useNavigate();

  const [linkData, setLinkData] = useState({
    title: "",
    link: "",
  });
console.log(linkData);

  const [isUpdating, setIsUpdating] = useState(false); // State to manage button disabled status

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(`/link/${linkId}`);
        setLinkData({
          title: response.data.title,
          link: response.data.link,
        });
      } catch (err) {
        toast.error("Failed to fetch link data");
      }
    };

    fetchResource();
  }, [linkId]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setIsUpdating(true); // Disable the button

    try {
      await axios.put(`/link/${linkId}`, linkData);
      toast.success("Link updated successfully");
      navigate("/links_list"); // Redirect to the resources route
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
              value={linkData.title}
              onChange={(e) =>
                setLinkData({ ...linkData, title: e.target.value })
              }
            />
            <TextField
              label="Link"
              variant="outlined"
              fullWidth
              value={linkData.link}
              onChange={(e) =>
                setLinkData({ ...linkData, link: e.target.value })
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
