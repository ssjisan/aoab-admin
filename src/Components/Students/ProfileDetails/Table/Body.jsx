import PropTypes from "prop-types";
import { TableBody, TableCell, TableRow, Box } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Body({ profile }) {
  const [courses, setCourses] = useState([]);

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

  if (!profile || !courses.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={5} sx={{ textAlign: "center" }}>
            Loading...
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {courses.map((course) => {
        // ✅ FIXED: safe ObjectId comparison
        const courseData =
          profile?.courses?.find(
            (c) => String(c.courseCategoryId) === String(course._id),
          ) || null;

        // ✅ FIXED: boolean status (NEW schema style)
        const courseStatus = courseData?.status ? "Yes" : "No";

        const completionYear = courseData?.completionYear || "-";

        const documents = courseData?.documents || [];
        const hasDocument = documents.length > 0;

        return (
          <TableRow key={course._id}>
            {/* Course Name */}
            <TableCell sx={{ border: "1px solid #ddd" }}>
              {course.courseName}
            </TableCell>

            {/* Status (NEW STYLE BADGE LIKE NEW TABLE) */}
            <TableCell sx={{ border: "1px solid #ddd" }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  backgroundColor: courseData?.status ? "#E8F5E9" : "#FDECEC",
                  color: courseData?.status ? "#2E7D32" : "#D32F2F",
                }}
              >
                {courseStatus}
              </Box>
            </TableCell>

            {/* Year */}
            <TableCell sx={{ border: "1px solid #ddd" }}>
              {completionYear}
            </TableCell>

            {/* Documents */}
            <TableCell sx={{ border: "1px solid #ddd" }}>
              {hasDocument ? (
                documents.length === 1 ? (
                  <a
                    href={documents[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#1E88E5",
                      textDecoration: "underline",
                    }}
                  >
                    {documents[0].name}
                  </a>
                ) : (
                  <ol style={{ margin: 0, paddingLeft: "16px" }}>
                    {documents.map((doc) => (
                      <li key={doc.url}>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#1E88E5",
                            textDecoration: "underline",
                          }}
                        >
                          {doc.name}
                        </a>
                      </li>
                    ))}
                  </ol>
                )
              ) : (
                "No Document"
              )}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}

Body.propTypes = {
  profile: PropTypes.shape({
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        courseCategoryId: PropTypes.string,
        status: PropTypes.bool,
        documents: PropTypes.array,
        completionYear: PropTypes.string,
      }),
    ),
  }),
};
