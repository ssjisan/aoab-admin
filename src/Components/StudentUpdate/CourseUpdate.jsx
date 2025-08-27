import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function CourseUpdate({ open, onClose, courseData }) {
  const [formData, setFormData] = useState({
    courseId: "",
    courseName: "",
    completionYear: "",
    status: "",
    categoryId: "",
    documents: [],
  });
  console.log("courseData", courseData);

  useEffect(() => {
    if (courseData) {
      setFormData({
        studentId: courseData.studentId || "", // 👈 now it exists
        courseId: courseData._id || "",
        courseName: courseData.category?.courseName || "",
        completionYear: courseData.completionYear || "",
        status: courseData.status || "",
        categoryId: courseData.categoryId || "",
        documents: courseData.documents || [],
      });
    }
  }, [courseData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, documents: files }));
  };

  const handleSubmit = async () => {
    if (!formData.studentId) {
      toast.error("Student ID missing, cannot update.");
      return;
    }

    try {
      if (formData.courseId) {
        // Update existing course
        await axios.put(`/courses/${formData.studentId}/${formData.courseId}`, {
          status: formData.status,
          completionYear: formData.completionYear,
        });
      } else {
        // Create new course
        if (!formData.categoryId) {
          toast.error("Category ID missing, cannot create course.");
          return;
        }
        await axios.post(`/courses/${formData.studentId}`, {
          courseCategoryId: formData.categoryId, // required
          status: formData.status,
          completionYear: formData.completionYear,
        });
      }

      toast.success("Course saved successfully!");
      onClose();
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to save course");
    }
  };

  

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Update Course
        </Typography>

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {formData.courseName}
        </Typography>

        {/* Status */}
        <Box mt={2}>
          <Typography variant="body2" gutterBottom>
            Status
          </Typography>
          <RadioGroup
            row
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </Box>

        {/* Completion Year */}
        <TextField
          label="Completion Year"
          name="completionYear"
          value={formData.completionYear}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        {/* Documents */}
        <Box mt={2}>
          <Typography variant="body2" gutterBottom>
            Documents
          </Typography>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ marginBottom: "8px" }}
          />
          {formData.documents?.length > 0 && (
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              {formData.documents.map((doc, i) => (
                <li key={i}>
                  {doc.name || doc.originalname || "Unnamed File"}
                </li>
              ))}
            </ul>
          )}
        </Box>

        {/* Actions */}
        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
