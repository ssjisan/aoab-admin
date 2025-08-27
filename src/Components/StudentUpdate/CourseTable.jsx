import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { ArrowDown } from "../../assets/IconSet";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CourseUpdate from "./CourseUpdate";

export default function CourseTable({ courses = [], onEditCourse, studentId }) {
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const fetchCourseCategories = async () => {
      try {
        const response = await axios.get("/category_list");
        setCourseCategories(response.data);
      } catch (error) {
        toast.error("Error fetching course categories");
        console.error(error);
      }
    };

    fetchCourseCategories();
  }, []);
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <Box sx={{ margin: "24px 16px" }}>
      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ArrowDown size={"24px"} color="#000" />}>
          <Typography variant="subtitle1" fontWeight="bold">
            Courses Info
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {!courseCategories.length ? (
            <Typography>Loading...</Typography>
          ) : (
            <TableContainer sx={{ m: "16px 0" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Course Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Status</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Completion Year</strong>
                    </TableCell>
                    <TableCell>
                      <strong>System Upload</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Documents</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Action</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courseCategories.map((category) => {
                    const courseData =
                      courses.find(
                        (c) =>
                          String(c.courseCategoryId) === String(category._id)
                      ) || {};

                    const courseStatus =
                      courseData.status != null ? courseData.status : "N/A";

                    const completionYear = courseData.completionYear || "N/A";
                    const systemUpload =
                      courseData.systemUpload != null
                        ? courseData.systemUpload
                          ? "Yes"
                          : "No"
                        : "N/A";

                    const hasDocuments =
                      courseData.documents && courseData.documents.length > 0;

                    return (
                      <TableRow key={category._id} hover>
                        <TableCell>{category.courseName}</TableCell>
                        <TableCell>{courseStatus}</TableCell>
                        <TableCell>{completionYear}</TableCell>
                        <TableCell>{systemUpload}</TableCell>
                        <TableCell>
                          {hasDocuments ? (
                            courseData.documents.length === 1 ? (
                              (() => {
                                const doc = courseData.documents[0];
                                const isPdf =
                                  doc.name?.toLowerCase().endsWith(".pdf") &&
                                  doc.size > 0;
                                const previewUrl = isPdf
                                  ? `https://docs.google.com/viewer?url=${encodeURIComponent(
                                      doc.url
                                    )}&embedded=true`
                                  : doc.url;
                                return (
                                  <a
                                    href={previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {doc.name}
                                  </a>
                                );
                              })()
                            ) : (
                              <ol style={{ margin: 0, paddingLeft: "16px" }}>
                                {courseData.documents.map((doc) => {
                                  const isPdf =
                                    doc.name?.toLowerCase().endsWith(".pdf") &&
                                    doc.size > 0;
                                  const previewUrl = isPdf
                                    ? `https://docs.google.com/viewer?url=${encodeURIComponent(
                                        doc.url
                                      )}&embedded=true`
                                    : doc.url;
                                  return (
                                    <li key={doc.url}>
                                      <a
                                        href={previewUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {doc.name}
                                      </a>
                                    </li>
                                  );
                                })}
                              </ol>
                            )
                          ) : (
                            "No Document"
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              setSelectedCourse({
                                ...courseData,
                                categoryName: category.courseName,
                                categoryId: category._id, // <-- important for creating new course
                                studentId: studentId,
                              })
                            }
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </AccordionDetails>
      </Accordion>
      <CourseUpdate
        open={!!selectedCourse} // true if a course is selected
        onClose={() => setSelectedCourse(null)} // reset to close
        courseData={selectedCourse}
      />
    </Box>
  );
}
