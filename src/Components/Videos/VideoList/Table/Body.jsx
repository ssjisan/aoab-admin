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
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Body({
  videos,
  page,
  open,
  rowsPerPage,
  handleOpenMenu,
  handleCloseMenu,
  formatDate,
  showConfirmationModal,
  selectedVideo,
  handleVideoPlay,
  redirectEdit,
  onDragEnd, // Callback to handle the drag end event
}) {
  const getVideoId = (url) => {
    const videoIdRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:\S+\?v=))|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null; // Return video ID or null
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="videosDroppable">
        {(provided) => (
          <TableBody ref={provided.innerRef} {...provided.droppableProps}>
            {videos
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data, index) => {
                const videoId = getVideoId(data.url); // Get video ID from URL
                const thumb =
                  data.videoType === "google-drive"
                    ? data.thumbnail[0]?.url
                    : `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
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
                        sx={{ overflow: "hidden" }}
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
                            <Box
                              sx={{
                                width: "80px",
                                height: "48px",
                                borderRadius: "8px",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                src={thumb} // Reference the thumbnail URL here
                                alt="First Image"
                                width="100%"
                                height="100%"
                                style={{ objectFit: "cover" }}
                              />
                            </Box>
                            <Typography variant="subtitle2" align="left">
                              {data.title}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left" sx={{ p: "16px" }}>
                          {data.videoType}
                        </TableCell>
                        <TableCell align="left" sx={{ p: "16px" }}>
                          {formatDate(data.createdAt)}
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
          onClick={handleVideoPlay}
        >
          <EyeBold color="#919EAB" size={20} />
          Preview
        </MenuItem>
        <MenuItem
          sx={{ display: "flex", gap: "8px", mb: "8px", borderRadius: "8px" }}
          onClick={(e) => redirectEdit(e, selectedVideo)}
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
  videos: PropTypes.any,
  page: PropTypes.any,
  rowsPerPage: PropTypes.any,
  open: PropTypes.any,
  handleOpenMenu: PropTypes.any,
  handleCloseMenu: PropTypes.any,
  formatDate: PropTypes.any,
  onDragEnd: PropTypes.func.isRequired,
  showConfirmationModal: PropTypes.func.isRequired,
  selectedVideo: PropTypes.func.isRequired,
  handleVideoPlay: PropTypes.func.isRequired,
  redirectEdit: PropTypes.func.isRequired,
};
