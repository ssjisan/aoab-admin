import PropTypes from "prop-types";
import { TableBody, TableCell, TableRow } from "@mui/material";

export default function Body({ profile }) {
  const courses = [
    {
      name: "aoBasicCourse",
      label: "AO Basic Course",
      question: "Did you complete AO Basic Course?",
    },
    {
      name: "aoAdvanceCourse",
      label: "AO Advanced Course",
      question: "Did you complete AO Advanced Course?",
    },
    {
      name: "aoMastersCourse",
      label: "AO Masters Course",
      question: "Have you completed AO Masters Course?",
    },
    {
      name: "aoaPediatricSeminar",
      label: "AOA Pediatric Seminar",
      question: "Have you completed AOA Pediatric Seminar?",
    },
    {
      name: "aoaPelvicSeminar",
      label: "AOA Pelvic Seminar",
      question: "Have you completed AOA Pelvic Seminar?",
    },
    {
      name: "aoaFootAnkleSeminar",
      label: "AOA Foot & Ankle Seminar",
      question: "Have you completed AOA Foot & Ankle Seminar?",
    },
    {
      name: "aoPeer",
      label: "AO Peer",
      question: "Have you completed AO Peer Seminar?",
    },
    {
      name: "aoaOtherCourses",
      label: "AOA Other Courses",
      question:
        "Have you completed any other AOA Course (e.g., Non-Operative, Hybrid, etc.)?",
    },
    {
      name: "aoaFellowship",
      label: "AOA Fellowship",
      question: "Have you completed any AOA Fellowship?",
    },
    {
      name: "tableFaculty",
      label: "Table Faculty",
      question: "Have you worked as Table Faculty yet?",
    },
    {
      name: "nationalFaculty",
      label: "National Faculty",
      question: "Have you joined as National Faculty yet?",
    },
    {
      name: "regionalFaculty",
      label: "Regional Faculty",
      question: "Have you joined as Regional Faculty yet?",
    },
  ];

  if (!profile) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={5}
            sx={{ border: "1px solid #ddd", textAlign: "center" }}
          >
            Loading...
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {courses.map((course) => {
        const courseData = profile[course.name] || {};
        const courseStatus =
          courseData.status === null
            ? "N/A"
            : courseData.status === "yes"
            ? "Yes"
            : "No";

        const hasDocument =
          courseData.documents && courseData.documents.length > 0;
        const completionYear = courseData.completionYear || "N/A";
        return (
          <TableRow key={course.name}>
            <TableCell sx={{ border: "1px solid #ddd", p: "8px 16px" }}>
              {course.label}
            </TableCell>
            <TableCell
              sx={{ border: "1px solid #ddd", p: "8px 16px", width: "64px" }}
            >
              {courseStatus}
            </TableCell>
            <TableCell
              sx={{ border: "1px solid #ddd", p: "8px 16px", width: "64px" }}
            >
              {completionYear}
            </TableCell>
            <TableCell sx={{ border: "1px solid #ddd", p: "8px 16px" }}>
              {hasDocument ? (
                courseData.documents.length === 1 ? (
                  <a
                    href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                      courseData.documents[0].url
                    )}&embedded=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {courseData.documents[0].name}
                  </a>
                ) : (
                  <ol style={{ margin: 0, paddingLeft: "16px" }}>
                    {courseData.documents.map((doc) => (
                      <li key={doc.url} style={{ marginBottom: "8px" }}>
                        <a
                          href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                            doc.url
                          )}&embedded=true`}
                          target="_blank"
                          rel="noopener noreferrer"
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
    aoBasicCourse: PropTypes.shape({
      status: PropTypes.string,
      documents: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ),
    }),
    aoAdvanceCourse: PropTypes.shape({
      status: PropTypes.string,
      documents: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ),
    }),
    aoMastersCourse: PropTypes.shape({
      status: PropTypes.string,
      documents: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ),
    }),
    aoaPediatricSeminar: PropTypes.shape({
      status: PropTypes.string,
      documents: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ),
    }),
    aoaPelvicSeminar: PropTypes.shape({
      status: PropTypes.string,
      documents: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ),
    }),
    aoaFootAnkleSeminar: PropTypes.shape({
      status: PropTypes.string,
      documents: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ),
    }),
    aoaOtherCourses: PropTypes.shape({
      status: PropTypes.string,
      documents: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ),
    }),
    aoaFellowship: PropTypes.shape({
      status: PropTypes.string,
      documents: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ),
    }),
    tableFaculty: PropTypes.shape({
      status: PropTypes.string,
      documents: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ),
    }),
    nationalFaculty: PropTypes.shape({
      status: PropTypes.string,
      documents: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ),
    }),
  }),
};
