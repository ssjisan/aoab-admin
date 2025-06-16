import { Box, Stack, Table, TableContainer, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Table/Body";
import Header from "./Table/Header";
import { useParams } from "react-router-dom";

export default function FinalListView() {
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
      setEnrollmentDetails(res.data);
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
