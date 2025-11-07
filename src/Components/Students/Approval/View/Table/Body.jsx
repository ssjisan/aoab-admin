import {
  CircularProgress,
  IconButton,
  Stack,
  TableBody,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";
import { Approve, Deny, More, NoData } from "../../../../../assets/IconSet";
import CustomePopOver from "../../../../Common/PopOver/CustomePopOver";

export default function Body({
  studentProfiles,
  openApprovalModal,
  openDenyModal,
  onViewProfile,
  loading,
  selectedRow,
  handleOpenMenu,
  handleCloseMenu,
  open,
  activeTab, // ✅ Added prop
}) {
  if (loading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={6}>
            <Stack sx={{ width: "100%", mt: 4, mb: 4 }} gap={2} alignItems="center">
              <CircularProgress />
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                Loading profiles...
              </Typography>
            </Stack>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (!studentProfiles.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={6}>
            <Stack sx={{ width: "100%", mt: 4, mb: 4 }} gap={2} alignItems="center">
              <NoData />
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                No {activeTab === "rejected" ? "rejected" : "approval pending"} profiles!
              </Typography>
            </Stack>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {studentProfiles.map((data) => (
        <TableRow key={data._id}>
          <TableCell sx={{ p: "8px 16px" }}>{data.name}</TableCell>
          <TableCell sx={{ p: "8px 16px" }}>{data.email}</TableCell>
          <TableCell sx={{ p: "8px 16px" }}>+880{data.contactNumber}</TableCell>
          <TableCell sx={{ p: "8px 16px" }}>A-{data.bmdcNo}</TableCell>
          <TableCell
            sx={{
              p: "16px",
              textDecoration: "underline",
              color: "blue",
              cursor: "pointer",
            }}
            onClick={() => onViewProfile(data._id)}
          >
            View Details
          </TableCell>

          {/* ✅ Conditional Rendering */}
          {activeTab === "rejected" ? (
            <TableCell sx={{ p: "16px", color: "#FF5630", fontWeight: 500 }}>
              {data.remarks ? data.remarks : "No remarks provided"}
            </TableCell>
          ) : (
            <TableCell align="center" sx={{ p: "16px" }}>
              <Tooltip title="Actions">
                <IconButton
                  sx={{ width: "40px", height: "40px" }}
                  onClick={(event) => handleOpenMenu(event, data)}
                >
                  <More color="#919EAB" size={24} />
                </IconButton>
              </Tooltip>
            </TableCell>
          )}
        </TableRow>
      ))}

      {activeTab !== "rejected" && (
        <CustomePopOver
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleCloseMenu}
          menuItems={[
            {
              label: "Approve",
              icon: Approve,
              color: "success",
              onClick: () => openApprovalModal(selectedRow),
            },
            {
              label: "Deny",
              icon: Deny,
              color: "error",
              onClick: () => openDenyModal(selectedRow),
            },
          ]}
        />
      )}
    </TableBody>
  );
}

Body.propTypes = {
  studentProfiles: PropTypes.array.isRequired,
  openApprovalModal: PropTypes.func.isRequired,
  openDenyModal: PropTypes.func.isRequired,
  onViewProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  selectedRow: PropTypes.object,
  handleOpenMenu: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  activeTab: PropTypes.string.isRequired, // ✅ Added
};
