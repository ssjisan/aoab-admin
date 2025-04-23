import { Box, Table, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Table/Body";
import ConfirmationModal from "../Confirmation/ConfirmationModal";
import DenyModal from "../Deny/DenyModal";
import ProfileDetailsDrawer from "../../ProfileDetails/ProfileDetailsDrawer";
import CustomeHeader from "../../../Common/Table/CustomeHeader";
import CustomePagination from "../../../Common/Table/CustomePagination";

export default function ListView({
  endpoint = "/unverified-accounts",
  showApprove = true,
  showDeny = true,
  showViewProfile = true,
  customColumns,
  limit = null, // NEW: limit number of rows (e.g., 5)
  showPagination = true, // NEW: control pagination
  withContainer = true, // NEW: control Box wrapper
}) {
  const [studentProfiles, setStudentProfiles] = useState([]);
  const [dataToApprove, setDataToApprove] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const [dataToDeny, setDataToDeny] = useState(null);
  const [remarks, setRemarks] = useState(""); // State to store remarks
  const [loading, setLoading] = useState(false); // State to track API request
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [page, setPage] = useState(0); // current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // items per page
  const [selectedRow, setSelectedRow] = useState("");
  const [open, setOpen] = useState(false);

  // ***************** Table Header Columns ************************* //

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "contact number", label: "Contact Number" },
    { key: "bmdc no", label: "BM&DC Reg." },
    { key: "view profile", label: "View Profile" },
  ];

  // ***************** Table Header Columns ************************* //
  const handleOpenMenu = (event, data) => {
    setSelectedRow(data);
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleViewProfile = async (studentId) => {
    try {
      const { data } = await axios.get(`/student/${studentId}`);
      setSelectedStudent(data);
      setOpenDrawer(true);
    } catch (error) {
      toast.error("Failed to load student profile");
    }
  };
  const loadstudentsProfile = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/unverified-accounts");
      setStudentProfiles(data);
    } catch (err) {
      console.error("Error details:", err);
      toast.error("Students Profile can't load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadstudentsProfile();
  }, []);

  const displayedProfiles = limit
    ? studentProfiles.slice(0, limit)
    : studentProfiles.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

  // Function to open the modal and pass selected data
  const openApprovalModal = (data) => {
    setDataToApprove(data); // Set the selected student's data to show in modal
    setIsModalOpen(true); // Open the modal
    setOpen(false);
  };
  const openDenyModal = (data) => {
    setDataToDeny(data); // Set the selected student's data to show in modal
    setIsDenyModalOpen(true); // Open the modal
    setOpen(false);
  };

  const handleApprove = async () => {
    if (dataToApprove) {
      const studentId = dataToApprove._id;
      console.log(studentId);
      setLoading(true);
      try {
        // Change to GET request
        const response = await axios.get(`/approve/${studentId}`);

        if (response.status === 200) {
          toast.success("Student approved successfully");
          // Remove the student from the list of unverified profiles
          setStudentProfiles((prev) =>
            prev.filter((profile) => profile._id !== dataToApprove._id)
          );
          setIsModalOpen(false); // Close the modal
        }
      } catch (err) {
        console.error("Error approving student:", err);
        toast.error("Error approving student");
      } finally {
        setLoading(false); // End loading state
      }
    }
  };

  const handleDeny = async () => {
    if (!remarks.trim()) {
      toast.error("Remarks are required");
      return;
    }

    if (dataToDeny) {
      const studentId = dataToDeny._id;
      console.log("Denying student:", studentId);

      try {
        // Send a PUT request with remarks
        const response = await axios.put(`/deny/${studentId}`, {
          isAccountVerified: false,
          isBmdcVerified: null,
          remarks,
        });

        if (response.status === 200) {
          toast.success("Student denied successfully");
          // Remove denied student from the list
          setStudentProfiles((prev) =>
            prev.filter((profile) => profile._id !== studentId)
          );
          setIsDenyModalOpen(false); // Close modal
          setRemarks(""); // Clear remarks input
        }
      } catch (err) {
        console.error("Error denying student:", err);
        toast.error("Error denying student");
      }
    }
  };
  const Content = (
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
        />
        {showPagination && (
          <CustomePagination
            count={studentProfiles.length}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        )}
      </Table>
    </TableContainer>
  );
  return (
    <>
      {withContainer ? (
        <Box
          sx={{
            boxShadow:
              "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
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
