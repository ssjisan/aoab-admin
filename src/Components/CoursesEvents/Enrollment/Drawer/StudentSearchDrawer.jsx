import { Box, Typography, TextField, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Plus } from "../../../../assets/IconSet";
import toast from "react-hot-toast";

export default function StudentSearchDrawer({ courseId }) {
  const drawerWidth = "320px";
  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async (query) => {
    if (!query || query.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      const res = await axios.get(
        `/enrollment/search/${courseId}?query=${query}`
      );
      setSearchResults(res.data.students || []); // <-- changed here
    } catch (err) {
      console.error("Error searching students:", err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Debounce effect
  useEffect(() => {
    const delay = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300); // 300ms debounce

    return () => clearTimeout(delay);
  }, [searchQuery]);

  const handleAddStudent = async (student) => {
  try {
    await axios.post(`/enrollment/${courseId}/add-student`, {
      studentId: student._id,
    });
    // Optional: show success toast
    toast.success(`${student.name} added successfully`);
    
    // Update UI to show dimmed/already enrolled
    setSearchResults((prev) =>
      prev.map((s) =>
        s._id === student._id
          ? { ...s, displayStatus: "completed", extraText: " (Already enrolled)" }
          : s
      )
    );
  } catch (err) {
    console.error("Error adding student:", err);
    toast.error(err.response?.data?.message || "Failed to add student");
  }
};


  return (
    <Box sx={{ width: drawerWidth, p: 2 }}>
      {/* Header */}
      <Box sx={{ p: "12px" }}>
        <Typography variant="h6">Add participants</Typography>
      </Box>

      {/* Search Input Field */}
      <Box sx={{ p: "12px" }}>
        <TextField
          fullWidth
          placeholder="Search by name, BMDC, email, mobile..."
          value={searchQuery}
          size="small"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <Box>
        {searchResults.map((student) => {
          let fontWeight = "normal";
          let color = "inherit";

          if (student.displayStatus === "pending") {
            fontWeight = "bold"; // eligible
          } else if (
            student.displayStatus === "completed" ||
            student.displayStatus === "notFound"
          ) {
            color = "#b0b0b0"; // dimmed
          }

          return (
            <Box
              key={student._id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1,
                borderBottom: "1px solid #eee",
                color,
                fontWeight,
              }}
            >
              <Box>
                {student.name} | {student.bmdcNo} | 0{student.contactNumber} |{" "}
                {student.email}
                {student.extraText}
              </Box>

              {/* Only show plus icon for bold/eligible students */}
              {student.displayStatus === "pending" && (
                <IconButton
                  size="small"
                  color="primary"
                    onClick={() => handleAddStudent(student)}
                >
                  <Plus size="24px" color="#00ae60" />
                </IconButton>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
