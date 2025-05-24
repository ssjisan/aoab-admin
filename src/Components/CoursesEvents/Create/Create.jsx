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
import toast from "react-hot-toast";
import Enrollment from "./Compoenets/Enrollment/Enrollment";

export default function Create() {
  const forBelow1200 = useMediaQuery("(max-width:1200px)");
  const [currentTab, setCurrentTab] = useState(0);

  //-------------------------------------------------------- Course Load using api from db Start Here--------------------------------------------------------//

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState(null);

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
  const [courseId, setCourseId] = useState("");
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
  //-------------------------------------------------------- Basic Info Data End Here --------------------------------------------------//

  //-------------------------------------------------------- Details & Cover Data State Here --------------------------------------------------//
  const [details, setDetails] = useState("");

  const handleQuillChange = (content) => {
    setDetails(content);
  };

  //-------------------------------------------------------- Details & Cover Data End Here --------------------------------------------------//

  //-------------------------------------------------------- Prerequisites Data State Here --------------------------------------------------//
  const [postGradRequired, setPostGradRequired] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [requiresPrerequisite, setRequiresPrerequisite] = useState("");
  const [selectedPrerequisiteCourses, setSelectedPrerequisiteCourses] =
    useState([]);
  const [restrictReenrollment, setRestrictReenrollment] = useState(true);

  const handleCourseToggle = (courseId) => {
    setSelectedPrerequisiteCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  //-------------------------------------------------------- Prerequisites Data End Here --------------------------------------------------//

  //-------------------------------------------------------- Enrollment Funcation Start Here--------------------------------------------------------//
  const [studentCap, setStudentCap] = useState("");
  const [waitlistCap, setWaitlistCap] = useState("");
  const [registrationStartDate, setRegistrationStartDate] = useState(null);
  const [registrationEndDate, setRegistrationEndDate] = useState(null);
  const [registrationStartDateError, setRegistrationStartDateError] =
    useState("");
  const [registrationEndDateError, setRegistrationEndDateError] = useState("");
  const handleRegistrationStartDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).toISOString();
    if (newDate && newDate.isBefore(dayjs(), "day")) {
      setRegistrationStartDateError("Start date cannot be in the past!");
    } else {
      setRegistrationStartDateError("");
      setRegistrationStartDate(formattedDate);
    }
  };

  const handleRegistrationEndDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).toISOString();
    if (newDate && newDate.isBefore(dayjs(), "day")) {
      setRegistrationEndDateError("End date cannot be in the past!");
    } else if (newDate && newDate.isBefore(registrationStartDate, "day")) {
      setRegistrationEndDateError(
        "End date cannot be earlier than start date!"
      );
    } else {
      setRegistrationEndDateError("");
      setRegistrationEndDate(formattedDate);
    }
  };
  //-------------------------------------------------------- Enrollment Funcation end Here--------------------------------------------------------//


  const [search, setSearch] = useState("");
  const [selectedCategoryForRecipients, setSelectedCategoryForRecipients] = useState(null);
  const [studentProfiles, setStudentProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseWiseStudents, setCourseWiseStudents] = useState({});

  const loadStudentsProfile = async (search = "") => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      const { data } = await axios.get(`/verified-accounts?${params.toString()}`);
      setStudentProfiles(data);
    } catch (err) {
      console.error("Error loading student profiles:", err);
      toast.error("Students Profile can't load");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = () => {
    loadStudentsProfile(search);
  };

  const isStudentAlreadyAdded = (studentId) => {
    return Object.values(courseWiseStudents).some((students) =>
      students.some((student) => student._id === studentId)
    );
  };

  const handleAddStudent = (student) => {
    if (!selectedCategoryForRecipients) {
      toast.error("Please select a course first");
      return;
    }

    const courseId = selectedCategoryForRecipients._id;

    if (isStudentAlreadyAdded(student._id)) {
      toast("This student is already added to a course.");
      return;
    }

    setCourseWiseStudents((prev) => {
      const updated = { ...prev };
      if (!updated[courseId]) {
        updated[courseId] = [];
      }
      updated[courseId].push(student);
      return updated;
    });
  };

  const handleRemoveStudent = (courseId, studentId) => {
    setCourseWiseStudents((prev) => {
      const updated = { ...prev };
      updated[courseId] = updated[courseId].filter((s) => s._id !== studentId);
      if (updated[courseId].length === 0) {
        delete updated[courseId];
      }
      return updated;
    });
  };

  const handlePreviewSubmit = () => {
    const dataToSubmit = Object.entries(courseWiseStudents).map(([courseId, students]) => ({
      courseId,
      courseName: courses.find((c) => c._id === courseId)?.courseName || "N/A",
      students: students.map(({ _id, name, email, bmdcNo, contactNumber }) => ({
        _id,
        name,
        email,
        bmdcNo,
        contactNumber,
      })),
    }));

    console.log("📦 Data to be submitted:", dataToSubmit);
    toast.success("Check console for submission preview");
  };


  const handleSubmit = async () => {
    try {
      if (currentTab === 0) {
        const payload = {
          title,
          category: selectedCourses?._id,
          location,
          fee: fees,
          startDate,
          endDate,
          contactPersons,
          status: "draft",
        };

        if (courseId) {
          await axios.put(`/courses/${courseId}`, payload);
        } else {
          const res = await axios.post(`/courses`, payload);
          setCourseId(res.data._id);
        }
      } else if (currentTab === 1 && courseId) {
        const payload = {
          category: selectedCourses?._id,
          title,
          details,
        };

        await axios.put(`/courses/${courseId}`, payload);
      } else if (currentTab === 2 && courseId) {
        const payload = {
          category: selectedCourses?._id,
          title,
          requiresPrerequisite,
          postGradRequired,
          yearFrom,
          yearTo,
          restrictReenrollment,
          selectedPrerequisiteCourses: selectedPrerequisiteCourses,
        };

        await axios.put(`/courses/${courseId}`, payload);
        2;
      } else if (currentTab === 3 && courseId) {
        const payload = {
          category: selectedCourses?._id,
          title,
          studentCap,
          waitlistCap,
          registrationStartDate,
          registrationEndDate,
        };

        await axios.put(`/courses/${courseId}`, payload);
        2;
      }

      toast.success("Saved!");
      return true;
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
      return false;
    }
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
      content: (
        <DetailsAndCover
          details={details}
          handleQuillChange={handleQuillChange}
        />
      ),
    },
    {
      label: "Prerequisites",
      content: (
        <Prerequisites
          courses={courses}
          postGradRequired={postGradRequired}
          setPostGradRequired={setPostGradRequired}
          yearFrom={yearFrom}
          setYearFrom={setYearFrom}
          yearTo={yearTo}
          setYearTo={setYearTo}
          requiresPrerequisite={requiresPrerequisite}
          setRequiresPrerequisite={setRequiresPrerequisite}
          selectedPrerequisiteCourses={selectedPrerequisiteCourses}
          handleCourseToggle={handleCourseToggle}
          restrictReenrollment={restrictReenrollment}
          setRestrictReenrollment={setRestrictReenrollment}
        />
      ),
    },
    {
      label: "Enrollment",
      content: (
        <Enrollment
          registrationStartDate={registrationStartDate}
          registrationStartDateError={registrationStartDateError}
          handleRegistrationStartDateChange={handleRegistrationStartDateChange}
          registrationEndDate={registrationEndDate}
          registrationEndDateError={registrationEndDateError}
          handleRegistrationEndDateChange={handleRegistrationEndDateChange}
          studentCap={studentCap}
          setStudentCap={setStudentCap}
          waitlistCap={waitlistCap}
          setWaitlistCap={setWaitlistCap}
        />
      ),
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

  const handleNext = async () => {
    const saved = await handleSubmit();
    if (saved) {
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
