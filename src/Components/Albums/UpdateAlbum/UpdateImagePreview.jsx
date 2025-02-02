import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Cross, Drag } from "../../../assets/IconSet";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function UpdateImagePreview({ images, setImages, isLoading }) {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    setImages(reorderedImages); // Update images state with reordered images
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
    setImages(updatedImages); // Update images array without the removed image
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="images">
        {(provided) => (
          <Stack
            direction="column"
            gap="16px"
            sx={{ mt: "40px" }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {images.map((data, index) => (
              <Draggable
                key={data._id || data.name} // Use unique key
                draggableId={data._id || data.name}
                index={index}
              >
                {(provided) => (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      border: "1px solid #DBDCDC",
                      borderRadius: "12px",
                      p: "8px 4px",
                      backgroundColor: "white",
                    }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Stack direction="row" alignItems="center" gap="12px">
                      <IconButton {...provided.dragHandleProps}>
                        <Drag size={24} color="#000" />
                      </IconButton>
                      <Stack>
                        <img
                          src={data.src}
                          alt={data.name}
                          style={{
                            width: "80px",
                            height: "48px",
                            borderRadius: "4px",
                            objectFit: "cover",
                          }}
                        />
                      </Stack>
                      <Box
                        sx={{
                          width: "272px",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {data.name}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap="12px">
                      <Typography variant="body1">{data.size} MB</Typography>
                      {isLoading ? (
                        <Box sx={{ height: "24px", width: "36px" }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <IconButton onClick={() => handleRemoveImage(index)}>
                          <Cross size={24} color="#F15555" />
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
