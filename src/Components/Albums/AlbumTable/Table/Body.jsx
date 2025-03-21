import {
  Box,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Drag, Edit, EyeBold, More, Remove } from "../../../../assets/IconSet";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Body({
  albums,
  page,
  rowsPerPage,
  open,
  handleOpenMenu,
  handleCloseMenu,
  handlePreviewAlbum,
  showConfirmationModal,
  redirectEdit,
  selectedAlbum,
  onDragEnd,
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="albums">
        {(provided) => (
          <TableBody ref={provided.innerRef} {...provided.droppableProps}>
            {albums
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data, index) => {
                // For Image size
                const imageArray = Array.isArray(data.images)
                  ? data.images
                  : [];
                const totalSize = imageArray.reduce(
                  (acc, image) => acc + image.size,
                  0
                );
                return (
                  <Draggable
                    key={data._id}
                    draggableId={data._id}
                    index={index}
                  >
                    {(provided) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TableCell align="center">
                          <Tooltip title="Drag">
                            <IconButton sx={{ width: "40px", height: "40px" }}>
                              <Drag color="#919EAB" size={24} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            {data?.images?.length > 0 && ( // Check if images array is not empty
                              <Box
                                sx={{
                                  width: "80px",
                                  height: "48px",
                                  borderRadius: "8px",
                                  overflow: "hidden",
                                }}
                              >
                                <img
                                  src={data.images[0].src}
                                  alt="First Image"
                                  width="100%"
                                  height="100%"
                                  style={{ objectFit: "cover" }}
                                />
                              </Box>
                            )}
                            <Typography variant="subtitle2" align="left">
                              {data.name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left" sx={{ p: "16px" }}>
                          {format(new Date(data.createdAt), "dd MMM, yy")}
                        </TableCell>
                        <TableCell align="center" sx={{ p: "16px" }}>
                          {data?.images?.length}
                        </TableCell>
                        <TableCell align="center" sx={{ p: "16px" }}>
                          {totalSize.toFixed(2)} MB
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
                    )}
                  </Draggable>
                );
              })}
            {provided.placeholder}
          </TableBody>
        )}
      </Droppable>
      <Popover
        open={open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            width: 160,
            p: "8px",
            borderRadius: "8px",
            boxShadow: "-20px 20px 40px -4px rgba(145, 158, 171, 0.24)",
          },
        }}
      >
        <MenuItem
          sx={{ display: "flex", gap: "8px", mb: "8px", borderRadius: "8px" }}
          onClick={handlePreviewAlbum}
        >
          <EyeBold color="#919EAB" size={20} />
          Preview
        </MenuItem>
        <MenuItem
          sx={{ display: "flex", gap: "8px", mb: "8px", borderRadius: "8px" }}
          onClick={(e) => redirectEdit(e, selectedAlbum)}
        >
          <Edit color="#919EAB" size={20} />
          Edit
        </MenuItem>
        <MenuItem
          sx={{
            color: "error.main",
            display: "flex",
            gap: "8px",
            borderRadius: "8px",
          }}
          onClick={showConfirmationModal}
        >
          <Remove color="red" size={20} /> Delete
        </MenuItem>
      </Popover>
    </DragDropContext>
  );
}

Body.propTypes = {
  albums: PropTypes.any,
  page: PropTypes.any,
  rowsPerPage: PropTypes.any,
  open: PropTypes.any,
  handleOpenMenu: PropTypes.any,
  handleCloseMenu: PropTypes.any,
  selectedAlbum: PropTypes.any,
  albumOpen: PropTypes.any,
  setAlbumOpen: PropTypes.any,
  handlePreviewAlbum: PropTypes.any,
  handleAlbumClose: PropTypes.any,
  showConfirmationModal: PropTypes.any,
  redirectEdit: PropTypes.any,
  onDragEnd: PropTypes.func.isRequired, // Updated to require a function
};
