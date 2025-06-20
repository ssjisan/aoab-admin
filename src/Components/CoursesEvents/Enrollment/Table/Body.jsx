import {
  CircularProgress,
  IconButton,
  TableBody,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";
import { More, NoData, Approve, Deny, Move } from "../../../../assets/IconSet";
import CustomePopOver from "../../../Common/PopOver/CustomePopOver";
import ConfirmationModal from "../Modal/ConfirmationModal";
import CustomChip from "../../../Common/Chip/CustomeChip";

export default function Body({
  enrollmentDetails,
  selectedRowId,
  handleCloseMenu,
  handleOpenMenu,
  open,
  loading,
  isModalOpen,
  setIsModalOpen,
  handleRejectClick,
  selectedEnrollment,
  handleRejectEnrollments,
  remarks,
  setRemarks,
  rejectLoading,
  handlePaymentAccept,
  handleMoveToEnrolled,
  courseId,
}) {
  const enrollments = enrollmentDetails?.enrollments || [];

  return (
    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={9} align="center" sx={{ height: 200 }}>
            <CircularProgress />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 2, fontWeight: 600 }}
            >
              Loading...
            </Typography>
          </TableCell>
        </TableRow>
      ) : enrollments.length === 0 ? (
        <TableRow>
          <TableCell colSpan={9} align="center" sx={{ height: 200 }}>
            <NoData />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              No Enrollments
            </Typography>
          </TableCell>
        </TableRow>
      ) : (
        enrollments.map((data) => (
          <TableRow key={data._id}>
            <TableCell align="left" sx={{ padding: "16px", width: "280px" }}>
              {data.studentId?.name}
            </TableCell>
            <TableCell align="left" sx={{ padding: "16px", width: "280px" }}>
              A-{data.studentId?.bmdcNo}
            </TableCell>
            <TableCell align="left" sx={{ padding: "16px", width: "240px" }}>
              <>
                {data.studentId?.email}
                <br />
                <span style={{ fontSize: "12px" }}>
                  0{data.studentId?.contactNumber}
                </span>
              </>
            </TableCell>

            <TableCell align="left" sx={{ padding: "16px", width: "240px" }}>
              <>
                {new Date(data.enrolledAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                <br />
                <span style={{ fontSize: "12px" }}>
                  {new Date(data.enrolledAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </>
            </TableCell>
            <TableCell align="left" sx={{ padding: "16px", width: "280px" }}>
              <CustomChip label={data.status} />
            </TableCell>
            <TableCell align="left" sx={{ padding: "16px", width: "280px" }}>
              <CustomChip label={data.paymentReceived} />
            </TableCell>
            <TableCell align="left" sx={{ padding: "16px", width: "280px" }}>
              {data?.paymentProof?.url ? (
                <a
                  href={data?.paymentProof?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1976d2", textDecoration: "underline" }}
                >
                  View
                </a>
              ) : (
                "Not yet"
              )}
            </TableCell>
            <TableCell align="center">
              <Tooltip
                title={
                  data?.status === "confirmed"
                    ? "No actions for confirmed enrollment"
                    : data?.status === "expired"
                    ? "No actions for expired enrollment"
                    : "Actions"
                }
              >
                <span>
                  <IconButton
                    sx={{ width: "40px", height: "40px" }}
                    onClick={(event) =>
                      handleOpenMenu(event, { courseId, enrollment: data })
                    }
                    disabled={["confirmed", "expired"].includes(data?.status)}
                  >
                    <More color="#919EAB" size={24} />
                  </IconButton>
                </span>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))
      )}
      <CustomePopOver
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        menuItems={
          selectedRowId?.status === "waitlist"
            ? [
                {
                  label: "Move",
                  icon: Move,
                  onClick: () => handleMoveToEnrolled(selectedRowId),
                },
              ]
            : [
                {
                  label: "Approve",
                  icon: Approve,
                  color: "success",
                  onClick: () =>
                    handlePaymentAccept(
                      selectedRowId.courseId,
                      selectedRowId.studentId
                    ),
                },
                {
                  label: "Reject",
                  icon: Deny,
                  color: "error",
                  onClick: () =>
                    handleRejectClick(
                      selectedRowId.courseId,
                      selectedRowId.studentId
                    ),
                },
              ]
        }
      />
      <ConfirmationModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        data={selectedEnrollment}
        handleRejectEnrollments={handleRejectEnrollments}
        remarks={remarks}
        setRemarks={setRemarks}
        loading={rejectLoading}
      />
    </TableBody>
  );
}

Body.propTypes = {
  enrollmentDetails: PropTypes.object.isRequired,
  selectedRowId: PropTypes.object,
  handleCloseMenu: PropTypes.func.isRequired,
  handleOpenMenu: PropTypes.func.isRequired,
  open: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  handleRejectClick: PropTypes.func.isRequired,
  selectedEnrollment: PropTypes.object,
  handleRejectEnrollments: PropTypes.func.isRequired,
  remarks: PropTypes.string.isRequired,
  setRemarks: PropTypes.func.isRequired,
  rejectLoading: PropTypes.bool.isRequired,
  handlePaymentAccept: PropTypes.func.isRequired,
  handleMoveToEnrolled: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired,
};
