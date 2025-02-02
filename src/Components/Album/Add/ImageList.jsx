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

export default function ImageList({
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

  // Separate error images from valid images
  const errorImages = images.filter((image) => image.error);
  const validImages = images.filter((image) => !image.error);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="validImages">
        {(provided) => (
          <Stack {...provided.droppableProps} ref={provided.innerRef}>
            {validImages.map((data, index) => (
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
                      backgroundColor: "white",
                      mb: "16px",
                    }}
                  >
                    <Stack direction="row" alignItems="center" gap="12px">
                      <IconButton
                        {...provided.dragHandleProps}
                        disabled={isSubmitting}
                      >
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
      <Droppable droppableId="errorImages" isDropDisabled>
        {(provided) => (
          <Stack
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{ mt: "24px" }}
          >
            {errorImages.length > 0 && (
              <Box
                sx={{
                  backgroundColor: "#f8d7da",
                  borderRadius: "8px",
                  padding: "12px",
                  mb: "16px",
                }}
              >
                <Typography variant="h6" color="error" gutterBottom>
                  Error Files
                </Typography>
                {errorImages.map((data) => (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    key={data.id}
                    sx={{
                      backgroundColor: "#f8d7da",
                      borderRadius: "8px",
                      p: "8px",
                      mb: "8px",
                    }}
                  >
                    <Typography variant="body2" color="error">
                      {data.name} ({data.size} MB) - {data.error}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            )}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
}

// Prop Types validation
ImageList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      error: PropTypes.bool,
    })
  ).isRequired,
  setImages: PropTypes.func.isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};
