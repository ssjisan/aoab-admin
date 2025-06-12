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
  handleMoveToEnrolled
}) {
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
      ) : enrollmentDetails.length === 0 ? (
        <TableRow>
          <TableCell colSpan={9} align="center" sx={{ height: 200 }}>
            <NoData />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              No Data
            </Typography>
          </TableCell>
        </TableRow>
      ) : (
        enrollmentDetails.map((data) => (
          <TableRow key={data.id}>
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
                    onClick={(event) => handleOpenMenu(event, data)}
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
                  icon: Move, // Replace this with your actual Move icon
                  onClick: () => handleMoveToEnrolled(selectedRowId),
                },
              ]
            : [
                {
                  label: "Approve",
                  icon: Approve,
                  color: "success",
                  onClick: () => handlePaymentAccept(selectedRowId),
                },
                {
                  label: "Reject",
                  icon: Deny,
                  color: "error",
                  onClick: () => handleRejectClick(selectedRowId),
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
  enrollmentDetails: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
      fees: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      contactPerson: PropTypes.string.isRequired,
      contactEmail: PropTypes.string.isRequired,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    })
  ).isRequired,
  selectedRowId: PropTypes.string, // Assuming the ID is a string
  selectedTab: PropTypes.string.isRequired, // Validated as string
  onDragEnd: PropTypes.func.isRequired, // Function for drag-and-drop end event
  handlePreview: PropTypes.func.isRequired, // Function to handle preview action
  handleCloseMenu: PropTypes.func.isRequired, // Function to close the menu
  handleOpenMenu: PropTypes.func.isRequired, // Function to open the menu
  open: PropTypes.object, // Reference to the anchor element for the popover
  setDataToDelete: PropTypes.func.isRequired, // Function to set the item to delete
  setIsModalOpen: PropTypes.func.isRequired, // Function to open/close modal
  redirectEdit: PropTypes.func.isRequired,
  handleEnrollments: PropTypes.func.isRequired,
  handleRejectClick: PropTypes.func.isRequired,
  loading: PropTypes.string,
  isModalOpen: PropTypes.string,
  selectedEnrollment: PropTypes.string,
  handleRejectEnrollments: PropTypes.string,
  remarks: PropTypes.string,
  setRemarks: PropTypes.string,
  rejectLoading: PropTypes.string,
  handlePaymentAccept: PropTypes.func.isRequired,
};
