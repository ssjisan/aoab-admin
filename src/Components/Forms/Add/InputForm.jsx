import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";

export default function InputForm() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    if (!title.trim() || !link.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post("/add_form", {
        title,
        link,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Form created successfully");
        // Optionally reset the form fields
        setTitle("");
        setLink("");
        navigate("/forms_list");
      }
    } catch (error) {
      toast.error("Failed to create form");
      console.error("Error creating form:", error);
    }
  };

  return (
    <Box sx={{ p: "24px" }} component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Link"
              variant="outlined"
              fullWidth
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
