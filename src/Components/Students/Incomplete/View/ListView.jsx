import { Box, Table, TableContainer, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Table/Body";
import CustomeHeader from "../../../Common/Table/CustomeHeader";
import CustomePagination from "../../../Common/Table/CustomePagination";

export default function ListView({ limit = null, withContainer = true }) {
  const [studentProfiles, setStudentProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "contactNumber", label: "Contact Number" },
    { key: "bmdcNo", label: "BM&DC Reg." },
    { key: "incompleteReason", label: "Remarks" },
  ];

  const loadStudentsProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/students/incomplete");
      setStudentProfiles(data);
    } catch (err) {
      console.error("Error loading students:", err);
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudentsProfile();
  }, []);

  const displayedProfiles = limit
    ? studentProfiles.slice(0, limit)
    : studentProfiles.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

  // ---------- Download CSV ----------
  const downloadCSV = () => {
    if (!studentProfiles.length) {
      toast.error("No data to download");
      return;
    }

    const csvHeader = columns.map((col) => col.label).join(",");
    const csvRows = studentProfiles.map((student) =>
      columns
        .map((col) => {
          let value = student[col.key] ?? ""; // fallback if value is undefined
          if (typeof value === "string") {
            value = value.replace(/"/g, '""'); // escape double quotes
          }
          return `"${value}"`;
        })
        .join(",")
    );

    const csvContent = [csvHeader, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "incomplete_students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const Content = (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography>Total accounts:{studentProfiles.length}</Typography>
        <Button variant="contained" onClick={downloadCSV}>
          Download CSV
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <CustomeHeader
            columns={columns}
            includeActions={false}
            includeDrag={false}
          />
          <Body studentProfiles={displayedProfiles} loading={loading} />
          <CustomePagination
            count={studentProfiles.length}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </Table>
      </TableContainer>
    </>
  );

  return withContainer ? (
    <Box
      sx={{
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        borderRadius: "16px",
        p: 2,
        mt: 3,
      }}
    >
      {Content}
    </Box>
  ) : (
    Content
  );
}
