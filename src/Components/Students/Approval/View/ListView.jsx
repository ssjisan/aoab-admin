import { Box, Table, TableContainer, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Table/Body";
import Header from "./Table/Header";
import ConfirmationModal from "../Confirmation/ConfirmationModal";
import DenyModal from "../Deny/DenyModal";
import ProfileDetailsDrawer from "../../ProfileDetails/ProfileDetailsDrawer";
import { DownArrow } from "../../../../assets/IconSet";

export default function ListView() {
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
  const DownArrowIcon = () => {
    return <DownArrow color="grey" size={16} />;
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

  // Function to open the modal and pass selected data
  const openApprovalModal = (data) => {
    setDataToApprove(data); // Set the selected student's data to show in modal
    setIsModalOpen(true); // Open the modal
  };
  const openDenyModal = (data) => {
    setDataToDeny(data); // Set the selected student's data to show in modal
    setIsDenyModalOpen(true); // Open the modal
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
        <Table>
          <Header />
          <Body
            studentProfiles={studentProfiles.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
            setDataToApprove={setDataToApprove}
            setIsModalOpen={setIsModalOpen}
            setIsDenyModalOpen={setIsDenyModalOpen}
            openApprovalModal={openApprovalModal} // Pass the openApprovalModal function
            openDenyModal={openDenyModal}
            onViewProfile={handleViewProfile}
            loading={loading}
          />
          <TablePagination
            // component="div"
            count={studentProfiles.length}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
            slotProps={{
              select: {
                IconComponent: DownArrowIcon,
              },
            }}
            sx={{
              borderBottom: "none",
              borderTop: "1px solid rgba(145, 158, 171, 0.24)",
            }}
          />
        </Table>
      </TableContainer>
      <ProfileDetailsDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        studentProfile={selectedStudent}
      />
      <ConfirmationModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        data={dataToApprove}
        handleApprove={handleApprove}
      />
      <DenyModal
        isOpen={isDenyModalOpen}
        handleClose={() => setIsDenyModalOpen(false)}
        data={dataToDeny}
        handleDeny={handleDeny}
        remarks={remarks}
        setRemarks={setRemarks}
        loading={loading}
      />
    </Box>
  );
}
