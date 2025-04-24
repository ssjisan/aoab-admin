import { Box, Table, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Table/Body";
import ProfileDetailsDrawer from "../../ProfileDetails/ProfileDetailsDrawer";
import CustomeHeader from "../../../Common/Table/CustomeHeader";
import CustomePagination from "../../../Common/Table/CustomePagination";
import PropTypes from "prop-types";
import ConfirmationModal from "../../../Common/RemoveConfirmation/ConfirmationModal";

export default function ListView({
  showDeny = true,
  showViewProfile = true,
  limit = null, // NEW: limit number of rows (e.g., 5)
  showPagination = true, // NEW: control pagination
  withContainer = true, // NEW: control Box wrapper
  onDataFetched,
}) {
  const [studentProfiles, setStudentProfiles] = useState([]);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
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

      const { data } = await axios.get("/unverified-email");
      setStudentProfiles(data);
      if (typeof onDataFetched === "function") {
        onDataFetched(data.length);
      }
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

  const openDenyModal = () => {
    setIsDenyModalOpen(true); // Open the modal
    setOpen(false);
  };

  const handleRemove = async () => {
    if (!selectedRow?._id) return;

    try {
      const res = await axios.delete(`/remove-unverified/${selectedRow._id}`);

      if (res.status === 200) {
        toast.success("Student removed successfully");
        setStudentProfiles((prev) =>
          prev.filter((profile) => profile._id !== selectedRow._id)
        );
      } else {
        toast.error(res.data.message || "Failed to remove student");
      }
    } catch (err) {
      console.error("Error deleting student:", err);
      toast.error("An error occurred while removing the student");
    } finally {
      // Close the confirmation modal no matter what
      setIsDenyModalOpen(false);
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
          setIsDenyModalOpen={setIsDenyModalOpen}
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
      {showDeny && (
        <ConfirmationModal
          open={isDenyModalOpen}
          title="Delete unverified email account?"
          itemName={selectedRow?.name || ""}
          onClose={() => setIsDenyModalOpen(false)}
          onConfirm={handleRemove}
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
