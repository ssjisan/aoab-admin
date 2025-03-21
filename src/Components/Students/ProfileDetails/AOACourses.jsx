import { Stack, Table, TableContainer, Typography } from "@mui/material";
import Header from "./Table/Header";
import Body from "./Table/Body";
import PropTypes from "prop-types";

export default function AOACourses({ profile }) {
  return (
    <Stack
      sx={{
        width: "100%",
        borderRadius: "12px",
        border: "1px solid #05060f08",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        p: "16px",
      }}
      gap="16px"
    >
      <Stack sx={{ p: "8px" }}>
        <Typography variant="h5" sx={{ fontWeight: "700" }}>
          AOA Courses & Others Details
        </Typography>
      </Stack>
      <TableContainer sx={{ borderRadius: "12px", overflow: "hidden" }}>
        <Table>
          <Header />
          <Body profile={profile} />
        </Table>
      </TableContainer>
    </Stack>
  );
}

// Define PropTypes
AOACourses.propTypes = {
  profile: PropTypes.shape({
    aoaCourses: PropTypes.arrayOf(
      PropTypes.shape({
        courseName: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
      })
    ),
    otherDetails: PropTypes.object, // Adjust based on actual structure
  }),
};
