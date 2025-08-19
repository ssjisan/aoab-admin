import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import Search from "./Search";
import Editor from "./Editor";

export default function View() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Editable fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // ----------------- Functions -----------------
  const loadStudentsProfile = async (search = "") => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);

      const { data } = await axios.get(`/verified-accounts?${params.toString()}`);
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
    setName(student.name);
    setEmail(student.email);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser?._id) return;
    try {
      const { data } = await axios.put(`/students/${selectedUser._id}`, {
        name,
        email,
      });
      toast.success("User updated successfully");
      setSelectedUser(data.data);
      setSearch("")
setName("")
setEmail("")
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user");
    }
  };

  const highlightMatch = (text) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "i");
    const parts = text.split(regex);
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
    <div className="p-4">
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
        <Editor
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          handleUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
}