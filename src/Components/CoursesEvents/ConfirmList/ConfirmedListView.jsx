import { Box, Table, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Table/Body";
import Header from "./Table/Header";
import { useParams } from "react-router-dom";
import Papa from "papaparse";

export default function ConfirmedListView() {
  const [loading, setLoading] = useState(false);
  const { courseId } = useParams();
  const [enrollmentDetails, setEnrollmentDetails] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    loadEnrollmentHistory(true);
  }, []);

  const loadEnrollmentHistory = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const res = await axios.get(`/enrollment-history/confirmed/${courseId}`);
      const enrollments = res.data;

      // Check how many have isAttend = true
      const marked = enrollments.filter((e) => e.isAttend);

      // If some are marked, select only them
      // If none are marked, select all
      const idsToSelect =
        marked.length > 0
          ? marked.map((e) => e._id)
          : enrollments.map((e) => e._id);

      setEnrollmentDetails(enrollments);
      setSelectedIds(idsToSelect);
    } catch (err) {
      toast.error(
        err?.response?.data?.error || "Error loading enrollment details"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Select all rows
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(enrollmentDetails.map((item) => item._id));
    } else {
      setSelectedIds([]);
    }
  };

  // ✅ Select one row
  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleMarkAsPresent = async () => {
    if (selectedIds.length === 0) {
      toast.error("No students selected.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(`/mark-attendance/${courseId}`, {
        ids: selectedIds,
        courseId,
      });

      toast.success(res.data.message || "Students marked as present.");
      loadEnrollmentHistory(); // Refresh the list
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------- Download CSV file start here ----------------------------------------------- //

  const handleDownloadCSV = () => {
    if (!enrollmentDetails.length) {
      toast.error("No data to download");
      return;
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}_${String(
      now.getMonth() + 1
    ).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}`;

    const formattedTime =
      now.getHours().toString().padStart(2, "0") +
      now.getMinutes().toString().padStart(2, "0");

    const fileName = `Enrollment_List_${formattedDate}_${formattedTime}.csv`;

    // Map enrollment data to CSV fields
    const filteredData = enrollmentDetails.map((enrollment) => ({
      Name: enrollment.studentId?.name || "",
      "BM&DC No": enrollment.studentId?.bmdcNo || "",
      Mobile: enrollment.studentId?.contactNumber || "",
      Email: enrollment.studentId?.email || "",
      Status: "", // always empty
    }));

    const csv = Papa.unparse(filteredData);

    // Trigger download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      sx={{
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        borderRadius: "16px",
        p: 2,
        mt: 3,
      }}
    >
      <TableContainer>
        <Table sx={{ mt: "16px" }}>
          <Header
            allSelected={selectedIds.length === enrollmentDetails.length}
            someSelected={
              selectedIds.length > 0 &&
              selectedIds.length < enrollmentDetails.length
            }
            handleSelectAll={handleSelectAll}
            selectedCount={selectedIds.length}
            handleMarkAsPresent={handleMarkAsPresent}
            handleDownloadCSV={handleDownloadCSV}
          />
          <Body
            enrollmentDetails={enrollmentDetails}
            loading={loading}
            selectedIds={selectedIds}
            handleSelectOne={handleSelectOne}
          />
        </Table>
      </TableContainer>
    </Box>
  );
}
