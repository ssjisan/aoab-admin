// Body.jsx
import {
  CircularProgress,
  IconButton,
  TableBody,
  TableRow,
  Tooltip,
  Typography,
  TableCell,
} from "@mui/material";
import PropTypes from "prop-types";
import { Approve, Deny, More, NoData } from "../../../../assets/IconSet";
import CustomChip from "../../../Common/Chip/CustomeChip";
import CustomePopOver from "../../../Common/PopOver/CustomePopOver";

export default function Body({
  enrollmentDetails,
  loading,
  open,
  handleOpenMenu,
  handleCloseMenu,
  selectedRowId,
  activeTab,
  handleOpenRejectModal,
  handleOpenPaymentRejectModal,
  handleOpenPaymentApproveModal,
  handleOpenMoveToEnrolledModal,
}) {
  const enrollments = enrollmentDetails?.enrollments || [];

  const getMenuItems = () => {
    switch (activeTab) {
      case "Enrolled":
        return [
          {
            label: "Reject",
            icon: Deny,
            color: "error",
            onClick: () => {
              handleCloseMenu();
              handleOpenRejectModal(selectedRowId);
            },
          },
        ];
      case "Payment":
        return [
          {
            label: "Approve",
            icon: Approve,
            onClick: () => {
              handleCloseMenu();
              handleOpenPaymentApproveModal(selectedRowId);
            },
          },
          {
            label: "Reject",
            icon: Deny,
            color: "error",
            onClick: () => {
              handleCloseMenu();
              handleOpenPaymentRejectModal(selectedRowId);
            },
          },
        ];
      case "Waitlist":
        return [
          {
            label: "Move to Enrolled",
            icon: Approve,
            onClick: () => {
              handleCloseMenu();
              handleOpenMoveToEnrolledModal(selectedRowId);
            },
          },
        ];
      case "Confirmed":
      case "Rejected":
        return [];
      default:
        return [];
    }
  };

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
            <TableCell>{data.studentId?.name}</TableCell>
            <TableCell>A-{data.studentId?.bmdcNo}</TableCell>
            <TableCell>
              {data.studentId?.email}
              <br />
              <span style={{ fontSize: "12px" }}>
                0{data.studentId?.contactNumber}
              </span>
            </TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell>
              <CustomChip label={data.status} />
            </TableCell>
            <TableCell>
              <CustomChip label={data.paymentReceived} />
            </TableCell>
            <TableCell>
              {data?.paymentProof?.url ? (
                <a
                  href={data.paymentProof.url}
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
              <Tooltip title="Actions">
                <span>
                  <IconButton
                    sx={{ width: "40px", height: "40px" }}
                    onClick={(event) => handleOpenMenu(event, data)}
                    disabled={["Confirmed", "Rejected"].includes(activeTab)}
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
        menuItems={getMenuItems()}
      />
    </TableBody>
  );
}

Body.propTypes = {
  enrollmentDetails: PropTypes.shape({
    enrollments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        studentId: PropTypes.shape({
          _id: PropTypes.string,
          name: PropTypes.string,
          bmdcNo: PropTypes.string,
          email: PropTypes.string,
          contactNumber: PropTypes.string,
        }),
        enrolledAt: PropTypes.string,
        status: PropTypes.string,
        paymentReceived: PropTypes.string,
        paymentProof: PropTypes.shape({
          url: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  open: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handleOpenMenu: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  selectedRowId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  activeTab: PropTypes.string.isRequired,
  handleOpenRejectModal: PropTypes.func.isRequired,
  handleOpenPaymentRejectModal: PropTypes.func.isRequired,
  handleOpenPaymentApproveModal: PropTypes.func.isRequired,
  handleOpenMoveToEnrolledModal: PropTypes.func.isRequired,
};
