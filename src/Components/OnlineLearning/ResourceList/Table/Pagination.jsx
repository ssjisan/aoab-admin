import { TablePagination } from "@mui/material";
import PropTypes from "prop-types";

export default function Pagination({
  resources,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  return (
    <TablePagination
      rowsPerPageOptions={[20]}
      component="div"
      count={resources.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{
        borderBottom: "none",
        borderTop: "1px solid rgba(145, 158, 171, 0.24)",
      }}
    />
  );
}
Pagination.propTypes = {
  resources: PropTypes.any,
  rowsPerPage: PropTypes.any,
  page: PropTypes.func,
  handleChangePage: PropTypes.any,
  handleChangeRowsPerPage: PropTypes.any,
};
