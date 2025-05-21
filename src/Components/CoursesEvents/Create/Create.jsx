import { Button, Typography, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/system";
import ProcessTab from "./Compoenets/ProcessTab";
import { useEffect, useState } from "react";
import BasicInformation from "./../Update/BasicInformation";
import Prerequisites from "./Compoenets/Prerequisites";
import axios from "axios";
import Recipients from "./Compoenets/Recipients/Recipients";
import DetailsAndCover from "./Compoenets/Details&Cover/DetailsAndCover";
import CertificateDesign from "./Compoenets/Certificate/CertificateDesign";

export default function Create() {
  const [courses, setCourses] = useState([]); // State to hold fetched courses

  useEffect(() => {
    // Fetch course data from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/setup_course");
        setCourses(response.data); // Assuming response is an array of course data
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const formSections = [
    {
      label: "Basic Info",
      content: <BasicInformation courses={courses} />,
    },
    {
      label: "Details & Cover",
      content: <DetailsAndCover />,
    },
    {
      label: "Prerequisites",
      content: <Prerequisites courses={courses} />,
    },
    {
      label: "Recipients",
      content: <Recipients />,
    },
    {
      label: "Certificate Setup",
      content: <CertificateDesign/>,
    },
  ];
  const forBelow1200 = useMediaQuery("(max-width:1200px)");
  const [currentTab, setCurrentTab] = useState(0);

  const handleNext = () => {
    if (currentTab < formSections.length - 1) {
      setCurrentTab((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentTab > 0) {
      setCurrentTab((prev) => prev - 1);
    }
  };
  return (
    <>
      <ProcessTab
        formSections={formSections}
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
      <Stack
        direction={"row"}
        justifyContent={"center"}
        gap="16px"
        sx={{
          position: "fixed",
          bottom: "0px",
          left: forBelow1200 ? "0" : "280px",
          right: "0",
          zIndex: 1000,
          p: "12px 40px",
          background: "#FFF",
          borderTop: "1px solid rgba(145, 142, 175, 0.4)",
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={
            currentTab === 0
              ? () => {
                  window.history.back();
                }
              : handleBack
          }
          //   disabled={isSubmitting}
        >
          {currentTab === 0 ? "Cancel" : "Back"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          //   disabled={isSubmitting}
        >
          {currentTab === formSections.length - 1 ? "Complete" : "Save & Next"}
        </Button>
      </Stack>
    </>
  );
}
