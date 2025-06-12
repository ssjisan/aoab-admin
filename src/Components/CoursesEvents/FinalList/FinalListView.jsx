import {
  Box,
  Stack,
  Table,
  TableContainer,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Table/Body";
import { useNavigate, useParams } from "react-router-dom";
import CustomeHeader from "../../Common/Table/CustomeHeader";

export default function FinalListView() {
  const [loading, setLoading] = useState(false);
  const { courseId: courseId } = useParams();

  const limit = 5;
  const navigate = useNavigate();
  const [enrollmentDetails, setEnrollmentDetails] = useState([]);
  const [open, setOpen] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [rejectLoading, setRejectLoading] = useState(false);
  console.log("Here=>",selectedRowId);
  
  const handleRejectClick = (row) => {
    console.log("row", row);
    setSelectedEnrollment({
      id: row._id,
      name: row.studentId?.name || "Unknown",
    });
    setRemarks("");
    setIsModalOpen(true);
    setOpen(false);
  };

  const handleRejectEnrollments = async () => {
    if (!selectedEnrollment?.id || !remarks) {
      toast.error("Remarks are required.");
      return;
    }

    setRejectLoading(true); // Still update local loading state if needed

    await toast
      .promise(
        axios.patch("/enrollment/reject", {
          id: selectedEnrollment.id,
          remark: remarks,
        }),
        {
          loading: "Rejecting enrollment...",
          success: (res) =>
            res.data.message || "Enrollment rejected successfully",
          error: (err) =>
            err?.response?.data?.error || "Failed to reject the enrollment.",
        }
      )
      .then(() => {
        setIsModalOpen(false);
        setRemarks("");
        loadEnrollmentHistory();
      })
      .finally(() => {
        setRejectLoading(false);
      });
  };
  const columns = [
    { key: "name", label: "Name" },
    { key: "bmdcNo	", label: "BM&DC No" },
    { key: "contact	", label: "Contact" },
    { key: "enrollmentDate", label: "Enrollment Date" },
    { key: "status	", label: "Status" },
    { key: "payment	", label: "Payment" },
    { key: "paymentInfo	", label: "Payment Info" },
  ];
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

  const handleOpenMenu = (event, eventData) => {
    setOpen(event.currentTarget);
    setSelectedRowId(eventData);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handlePaymentAccept = async (id) => {
    if (!id) {
      toast.error("Enrollment ID is missing.");
      return;
    }

    const loadingToast = toast.loading("Accepting payment...");

    try {
      const { data } = await axios.patch("/enrollment/accept", { id });

      toast.success(data.message || "Payment accepted successfully", {
        id: loadingToast,
      });

      setIsModalOpen(false); // If you're using a modal
      loadEnrollmentHistory();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to accept payment.", {
        id: loadingToast,
      });
    }
  };
  const handleMoveToEnrolled = async (enrollment) => {
  try {
    const res = await axios.post("/enrollment/move", {
      studentId: enrollment.studentId,
      courseId: enrollment.courseId,
    });

    toast.success("Moved to Enrolled successfully");
    loadEnrollmentHistory(); // Refresh the data if needed
  } catch (error) {
    console.error("Move to enrolled error:", error);

    const errorMessage =
      error.response?.data?.error || "Failed to move to Enrolled";
    toast.error(errorMessage);
  }
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
          <CustomeHeader
            columns={columns}
            includeActions={true}
            includeDrag={false}
          />
          <Body
            enrollmentDetails={enrollmentDetails}
            open={open}
            setOpen={setOpen}
            loading={loading}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
            showModal={showModal}
            selectedRowId={selectedRowId}
            setIsModalOpen={setIsModalOpen}
            handleRejectClick={handleRejectClick}
            selectedEnrollment={selectedEnrollment}
            handleRejectEnrollments={handleRejectEnrollments}
            remarks={remarks}
            setRemarks={setRemarks}
            rejectLoading={rejectLoading}
            isModalOpen={isModalOpen}
            handlePaymentAccept={handlePaymentAccept}
            handleMoveToEnrolled={handleMoveToEnrolled}
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
