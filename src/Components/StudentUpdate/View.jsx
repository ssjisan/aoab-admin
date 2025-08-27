import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import Search from "./Search";
import { Typography, Box, Button, Paper } from "@mui/material";
import BasicInfo from "./BasicInfo";
import CourseTable from "./CourseTable";

export default function View() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log("User", selectedUser);

  // Editable fields
  const [studentId, setStudetnId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bmdcNo, setBmdcNo] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [courses, setCourses] = useState([]);
  console.log("Courses", courses);

  // ----------------- Functions -----------------
  const loadStudentsProfile = async (search = "") => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);

      const { data } = await axios.get(`/all-students?${params.toString()}`);
      setSearchResults(data);
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
      toast.error("Students Profile can't load");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!search.trim()) {
      toast.error("Please enter a search keyword.");
      return;
    }
    loadStudentsProfile(search);
  };

  const handleSelectUser = (student) => {
    setSelectedUser(student);
    setSearchResults([]);
    setStudetnId(student._id);
    setName(student.name);
    setEmail(student.email);
    setBmdcNo(student.bmdcNo);
    setContactNumber(student.contactNumber);
    setCourses(student.courses || []);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser?._id) return;
    try {
      const { data } = await axios.put(`/students/${selectedUser._id}`, {
        name,
        email,
        bmdcNo,
        contactNumber,
      });
      toast.success("User updated successfully");
      setSelectedUser("");
      setSearch("");
      setName("");
      setEmail("");
      setBmdcNo("");
      setContactNumber("");
      setCourses([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user", err.message);
    }
  };

  const highlightMatch = (text) => {
    if (!search) return text;

    // Convert everything to string for regex matching
    const str = String(text);

    const regex = new RegExp(`(${search})`, "i");
    const parts = str.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="font-semibold bg-yellow-300">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // ----------------- JSX -----------------
  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Edit User Details
      </Typography>
      <Search
        search={search}
        setSearch={setSearch}
        searchResults={searchResults}
        loading={loading}
        handleSearch={handleSearch}
        handleSelectUser={handleSelectUser}
        highlightMatch={highlightMatch}
      />
      {selectedUser && (
        <div style={{ marginBottom: "64px" }}>
          <BasicInfo
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            bmdcNo={bmdcNo}
            setBmdcNo={setBmdcNo}
            contactNumber={contactNumber}
            setContactNumber={setContactNumber}
            handleUpdateUser={handleUpdateUser}
          />

          <CourseTable
            courses={courses}
            studentId={studentId}
            onEditCourse={(course) => console.log("Edit course", course)}
          />
        </div>
      )}
      {/* Sticky Update Button */}
      {selectedUser && (
        <Paper
          elevation={3}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            p: 2,
            textAlign: "right",
            bgcolor: "white",
          }}
        >
        </Paper>
      )}
    </Box>
  );
}
