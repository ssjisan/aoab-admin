import { Button, Stack, useMediaQuery } from "@mui/material";
import BasicInformation from "./BasicInformation";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseEventDetails from "./CourseEventDetails";
import CourseEventCover from "./CourseEventCover";
import dayjs from "dayjs";

export default function UpdateForm() {
  const forBelow1200 = useMediaQuery("(max-width:1200px)");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("");
  const [fees, setFees] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactMail, setContactMail] = useState("");
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [details, setDetails] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams(); // for getting id from url

  //  Get data from database using api

  // Fetch the existing course/event data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/courses_events/${id}`);
        if (data) {
          setTitle(data.title);
          setLocation(data.location);
          setLanguage(data.language);
          setFees(data.fees);
          setContactPerson(data.contactPerson);
          setContactMail(data.contactEmail);
          setStartDate(data.startDate ? dayjs(data.startDate) : null);
          setEndDate(data.endDate ? dayjs(data.endDate) : null);
          setDetails(data.details);
          if (data.coverPhoto && data.coverPhoto.length > 0) {
            setCoverPhoto(data.coverPhoto[0].url); // Load image URL from DB
          }
        }
      } catch (err) {
        console.error("Error fetching course/event data:", err);
        toast.error("Failed to load course/event data.");
      }
    };

    fetchData();
  }, [id]);


  // Date for Events From Basic Info Handler Start Here

  const handleStartDateChange = (newDate) => {
    // Format the date for storage (ISO 8601 format)
    const formattedDate = dayjs(newDate).toISOString();

    if (newDate && newDate.isBefore(dayjs(), "day")) {
      setStartDateError("Start date cannot be in the past!");
    } else {
      setStartDateError("");
      setStartDate(formattedDate); // Store the formatted date
    }
  };

  const handleEndDateChange = (newDate) => {
    // Format the date for storage (ISO 8601 format)
    const formattedDate = dayjs(newDate).toISOString();

    if (newDate && newDate.isBefore(dayjs(), "day")) {
      setEndDateError("End date cannot be in the past!");
    } else if (newDate && newDate.isBefore(startDate, "day")) {
      setEndDateError("End date cannot be earlier than start date!");
    } else {
      setEndDateError("");
      setEndDate(formattedDate); // Store the formatted date
    }
  };

  // Upload Cover Image Handler Starts Here

  const handleCoverPhoto = (event) => {
    const file = event.target.files[0];
    const MAX_SIZE_MB = 3; // Maximum file size in MB
  
    if (file) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2); // Convert bytes to MB
      if (fileSizeMB > MAX_SIZE_MB) {
        setError({
          fileName: file.name,
          fileSize: fileSizeMB,
          message: "File is larger than 3MB.",
        });
        return;
      }
  
      setError(null); // Clear any previous errors
  
      // Create a preview URL for the uploaded image
      const filePreview = URL.createObjectURL(file);
      setCoverPhoto(filePreview); // Temporarily show the image preview
      setCoverPhoto(file); // Store the file for uploading
    }
  };

  const removeImage = () => {
    setCoverPhoto(null);
  };

  // Upload Event Details Handler Starts Here

  const handleQuillChange = (content) => {
    setDetails(content);
  };

  const handleSubmit = async () => {
    console.log("Submit button clicked"); // Debug log

    if (
      !title.trim() ||
      !location.trim() ||
      !language.trim() ||
      !fees.toString().trim() ||
      !contactPerson.trim() ||
      !contactMail.trim() ||
      !startDate ||
      !endDate ||
      !details.trim()
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }
  
    setIsSubmitting(true); // Disable form interactions during submission
    const toastId = toast.loading("Updating..."); // Show a loading toast
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("language", language);
    formData.append("fees", fees);
    formData.append("contactPerson", contactPerson);
    formData.append("contactEmail", contactMail);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("details", details);
    if (coverPhoto instanceof File) {
      // Append the cover photo only if it is a new file
      formData.append("coverPhoto", coverPhoto);
    }
  
    try {
      const { data } = await axios.put(`/courses_events/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (data?.error) {
        toast.dismiss(toastId); // Dismiss the loading toast
        toast.error(data.error);
      } else {
        toast.dismiss(toastId); // Dismiss the loading toast
        toast.success("Event updated successfully!");
        navigate("/courses_events_list"); // Navigate to the events list page
      }
    } catch (error) {
      toast.dismiss(toastId); // Dismiss the loading toast
      toast.error("Event update failed, please check all fields.");
    } finally {
      setIsSubmitting(false); // Re-enable form interactions
    }
  };  
  

  return (
    <>
      <Stack gap="40px">
        <BasicInformation
          title={title}
          setTitle={setTitle}
          startDateError={startDateError}
          handleEndDateChange={handleEndDateChange}
          handleStartDateChange={handleStartDateChange}
          endDateError={endDateError}
          endDate={endDate}
          startDate={startDate}
          location={location}
          setLocation={setLocation}
          language={language}
          fees={fees}
          setFees={setFees}
          setLanguage={setLanguage}
          contactPerson={contactPerson}
          setContactPerson={setContactPerson}
          contactMail={contactMail}
          setContactMail={setContactMail}
        />
        <CourseEventDetails
          details={details}
          setDetails={setDetails}
          handleQuillChange={handleQuillChange}
        />
        <CourseEventCover
          coverPhoto={coverPhoto}
          handleCoverPhoto={handleCoverPhoto}
          removeImage={removeImage}
          error={error}
        />
      </Stack>
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
          onClick={() => window.history.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </Stack>
    </>
  );
}
