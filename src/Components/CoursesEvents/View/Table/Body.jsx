import {
  IconButton,
  MenuItem,
  Popover,
  TableBody,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";
import {
  Remove,
  More,
  Edit,
  Drag,
  NoData,
  EyeBold,
} from "../../../../assets/IconSet";
import { format } from "date-fns";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Body({
  coursesEvents,
  selectedRowId,
  onDragEnd,
  selectedTab,
  handlePreview,
  handleCloseMenu,
  handleOpenMenu,
  open,
  setDataToDelete,
  setIsModalOpen,
  redirectEdit
}) {
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="coursesEvents">
        {(provided) => (
          <TableBody ref={provided.innerRef} {...provided.droppableProps}>
            {coursesEvents.length === 0 ? (
              <TableRow sx={{ height: "360px" }}>
                <TableCell colSpan={9} align="center">
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
              coursesEvents.map((data, index) => (
                <Draggable
                  key={data._id}
                  draggableId={data._id}
                  index={index}
                  isDragDisabled={selectedTab === "archived"} // Disable drag for archived events
                >
                  {(provided, snapshot) => (
                    <TableRow
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? 0.5 : 1, // Optional styling during drag
                      }}
                    >
                      {selectedTab === "running" && (
                        <TableCell align="center" sx={{ width: "40px" }}>
                          <Tooltip title="Drag">
                            <IconButton sx={{ width: "40px", height: "40px" }}>
                              <Drag color="#919EAB" size={24} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      )}
                      <TableCell
                        align="left"
                        sx={{ padding: "16px", width: "280px" }}
                      >
                        {data.title}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ padding: "16px", width: "280px" }}
                      >
                        {data.location}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ padding: "16px", width: "320px" }}
                      >
                        {data.language}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ padding: "16px", width: "280px" }}
                      >
                        {data.fees} Taka
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ padding: "16px", width: "200px" }}
                      >
                        {data.contactPerson}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ padding: "16px", width: "140px" }}
                      >
                        {data.contactEmail}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ padding: "16px", width: "240px" }}
                      >
                        {data.startDate
                          ? format(new Date(data.startDate), "dd MMMM, yyyy")
                          : ""}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ padding: "16px", width: "240px" }}
                      >
                        {data.endDate
                          ? format(new Date(data.endDate), "dd MMMM, yyyy")
                          : ""}
                      </TableCell>
                      <TableCell align="center">
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
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </TableBody>
        )}
      </Droppable>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: 160,
              p: "8px",
              borderRadius: "8px",
              boxShadow: "-20px 20px 40px -4px rgba(145, 158, 171, 0.24)",
            },
          },
        }}
      >
        <MenuItem
          sx={{ display: "flex", gap: "16px", mb: "8px", borderRadius: "8px" }}
          onClick={() => handlePreview(selectedRowId)}
        >
          <EyeBold color="#919EAB" size={20} />
          Preview
        </MenuItem>
        {selectedTab === "running" &&
        <MenuItem
          sx={{ display: "flex", gap: "16px", mb: "8px", borderRadius: "8px" }}
          onClick={(e) => redirectEdit(e, selectedRowId)}
        >
          <Edit color="#919EAB" size={20} />
          Edit
        </MenuItem>}
        <MenuItem
          sx={{
            color: "error.main",
            display: "flex",
            gap: "16px",
            borderRadius: "8px",
          }}
          onClick={() => {
            setDataToDelete(selectedRowId);
            setIsModalOpen(true);
            handleCloseMenu(); // Close popover
          }}
        >
          <Remove color="red" size={20} /> Delete
        </MenuItem>
      </Popover>
    </DragDropContext>
  );
}

Body.propTypes = {
  coursesEvents: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
      fees: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
  redirectEdit:PropTypes.func.isRequired
};
