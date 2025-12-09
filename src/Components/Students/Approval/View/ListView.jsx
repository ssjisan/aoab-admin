import {
  Box,
  Table,
  TableContainer,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Table/Body";
import ConfirmationModal from "../Confirmation/ConfirmationModal";
import DenyModal from "../Deny/DenyModal";
import ProfileDetailsDrawer from "../../ProfileDetails/ProfileDetailsDrawer";
import CustomeHeader from "../../../Common/Table/CustomeHeader";
import CustomePagination from "../../../Common/Table/CustomePagination";
import PropTypes from "prop-types";

export default function ListView({
  showApprove = true,
  showDeny = true,
  showViewProfile = true,
  limit = null,
  showPagination = true,
  withContainer = true,
  onDataFetched,
}) {
  const [studentProfiles, setStudentProfiles] = useState([]);
  const [dataToApprove, setDataToApprove] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const [dataToDeny, setDataToDeny] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState("");
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pending"); // pending | under-review | rejected

  // Table header columns
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "contact number", label: "Contact Number" },
    { key: "bmdc no", label: "BM&DC Reg." },
    { key: "view profile", label: "View Profile" },
    ...(activeTab === "rejected" ? [{ key: "remarks", label: "Remarks" }] : []),
  ];

  // Load all unverified accounts
  const loadstudentsProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/unverified-accounts");
      setStudentProfiles(data);
      if (typeof onDataFetched === "function") {
        onDataFetched(data.length);
      }
    } catch (err) {
      console.error("Error loading students:", err);
      toast.error("Failed to load student profiles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadstudentsProfile();
  }, []);

  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(0);
  };

  // ✅ Filter profiles by selected tab
  const filteredProfiles = studentProfiles.filter((student) => {
    if (activeTab === "pending")
      return student.accountVerificationStatus === "pending";
    if (activeTab === "under-review")
      return student.accountVerificationStatus === "under-review";
    if (activeTab === "rejected")
      return student.accountVerificationStatus === "rejected";
    return false;
  });

  const displayedProfiles = limit
    ? filteredProfiles.slice(0, limit)
    : filteredProfiles.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

  // Menu handlers
  const handleOpenMenu = (event, data) => {
    setSelectedRow(data);
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => setOpen(null);

  // View profile
  const handleViewProfile = async (studentId) => {
    try {
      const { data } = await axios.get(`/student/${studentId}`);
      setSelectedStudent(data);
      setOpenDrawer(true);
    } catch (err) {
      toast.error("Failed to load student profile");
    }
  };

  // Approve student
  const handleApprove = async () => {
    if (!dataToApprove) return;
    const studentId = dataToApprove._id;
    setLoading(true);
    try {
      const response = await axios.get(`/approve/${studentId}`);
      if (response.status === 200) {
        toast.success("Student approved successfully");
        setStudentProfiles((prev) => prev.filter((p) => p._id !== studentId));
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error approving student:", err);
      toast.error("Error approving student");
    } finally {
      setLoading(false);
    }
  };

  // Deny student
  const handleDeny = async () => {
    if (!remarks.trim()) {
      toast.error("Remarks are required");
      return;
    }
    if (!dataToDeny) return;

    const studentId = dataToDeny._id;
    setLoading(true);
    try {
      const response = await axios.put(`/deny/${studentId}`, { remarks });
      if (response.status === 200) {
        toast.success("Student denied successfully");
        setStudentProfiles((prev) =>
          prev.map((student) =>
            student._id === studentId
              ? { ...student, accountVerificationStatus: "rejected", remarks }
              : student
          )
        );
        setIsDenyModalOpen(false);
        setRemarks("");
      }
    } catch (err) {
      console.error("Error denying student:", err);
      toast.error("Error denying student");
    } finally {
      setLoading(false);
    }
  };

  // Open modals
  const openApprovalModal = (data) => {
    setDataToApprove(data);
    setIsModalOpen(true);
    setOpen(false);
  };
  const openDenyModal = (data) => {
    setDataToDeny(data);
    setIsDenyModalOpen(true);
    setOpen(false);
  };
  const pendingCount = studentProfiles.filter(
    (student) => student.accountVerificationStatus === "pending"
  ).length;

  const underReviewCount = studentProfiles.filter(
    (student) => student.accountVerificationStatus === "under-review"
  ).length;

  const rejectedCount = studentProfiles.filter(
    (student) => student.accountVerificationStatus === "rejected"
  ).length;
  const Content = (
    <>
      {/* ✅ Added Under Review tab */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ borderBottom: "1px solid rgba(145,158,171,0.24)", width: "100%" }}
      >
        <Tab
          value="pending"
          label={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography sx={{fontSize:"14px", fontWeight:600}}>Pending</Typography>
              <Box
                sx={{
                  minWidth: "24px",
                  height: "24px",
                  bgcolor: activeTab === "pending" ? "#efe5ff" : "#d2d2d2",
                  color: activeTab === "pending" ? "#792DF8" : "#6b6b6bff",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  px: 0.5,
                }}
              >
                {pendingCount}
              </Box>
            </Box>
          }
        />
        <Tab
          value="under-review"
          label={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography sx={{fontSize:"14px", fontWeight:600}}>Under Review</Typography>
              <Box
                sx={{
                  minWidth: "24px",
                  height: "24px",
                  bgcolor: activeTab === "under-review" ? "#efe5ff" : "#d2d2d2",
                  color: activeTab === "under-review" ? "#792DF8" : "#6b6b6bff",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  px: 0.5,
                }}
              >
                {underReviewCount}
              </Box>
            </Box>
          }
        />
        <Tab
          value="rejected"
          label={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography sx={{fontSize:"14px", fontWeight:600}}>Rejected</Typography>
              <Box
                sx={{
                  minWidth: "24px",
                  height: "24px",
                  bgcolor: activeTab === "rejected" ? "#efe5ff" : "#d2d2d2",
                  color: activeTab === "rejected" ? "#792DF8" : "#6b6b6bff",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  px: 0.5,
                }}
              >
                {rejectedCount}
              </Box>
            </Box>
          }
        />
      </Tabs>

      <TableContainer>
        <Table>
          <CustomeHeader
            columns={columns}
            includeActions={true}
            includeDrag={false}
          />
          <Body
            studentProfiles={displayedProfiles}
            setDataToApprove={setDataToApprove}
            setIsModalOpen={setIsModalOpen}
            setIsDenyModalOpen={setIsDenyModalOpen}
            openApprovalModal={openApprovalModal}
            openDenyModal={openDenyModal}
            onViewProfile={handleViewProfile}
            loading={loading}
            selectedRow={selectedRow}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
            open={open}
            activeTab={activeTab}
          />
          {showPagination && (
            <CustomePagination
              count={filteredProfiles.length}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
            />
          )}
        </Table>
      </TableContainer>
    </>
  );

  return (
    <>
      {withContainer ? (
        <Box
          sx={{
            boxShadow:
              "0px 0px 2px rgba(145,158,171,0.2),0px 12px 24px -4px rgba(145,158,171,0.12)",
            borderRadius: "16px",
            p: 2,
            mt: 3,
          }}
        >
          {Content}
        </Box>
      ) : (
        Content
      )}

      {showViewProfile && (
        <ProfileDetailsDrawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          studentProfile={selectedStudent}
        />
      )}
      {showApprove && (
        <ConfirmationModal
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          data={dataToApprove}
          handleApprove={handleApprove}
        />
      )}
      {showDeny && (
        <DenyModal
          isOpen={isDenyModalOpen}
          handleClose={() => setIsDenyModalOpen(false)}
          data={dataToDeny}
          handleDeny={handleDeny}
          remarks={remarks}
          setRemarks={setRemarks}
          loading={loading}
        />
      )}
    </>
  );
}

ListView.propTypes = {
  endpoint: PropTypes.string,
  showApprove: PropTypes.bool,
  showDeny: PropTypes.bool,
  showViewProfile: PropTypes.bool,
  customColumns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  limit: PropTypes.number,
  showPagination: PropTypes.bool,
  withContainer: PropTypes.bool,
  onDataFetched: PropTypes.func,
};
