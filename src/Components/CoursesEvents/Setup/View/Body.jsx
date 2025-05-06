import {
  Box,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import CustomePopOver from "../../../Common/PopOver/CustomePopOver";
import { Drag, Edit, More, Remove } from "../../../../assets/IconSet";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

export default function Body({
  courseSetup,
  onDragEnd,
  handleCloseMenu,
  handleOpenMenu,
  open,
  selectedRowId,
  setDataToDelete,
  setIsModalOpen,
  redirectEdit
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="courseSetup">
        {(provided) => (
          <TableBody ref={provided.innerRef} {...provided.droppableProps}>
            {courseSetup.map((data, index) => {
              return (
                <Draggable key={data._id} draggableId={data._id} index={index}>
                  {(provided) => (
                    <TableRow
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TableCell align="center" sx={{ width: "40px" }}>
                        <Tooltip title="Drag">
                          <IconButton sx={{ width: "40px", height: "40px" }}>
                            <Drag color="#919EAB" size={24} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left">
                        <Tooltip title={data.title}>
                          <Box
                            sx={{
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              width: "320px",
                            }}
                          >
                            {data.courseName}
                          </Box>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left">
                        {data.typeOfParticipation === 0 ? "Single" : "Multiple"}{" "}
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
              );
            })}
            {provided.placeholder}
          </TableBody>
        )}
      </Droppable>
      <CustomePopOver
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        menuItems={[
          {
            label: "Edit",
            icon: Edit,
            onClick: () => {
              redirectEdit(selectedRowId);
              handleCloseMenu();
            },
          },
          {
            label: "Delete",
            icon: Remove,
            onClick: () => {
              setDataToDelete(selectedRowId);
              setIsModalOpen(true);
              handleCloseMenu();
            },
            color: "error",
          },
        ]}
      />
    </DragDropContext>
  );
}
Body.propTypes = {
  courseSetup: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      publishedDate: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selectedRowId: PropTypes.object,
  onDragEnd: PropTypes.func.isRequired,
  redirectEdit: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  handleOpenMenu: PropTypes.func.isRequired,
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  setDataToDelete: PropTypes.func.isRequired,
};
