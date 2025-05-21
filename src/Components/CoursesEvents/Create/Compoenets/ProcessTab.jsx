import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";

export default function ProcessTab({ formSections, currentTab, onTabChange }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={currentTab}
        onChange={onTabChange}
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          borderBottom: "1px solid #ccc",
          "& .MuiTab-root": {
            backgroundColor: "white",
            fontWeight: 600,
            textTransform: "none",
            minWidth: "fit-content",
            px: 3,
            color: "#00AE60 !important",
          },
          "& .Mui-selected": {
            fontWeight: "700 !important",
            color: "#00AE60 !important",
          },
        }}
      >
        {formSections.map((section, index) => (
          <Tab key={index} label={section.label} />
        ))}
      </Tabs>
      <Box sx={{ p: 2, minHeight: 200 }}>
        {formSections[currentTab].content}
      </Box>
    </Box>
  );
}

ProcessTab.propTypes = {
  formSections: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  currentTab: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired, // ✅ add this
};
