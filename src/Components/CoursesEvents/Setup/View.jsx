import { Table, TableContainer } from "@mui/material";
import CustomeHeader from "../../Common/Table/CustomeHeader";
import Body from "./View/Body";
import CustomePagination from "../../Common/Table/CustomePagination";
import PropTypes from "prop-types";

export default function View({
  courseSetup,
  onDragEnd,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  handleCloseMenu,
  handleOpenMenu,
  open,
  selectedRowId,
  dataToDelete,
  setDataToDelete,
  setIsModalOpen,
  redirectEdit
}) {
  // ***************** Table Header Columns ************************* //

  const columns = [
    { key: "name", label: "Course Name" },
    { key: "typeOfParticipation	", label: "Type of Participation" },
  ];

  // ***************** Table Header Columns ************************* //
  return (
    <TableContainer>
      <Table>
        <CustomeHeader
          columns={columns}
          includeActions={true}
          includeDrag={true}
        />
        <Body
          courseSetup={courseSetup.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )}
          onDragEnd={onDragEnd}
          page={page}
          rowsPerPage={rowsPerPage}
          handleCloseMenu={handleCloseMenu}
          handleOpenMenu={handleOpenMenu}
          open={open}
          selectedRowId={selectedRowId}
          dataToDelete={dataToDelete}
          setDataToDelete={setDataToDelete}
          setIsModalOpen={setIsModalOpen}
          redirectEdit={redirectEdit}
        />
        <CustomePagination
          count={courseSetup.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
}
View.propTypes = {
  courseSetup: PropTypes.array.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  handleOpenMenu: PropTypes.func.isRequired,
  open: PropTypes.any, // could be an element or null
  selectedRowId: PropTypes.any, // id could be string, number, object
  dataToDelete: PropTypes.object, // object or null
  setDataToDelete: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  redirectEdit: PropTypes.func.isRequired,
};
