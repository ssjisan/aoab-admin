import {
  Autocomplete,
  Box,
  Button,
  Drawer,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Cross } from "../../../../assets/IconSet";
import { useState } from "react";

export default function FilterDrawer({
  open,
  onClose,
  handleSearchChange,
  search,
  setSearch,
  handleApplyFilters,
  yearFrom,
  setYearFrom,
  yearTo,
  setYearTo,
}) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Stack
        sx={{ maxWidth: "100%", width: "380px", height: "100vh" }}
        justifyContent="space-between"
      >
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            p: "16px",
            borderBottom: "1px solid rgba(145, 142, 175, 0.24)",
          }}
        >
          <Typography variant="h6">Filter</Typography>
          <IconButton onClick={onClose}>
            <Cross color="#000" size="24px" />
          </IconButton>
        </Stack>
        <Stack
          gap="24px"
          sx={{
            p: "16px",
            height: "100%",
          }}
        >
          <Stack gap="4px">
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.primary"
            >
              Search
            </Typography>
            <TextField
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              size="small"
            />
          </Stack>

          <Stack gap="4px">
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.primary"
            >
              Year From
            </Typography>
            <TextField
              variant="outlined"
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              fullWidth
              size="small"
              type="number"
              placeholder="Start Year (e.g., 2015)"
            />
          </Stack>

          <Stack gap="4px">
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.primary"
            >
              Year To
            </Typography>
            <TextField
              variant="outlined"
              value={yearTo}
              onChange={(e) => {
                setYearTo(e.target.value);
              }}
              fullWidth
              size="small"
              type="number"
              placeholder="End Year (e.g., 2023)"
            />
          </Stack>

          {/* <Stack gap="4px">
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.primary"
            >
              Select Course
            </Typography>
          </Stack> */}
        </Stack>

        <Stack
          flexDirection="row"
          gap="8px"
          sx={{ p: "16px", borderTop: "1px solid rgba(145, 142, 175, 0.24)" }}
        >
          <Button
            variant="soft"
            sx={{ width: "100%" }}
            color="#000"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
