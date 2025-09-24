import {
  Box,
  Stack,
  Table,
  TableContainer,
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
  Drawer,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomeHeader from "../../Common/Table/CustomeHeader";
import Body from "./Table/Body";
import toast from "react-hot-toast";
import PaymentRejectModal from "./Modal/PaymentRejectModal";
import PaymentApproveModal from "./Modal/PaymentApproveModal";
import MoveToEnrolledModal from "./Modal/MoveToEnrolledModal";
import EnrollmentRejectModal from "./Modal/EnrollmentRejectModal";
import StudentSearchDrawer from "./Drawer/StudentSearchDrawer";

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

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Open modal
  const handleOpenRejectModal = (student) => {
    setSelectedStudent(student);
    setRejectModalOpen(true);
  };

  // Close modal
  const handleCloseRejectModal = () => {
    setSelectedStudent(null);
    setRejectModalOpen(false);
  };

  // Handle confirm rejection
  const handleEnrollmentIntialReject = async (remark) => {
    if (!selectedStudent) return;
    try {
      const { studentId, _id: enrollmentId } = selectedStudent;
      await axios.post("reject-intial-enrollment", {
        courseId,
        studentId: studentId._id || studentId, // handle populated object
        enrollmentId,
        remark,
      });

      toast.success("Enrollment rejected successfully.");

      // Refresh the current tab
      loadEnrollmentHistory(tabLabels[activeTab]);

      // Close modal
      handleCloseRejectModal();
    } catch (err) {
      console.error("Error rejecting enrollment:", err);
      toast.error("Failed to reject enrollment.");
    }
  };

  const [paymentRejectModalOpen, setPaymentRejectModalOpen] = useState(false);
  const handleOpenPaymentRejectModal = (student) => {
    setSelectedStudent(student);
    setPaymentRejectModalOpen(true);
  };

  const handleClosePaymentRejectModal = () => {
    setSelectedStudent(null);
    setPaymentRejectModalOpen(false);
  };

  const handleConfirmPaymentReject = async (remark) => {
    if (!selectedStudent) return;

    try {
      const studentId =
        selectedStudent.studentId._id || selectedStudent.studentId;
      await axios.post("/enrollment/reject-payment", {
        courseId,
        studentId,
        remark,
      });

      toast.success("Payment rejected successfully.");

      // Refresh table
      loadEnrollmentHistory(tabLabels[activeTab]);
    } catch (err) {
      console.error("Error rejecting payment:", err);
      toast.error("Failed to reject payment.");
    } finally {
      handleClosePaymentRejectModal();
    }
  };
  const [paymentApproveModalOpen, setPaymentApproveModalOpen] = useState(false);

  const handleOpenPaymentApproveModal = (student) => {
    setSelectedStudent(student);
    setPaymentApproveModalOpen(true);
  };

  const handleClosePaymentApproveModal = () => {
    setSelectedStudent(null);
    setPaymentApproveModalOpen(false);
  };
  const handleConfirmPaymentAccept = async () => {
    if (!selectedStudent) return;
    try {
      const studentId =
        selectedStudent.studentId._id || selectedStudent.studentId;
      await axios.post("/enrollment/accept-payment", {
        courseId,
        studentId,
      });

      toast.success("Payment approved successfully.");
      loadEnrollmentHistory(tabLabels[activeTab]); // refresh table
    } catch (err) {
      console.error("Error approving payment:", err);
      toast.error("Failed to approve payment.");
    } finally {
      handleClosePaymentApproveModal();
    }
  };
  const [moveModalOpen, setMoveModalOpen] = useState(false);

  const handleOpenMoveToEnrolledModal = (student) => {
    setSelectedStudent(student);
    setMoveModalOpen(true);
  };

  const handleCloseMoveToEnrolledModal = () => {
    setMoveModalOpen(false);
    setSelectedStudent(null);
  };

  const handleConfirmMoveToEnrolled = async () => {
    if (!selectedStudent) return;
    try {
      const studentId =
        selectedStudent.studentId._id || selectedStudent.studentId;
      await axios.post("/enrollment/move", {
        courseId,
        studentId,
      });

      toast.success("Student moved to enrolled list successfully.");
      loadEnrollmentHistory(tabLabels[activeTab]); // refresh table
    } catch (err) {
      console.error("Error moving student:", err);
      toast.error("Failed to move student.");
    } finally {
      handleCloseMoveToEnrolledModal();
    }
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
const handleDrawerOpen = () => {
  setIsDrawerOpen(true);
};

const handleDrawerClose = () => {
  setIsDrawerOpen(false);
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
      <Stack
        sx={{ p: "12px" }}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="h6">{title}</Typography>
        <Button variant="contained" onClick={handleDrawerOpen}>Add participant</Button>
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
            handleOpenRejectModal={handleOpenRejectModal}
            handleOpenPaymentRejectModal={handleOpenPaymentRejectModal}
            handleOpenPaymentApproveModal={handleOpenPaymentApproveModal}
            handleOpenMoveToEnrolledModal={handleOpenMoveToEnrolledModal}
          />
        </Table>

        {loading && (
          <Stack alignItems="center" sx={{ pt: "16px" }}>
            <Typography variant="body1">Loading...</Typography>
          </Stack>
        )}
      </TableContainer>
      <EnrollmentRejectModal
        open={rejectModalOpen}
        onClose={handleCloseRejectModal}
        student={selectedStudent}
        onConfirm={handleEnrollmentIntialReject}
      />
      <PaymentRejectModal
        open={paymentRejectModalOpen}
        onClose={handleClosePaymentRejectModal}
        student={selectedStudent}
        onConfirm={handleConfirmPaymentReject}
      />
      <PaymentApproveModal
        open={paymentApproveModalOpen}
        onClose={handleClosePaymentApproveModal}
        student={selectedStudent}
        onConfirm={handleConfirmPaymentAccept}
      />
      <MoveToEnrolledModal
        open={moveModalOpen}
        onClose={handleCloseMoveToEnrolledModal}
        student={selectedStudent}
        onConfirm={handleConfirmMoveToEnrolled}
      />
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <StudentSearchDrawer courseId={courseId}/>
      </Drawer>
      
    </Box>
  );
}
