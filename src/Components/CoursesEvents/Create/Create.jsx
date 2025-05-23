import { Button, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/system";
import ProcessTab from "./Compoenets/ProcessTab";
import { useEffect, useState } from "react";
import Prerequisites from "./Compoenets/Prerequisites";
import axios from "axios";
import Recipients from "./Compoenets/Recipients/Recipients";
import DetailsAndCover from "./Compoenets/Details&Cover/DetailsAndCover";
import CertificateDesign from "./Compoenets/Certificate/CertificateDesign";
import BasicInfo from "./Compoenets/BasicInfo/BasicInfo";
import dayjs from "dayjs";

export default function Create() {
  const forBelow1200 = useMediaQuery("(max-width:1200px)");
  const [currentTab, setCurrentTab] = useState(0);

  //-------------------------------------------------------- Course Load using api from db Start Here--------------------------------------------------------//

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/category_list");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);
  //-------------------------------------------------------- Course Load using api from db end Here--------------------------------------------------------//

  //-------------------------------------------------------- Basic Info Data State Start Here --------------------------------------------------//
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [fees, setFees] = useState("");
  const [contactPersons, setContactPersons] = useState([
    { name: "", email: "" },
  ]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const handleStartDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).toISOString();
    if (newDate && newDate.isBefore(dayjs(), "day")) {
      setStartDateError("Start date cannot be in the past!");
    } else {
      setStartDateError("");
      setStartDate(formattedDate);
    }
  };

  const handleEndDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).toISOString();
    if (newDate && newDate.isBefore(dayjs(), "day")) {
      setEndDateError("End date cannot be in the past!");
    } else if (newDate && newDate.isBefore(startDate, "day")) {
      setEndDateError("End date cannot be earlier than start date!");
    } else {
      setEndDateError("");
      setEndDate(formattedDate);
    }
  };

  const handleContactChange = (index, field, value) => {
    const updated = [...contactPersons];
    updated[index][field] = value;
    setContactPersons(updated);
  };

  const addContact = () => {
    setContactPersons([...contactPersons, { name: "", email: "" }]);
  };

  const removeContact = (index) => {
    const updated = [...contactPersons];
    updated.splice(index, 1);
    setContactPersons(updated);
  };

  const formSections = [
    {
      label: "Basic Info",
      content: (
        <BasicInfo
          courses={courses}
          selectedCourses={selectedCourses}
          setSelectedCourses={setSelectedCourses}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          title={title}
          setTitle={setTitle}
          location={location}
          setLocation={setLocation}
          fees={fees}
          setFees={setFees}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          startDateError={startDateError}
          endDateError={endDateError}
          contactPersons={contactPersons}
          handleContactChange={handleContactChange}
          addContact={addContact}
          removeContact={removeContact}
        />
      ),
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
      content: <Recipients courses={courses} />,
    },
    {
      label: "Certificate Setup",
      content: <CertificateDesign />,
    },
  ];

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
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
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
