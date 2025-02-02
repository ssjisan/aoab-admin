import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Cross, Drag } from "../../../assets/IconSet";
import PropTypes from "prop-types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function UploadImagePreview({
  images,
  setImages,
  handleRemoveImage,
  isSubmitting,
}) {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="images">
        {(provided) => (
          <Stack
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{ p: "40px 0px" }}
          >
            {images.map((data, index) => (
              <Draggable key={data.id} draggableId={data.id} index={index}>
                {(provided) => (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                      border: "1px solid #DBDCDC",
                      borderRadius: "12px",
                      p: "8px 4px",
                      mt: 2,
                      backgroundColor: "white",
                    }}
                  >
                    <Stack direction="row" alignItems="center" gap="12px">
                      <IconButton {...provided.dragHandleProps} disabled={isSubmitting}>
                        <Drag size={24} color="#000" />
                      </IconButton>
                      <Stack>
                        <img
                          src={data.src}
                          alt="Uploaded"
                          style={{
                            width: "80px",
                            height: "48px",
                            borderRadius: "4px",
                            objectFit: "cover",
                          }}
                        />
                      </Stack>
                      <Typography variant="body1">{data.name}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap="12px">
                      <Typography variant="body1">{data.size} MB</Typography>
                      {isSubmitting ? (
                        <Box sx={{ height: "24px", width: "36px" }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <IconButton onClick={() => handleRemoveImage(data.id)}>
                          <Cross size={24} color="red" />
                        </IconButton>
                      )}
                    </Stack>
                  </Stack>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
}

UploadImagePreview.propTypes = {
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
  isSubmitting: PropTypes.func.isRequired,
};
