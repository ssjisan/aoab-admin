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
import { useNavigate, useParams } from "react-router-dom";

export default function Create() {
  const forBelow1200 = useMediaQuery("(max-width:1200px)");
  const [currentTab, setCurrentTab] = useState(0);
  const navigate = useNavigate(); // Add this inside your component
  const { id } = useParams();

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
  const [coverPhoto, setCoverPhoto] = useState("");
  const [photoUploadError, setPhotoUploadError] = useState(null);

  const handleQuillChange = (content) => {
    setDetails(content);
  };
  const handleCoverPhoto = (event) => {
    const file = event.target.files[0];
    const MAX_SIZE_MB = 3; // Changed max size to 3 MB

    if (file) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2); // Convert bytes to MB and round to two decimals

      if (fileSizeMB > MAX_SIZE_MB) {
        setPhotoUploadError({
          fileName: file.name,
          fileSize: fileSizeMB,
          message: "File is larger than 3MB.",
        });
        return;
      }

      setPhotoUploadError(null); // Clear any previous error
      setCoverPhoto(file); // Set the uploaded file
    }
  };

  const removeImage = () => {
    setCoverPhoto(null);
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
  const [paymentReceiveStartDate, setPaymentReceiveStartDate] = useState(null);
  const [paymentReceiveEndDate, setPaymentReceiveEndDate] = useState(null);
  const [registrationStartDateError, setRegistrationStartDateError] =
    useState("");
  const [registrationEndDateError, setRegistrationEndDateError] = useState("");
  const [paymentReceiveStartDateError, setPaymentReceiveStartDateError] =
    useState("");
  const [paymentReceiveEndDateError, setPaymentReceiveEndDateError] =
    useState("");
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
  const handlePaymentReceiveStartDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).toISOString();
    if (newDate && newDate.isBefore(dayjs(), "day")) {
      setPaymentReceiveStartDateError("Start date cannot be in the past!");
    } else {
      setPaymentReceiveStartDateError("");
      setPaymentReceiveStartDate(formattedDate);
    }
  };
  const handlePaymentReceiveEndDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).toISOString();
    if (newDate && newDate.isBefore(dayjs(), "day")) {
      setPaymentReceiveEndDateError("Start date cannot be in the past!");
    } else {
      setPaymentReceiveEndDateError("");
      setPaymentReceiveEndDate(formattedDate);
    }
  };
  //-------------------------------------------------------- Enrollment Funcation end Here--------------------------------------------------------//

  //-------------------------------------------------------- Receipents Funcation Start Here--------------------------------------------------------//

  const [searchForProfile, setSearchForProfile] = useState("");
  const [selectedCategoryForRecipients, setSelectedCategoryForRecipients] =
    useState(null);
  const [studentProfiles, setStudentProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseWiseStudents, setCourseWiseStudents] = useState({});

  const loadStudentsProfile = async (searchForProfile = "") => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchForProfile) params.append("search", searchForProfile);
      const { data } = await axios.get(
        `/verified-accounts?${params.toString()}`
      );
      setStudentProfiles(data);
    } catch (err) {
      console.error("Error loading student profiles:", err);
      toast.error("Students Profile can't load");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = () => {
    loadStudentsProfile(searchForProfile);
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

    const categoryId = selectedCategoryForRecipients._id;

    if (isStudentAlreadyAdded(student._id)) {
      toast("This student is already added to a course.");
      return;
    }

    setCourseWiseStudents((prev) => {
      const updated = { ...prev };
      if (!updated[categoryId]) {
        updated[categoryId] = [];
      }
      updated[categoryId].push(student);
      return updated;
    });
  };
  const transformedRecipients = Object.entries(courseWiseStudents).map(
    ([categoryId, students]) => ({
      role: categoryId,
      profiles: students.map((student) => student._id),
    })
  );

  const handleRemoveStudent = (categoryId, studentId) => {
    setCourseWiseStudents((prev) => {
      const updated = { ...prev };
      updated[categoryId] = updated[categoryId].filter(
        (s) => s._id !== studentId
      );
      if (updated[categoryId].length === 0) {
        delete updated[categoryId];
      }
      return updated;
    });
  };

  //-------------------------------------------------------- Receipents Funcation End Here--------------------------------------------------------//

  //-------------------------------------------------------- Certificate Signature Funcation Start Here--------------------------------------------------------//
  const [selectedCategoryForSignature, setSelectedCategoryForSignature] =
    useState("");
  const [selectedProfilesForSignature, setSelectedProfilesForSignature] =
    useState([]); // [ObjectId strings]

  const handleCategoryChange = (event) => {
    setSelectedCategoryForSignature(event.target.value);
  };
  console.log(
    "When Create",
    selectedCategoryForSignature,
    selectedProfilesForSignature
  );
  console.log(
    "When CallFrom Backedn",
    selectedCategoryForSignature,
    selectedProfilesForSignature
  );

  const roleOptions = Object.keys(courseWiseStudents).map((categoryId) => {
    const matchedCourse = courses.find(
      (course) => String(course._id) === String(categoryId)
    );
    return {
      id: categoryId,
      title: matchedCourse ? matchedCourse.courseName : "Unknown Course",
    };
  });

  const selectedStudents =
    courseWiseStudents[selectedCategoryForSignature] || [];
  const selectedCourse = roleOptions.find(
    (opt) => opt.id === selectedCategoryForSignature
  );

  const toggleProfile = (studentId) => {
    setSelectedProfilesForSignature((prev) => {
      if (prev.includes(studentId)) {
        // Deselect: remove the ID
        return prev.filter((id) => id !== studentId);
      } else {
        // Select: add the ID
        return [...prev, studentId];
      }
    });
  };

  //-------------------------------------------------------- Certificate Signature Funcation End Here--------------------------------------------------------//

  //-------------------------------------------------------- Handle Submit function start Here--------------------------------------------------------//

  const handleSubmit = async () => {
    let toastId;
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

        const res = courseId
          ? await axios.put(`/courses/${courseId}`, payload)
          : await axios.post(`/courses`, payload);

        if (!courseId) {
          setCourseId(res.data._id);
        }
      } else if (currentTab === 1 && courseId) {
        const formData = new FormData();
        formData.append("category", selectedCourses?._id);
        formData.append("title", title);
        formData.append("details", details);

        if (coverPhoto) {
          formData.append("coverPhoto", coverPhoto);
        }

        // Show loader toast
        toastId = toast.loading("Uploading cover image...");

        await axios.put(`/courses/${courseId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.dismiss(toastId);
        toast.success("Cover image uploaded successfully!");
      } else if (currentTab === 2 && courseId) {
        const payload = {
          category: selectedCourses?._id,
          title,
          requiresPrerequisite,
          postGradRequired,
          yearFrom,
          yearTo,
          restrictReenrollment,
          selectedPrerequisiteCourses,
        };

        await axios.put(`/courses/${courseId}`, payload);
      } else if (currentTab === 3 && courseId) {
        const payload = {
          category: selectedCourses?._id,
          title,
          studentCap,
          waitlistCap,
          registrationStartDate,
          registrationEndDate,
          paymentReceiveStartDate,
          paymentReceiveEndDate,
        };

        await axios.put(`/courses/${courseId}`, payload);
      } else if (currentTab === 4 && courseId) {
        const payload = {
          category: selectedCourses?._id,
          title,
          recipients: transformedRecipients,
        };

        await axios.put(`/courses/${courseId}`, payload);
      } else if (currentTab === 5 && courseId) {
        const payload = {
          category: selectedCourses?._id,
          title,
          signatures: selectedProfilesForSignature,
          status: "complete", // <- Set status to complete
        };

        await axios.put(`/courses/${courseId}`, payload);

        toast.success("Course event created successfully!");
        navigate("/courses_events_list"); // <- Redirect after success
        return true;
      }

      if (currentTab !== 1 && currentTab !== 5) {
        toast.success("Saved!");
      }

      return true;
    } catch (err) {
      if (toastId) toast.dismiss(toastId); // dismiss upload toast if shown
      console.error(err);
      toast.error("Something went wrong!");
      return false;
    }
  };

  //-------------------------------------------------------- Handle Submit function end Here--------------------------------------------------------//

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCourse = async () => {
        try {
          const { data } = await axios.get(`/courses_events/${id}`);
          setCourseData(data);
        } catch (err) {
          console.error("Failed to fetch course:", err);
          toast.error("Failed to load course data.");
        }
      };

      fetchCourse();
    }
  }, [id]);

  useEffect(() => {
    if (courseData) {
      setCourseId(courseData._id || "");
      if (courses.length > 0 && courseData.category) {
        const matchedCategory = courses.find(
          (c) => String(c._id) === String(courseData.category)
        );
        setSelectedCourses(matchedCategory || null);
      } else {
        setSelectedCourses(null);
      }

      // Set basic course info
      setTitle(courseData.title || "");
      setLocation(courseData.location || "");
      setFees(courseData.fee || "");
      setStartDate(courseData.startDate || null);
      setEndDate(courseData.endDate || null);
      setContactPersons(
        courseData.contactPersons?.length
          ? courseData.contactPersons
          : [{ name: "", email: "" }]
      );
      // Set Details & Cover info

      setDetails(courseData.details || "");
      setCoverPhoto(courseData.coverPhoto || "");

      // Set prerequisites
      if (courseData.prerequisites) {
        const prerequisites = courseData?.prerequisites;
        setPostGradRequired(prerequisites?.postGraduationRequired ?? false);
        setYearFrom(prerequisites?.postGraduationYearRange?.start ?? "");
        setYearTo(prerequisites?.postGraduationYearRange?.end ?? "");
        setRequiresPrerequisite(prerequisites?.mustHave ?? "no");
        setSelectedPrerequisiteCourses(
          prerequisites.requiredCourseCategory || []
        );
        setRestrictReenrollment(prerequisites.restrictReenrollment ?? true);
      }

      // Set Enrollment
      setStudentCap(courseData.studentCap || "");
      setWaitlistCap(courseData.waitlistCap || "");
      setRegistrationStartDate(courseData.registrationStartDate || null);
      setRegistrationEndDate(courseData.registrationEndDate || null);
      setPaymentReceiveStartDate(courseData.paymentReceiveStartDate || null);
      setPaymentReceiveEndDate(courseData.paymentReceiveEndDate || null);

      const loadRecipients = async () => {
        if (!courseData?.recipients || courseData.recipients.length === 0)
          return;

        try {
          setLoading(true);

          // Fetch all verified student profiles
          const { data: allProfiles } = await axios.get("/verified-accounts");

          // Group profiles by role (category) based on courseData.recipients
          const groupedByRole = {};
          courseData.recipients.forEach(({ role, profiles }) => {
            groupedByRole[role] = allProfiles.filter((profile) =>
              profiles.includes(profile._id)
            );
          });

          setCourseWiseStudents(groupedByRole);

          // Load saved signature info if any
          if (courseData?.signatures?.length) {
            const signatureIds = courseData.signatures.map((id) => String(id));

            // Flatten all student profiles into a single array
            const allStudents = Object.values(groupedByRole).flat();

            // Filter students whose IDs are in the signatureIds array
            const matchedStudents = allStudents.filter((student) =>
              signatureIds.includes(String(student._id))
            );

            if (matchedStudents.length > 0) {
              setSelectedProfilesForSignature(
                matchedStudents.map((s) => s._id)
              );
            } else {
              console.warn(
                "No matching student profiles found for signatures."
              );
            }
          }
        } catch (err) {
          console.error("Error loading recipients:", err);
          toast.error("Failed to load student recipients.");
        } finally {
          setLoading(false);
        }
      };

      loadRecipients();
    }
  }, [courseData, courses]);

  console.log("SIGNATURES from DB:", courseData?.signatures);

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
          coverPhoto={coverPhoto}
          photoUploadError={photoUploadError}
          handleCoverPhoto={handleCoverPhoto}
          removeImage={removeImage}
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
          paymentReceiveStartDate={paymentReceiveStartDate}
          paymentReceiveStartDateError={paymentReceiveStartDateError}
          handlePaymentReceiveStartDateChange={
            handlePaymentReceiveStartDateChange
          }
          paymentReceiveEndDate={paymentReceiveEndDate}
          paymentReceiveEndDateError={paymentReceiveEndDateError}
          handlePaymentReceiveEndDateChange={handlePaymentReceiveEndDateChange}
          studentCap={studentCap}
          setStudentCap={setStudentCap}
          waitlistCap={waitlistCap}
          setWaitlistCap={setWaitlistCap}
        />
      ),
    },
    {
      label: "Recipients",
      content: (
        <Recipients
          courses={courses}
          loading={loading}
          selectedCategoryForRecipients={selectedCategoryForRecipients}
          setSelectedCategoryForRecipients={setSelectedCategoryForRecipients}
          searchForProfile={searchForProfile}
          setSearchForProfile={setSearchForProfile}
          handleApplyFilters={handleApplyFilters}
          studentProfiles={studentProfiles}
          isStudentAlreadyAdded={isStudentAlreadyAdded}
          courseWiseStudents={courseWiseStudents}
          handleRemoveStudent={handleRemoveStudent}
          handleAddStudent={handleAddStudent}
        />
      ),
    },
    {
      label: "Certificate Setup",
      content: (
        <CertificateDesign
          courseWiseStudents={courseWiseStudents}
          courses={courses}
          selectedCategoryForSignature={selectedCategoryForSignature}
          handleCategoryChange={handleCategoryChange}
          roleOptions={roleOptions}
          selectedCourse={selectedCourse}
          selectedStudents={selectedStudents}
          selectedProfilesForSignature={selectedProfilesForSignature}
          toggleProfile={toggleProfile}
        />
      ),
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
