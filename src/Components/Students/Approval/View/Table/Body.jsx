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
}) {
  if (loading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={6}>
            <Stack
              sx={{ width: "100%", mt: 4, mb: 4 }}
              gap={2}
              alignItems="center"
            >
              <CircularProgress />
              <Typography variant="body1" color="text.secondary" sx={{fontWeight:"500 !important"}}>
                Loading profiles...
              </Typography>
            </Stack>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  if (!studentProfiles.length >= 1) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={6}>
            <Stack
              sx={{ width: "100%", mt: "32px", mb: "32px" }}
              gap="8px"
              alignItems="center"
            >
              <NoData />
              <Typography variant="body1" color="text.secondary" sx={{fontWeight:"500 !important"}}>
                No approval pending!
              </Typography>
            </Stack>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {studentProfiles.map((data) => {
        return (
          <TableRow key={data._id}>
            <TableCell sx={{ p: "8px 16px" }}>{data.name}</TableCell>
            <TableCell sx={{ p: "8px 16px" }}>{data.email}</TableCell>
            <TableCell sx={{ p: "8px 16px" }}>
              +880{data.contactNumber}
            </TableCell>
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
          </TableRow>
        );
      })}
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
    </TableBody>
  );
}

Body.propTypes = {
  studentProfiles: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      publishedDate: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  openApprovalModal: PropTypes.func.isRequired,
  openDenyModal: PropTypes.func.isRequired,
  onViewProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  selectedRow: PropTypes.object.isRequired,
  handleOpenMenu: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};
