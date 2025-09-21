import {
  Box,
  Stack,
  Table,
  TableContainer,
  Typography,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomeHeader from "../../Common/Table/CustomeHeader";
import Body from "./Table/Body";

export default function EnrollmentView() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState([]); // filtered from API
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [title, setTitle] = useState("");
  const handleOpenMenu = (event, events) => {
    setOpen(event.currentTarget);
    setSelectedRowId(events);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const tabLabels = [
    "Enrolled",
    "Payment",
    "Confirmed",
    "Waitlist",
    "Rejected",
  ];
  const [tabCounts, setTabCounts] = useState({
    Enrolled: 0,
    Payment: 0,
    Confirmed: 0,
    Waitlist: 0,
    Rejected: 0,
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const loadEnrollmentHistory = async (tabName) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/enrollment-history/${courseId}?tab=${tabName}`
      );
      setEnrollments(res.data.enrollments || []);
      setTabCounts(res.data.tabCounts || {});
      setTitle(res.data.title);
      console.log(res.data);
    } catch (err) {
      console.error("Error loading enrollment history:", err);
    } finally {
      setLoading(false);
    }
  };

  // load when activeTab changes
  useEffect(() => {
    loadEnrollmentHistory(tabLabels[activeTab]);
  }, [activeTab]);

  const columns = [
    { key: "name", label: "Name" },
    { key: "bmdcNo", label: "BM&DC No" },
    { key: "contact", label: "Contact" },
    { key: "enrollmentDate", label: "Enrollment Date" },
    { key: "status", label: "Status" },
    { key: "payment", label: "Payment" },
    { key: "paymentInfo", label: "Payment Info" },
    { key: "action", label: "" },
  ];

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
      <Stack
        sx={{ p: "12px" }}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="h6">{title}</Typography>
        <Button variant="contained">Search</Button>
      </Stack>
      {/* ---------------- Tabs with count ---------------- */}
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
        {tabLabels.map((label, idx) => (
          <Tab key={idx} label={`${label} (${tabCounts[label] || 0})`} />
        ))}
      </Tabs>

      <TableContainer>
        <Table sx={{ mt: "16px" }}>
          <CustomeHeader
            columns={columns}
            includeActions={false}
            includeDrag={false}
          />
          <Body
            enrollmentDetails={{ enrollments }}
            loading={loading}
            open={open}
            selectedRowId={selectedRowId}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
            activeTab={tabLabels[activeTab]}
          />
        </Table>

        {loading && (
          <Stack alignItems="center" sx={{ pt: "16px" }}>
            <Typography variant="body1">Loading...</Typography>
          </Stack>
        )}
      </TableContainer>
    </Box>
  );
}
