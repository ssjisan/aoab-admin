import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Search from "./Search";
import { Typography, Box } from "@mui/material";

export default function View() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // ----------------- Functions -----------------
  const loadStudentsProfile = async (search = "") => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);

      const { data } = await axios.get(`/all-students?${params.toString()}`);
      setSearchResults(data);
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
        highlightMatch={highlightMatch}
      />
    </Box>
  );
}
