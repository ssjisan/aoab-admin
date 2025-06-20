import { Box, Stack, Table, TableContainer, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Table/Body";
import { useParams } from "react-router-dom";
import CustomeHeader from "../../Common/Table/CustomeHeader";

export default function EnrollmentView() {
  const [loading, setLoading] = useState(false);
  const { courseId: courseId } = useParams();
  const [enrollmentDetails, setEnrollmentDetails] = useState([]);
  const [open, setOpen] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [rejectLoading, setRejectLoading] = useState(false);

  const handleRejectClick = (row) => {
    setSelectedEnrollment({
      id: row._id,
      name: row.studentId?.name || "Unknown",
    });
    setRemarks("");
    setIsModalOpen(true);
    setOpen(false);
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
      const res = await axios.get(`/enrollment-history/${courseId}`);
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

    // eventData now contains courseId and enrollment
    setSelectedRowId({
      courseId: eventData.courseId,
      studentId: eventData.enrollment?.studentId?._id || "",
      status: eventData.enrollment?.status || "", // <-- add status here
      enrollment: eventData.enrollment,
    });
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  // ------------------------------------------------ Start Payment Accept Start ------------------------------------------------ //

  const handlePaymentAccept = async (courseId, studentId) => {
    if (!courseId || !studentId) {
      toast.error("Missing course or student ID.");
      return;
    }
    setOpen(null);

    const loadingToast = toast.loading("Accepting payment...");

    try {
      const { data } = await axios.patch("/enrollment/accept", {
        courseId,
        studentId,
      });

      toast.success(data.message || "Payment accepted successfully", {
        id: loadingToast,
      });

      setIsModalOpen(false);
      loadEnrollmentHistory();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to accept payment.", {
        id: loadingToast,
      });
    }
  };

  // ------------------------------------------------ Start Payment Accept End ------------------------------------------------ //

  // ------------------------------------------------ Payment Rejection Start ------------------------------------------------ //

  const handleRejectEnrollments = async () => {
    if (!selectedRowId.courseId || !selectedRowId.studentId || !remarks) {
      toast.error("Remarks and IDs are required.");
      return;
    }

    setRejectLoading(true);

    await toast
      .promise(
        axios.patch("/enrollment/reject", {
          courseId: selectedRowId.courseId,
          studentId: selectedRowId.studentId,
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
        setOpen(null); // close menu on success
        loadEnrollmentHistory();
      })
      .finally(() => {
        setRejectLoading(false);
      });
  };
  // ------------------------------------------------ Payment Rejection End ------------------------------------------------ //

  // ------------------------------------------------ Handle Move to enrollment Start ------------------------------------------------ //

  const handleMoveToEnrolled = async (enrollment) => {
    try {
      const res = await axios.post("/enrollment/move", {
        studentId: enrollment.studentId._id || enrollment.studentId, // handle if studentId is object or string
        courseId: enrollment.courseId, // make sure enrollment object contains courseId
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
  // ------------------------------------------------ Handle Move to enrollment End ------------------------------------------------ //

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
            courseId={courseId}
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
