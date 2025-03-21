import { DataContext } from "../../DataProcessing/DataProcessing";
import { useContext } from "react";
import {
  AddAlbum,
  CoursesEvents,
  Dashboard,
  Form,
  Link,
  OnlineLearning,
  Students,
  Users,
  Video,
} from "../../assets/IconSet";

const navConfig = ({ pathname }) => {
  const { auth } = useContext(DataContext);
  const role = auth?.user?.role;

  // Configuration for role 0 and 1 (Full Access)
  const commonItems = [
    {
      title: "Overview",
      icon: (
        <Dashboard color={pathname === "/" ? "#00AE60" : "#637381"} size={20} />
      ),
      items: [
        {
          title: "Dashboard",
          link: "/",
        },
      ],
    },
    {
      title: "Courses and Events",
      icon: (
        <CoursesEvents
          color={
            pathname.startsWith("/add_courses_events") ||
            pathname.startsWith("/courses_events_list")
              ? "#00AE60"
              : "#637381"
          }
          size={20}
        />
      ),
      items: [
        {
          title: "Add Courses and Events",
          link: "/add_courses_events",
        },
        {
          title: "Courses and Events List",
          link: "/courses_events_list",
        },
      ],
    },
    {
      title: "Album",
      icon: (
        <AddAlbum
          color={
            pathname.startsWith("/add_album") ||
            pathname.startsWith("/album_list")
              ? "#00AE60"
              : "#637381"
          }
          size={20}
        />
      ),
      items: [
        {
          title: "Add Album",
          link: "/add_album",
        },
        {
          title: "Album List",
          link: "/album_list",
        },
      ],
    },
    {
      title: "Online Learning",
      icon: (
        <OnlineLearning
          color={
            pathname.startsWith("/add_online_learning") ||
            pathname.startsWith("/online_learning_list")
              ? "#00AE60"
              : "#637381"
          }
          size={20}
        />
      ),
      items: [
        {
          title: "Add Online Learning",
          link: "/add_online_learning",
        },
        {
          title: "Online Learning List",
          link: "/online_learning_list",
        },
      ],
    },
    {
      title: "Links",
      icon: (
        <Link
          color={
            pathname.startsWith("/add_links") ||
            pathname.startsWith("/links_list")
              ? "#00AE60"
              : "#637381"
          }
          size={20}
        />
      ),
      items: [
        {
          title: "Add Link",
          link: "/add_links",
        },
        {
          title: "All Links",
          link: "/links_list",
        },
      ],
    },
    {
      title: "Forms",
      icon: (
        <Form
          color={
            pathname.startsWith("/add_forms") ||
            pathname.startsWith("/forms_list")
              ? "#00AE60"
              : "#637381"
          }
          size={20}
        />
      ),
      items: [
        {
          title: "Add Form",
          link: "/add_forms",
        },
        {
          title: "All Forms",
          link: "/forms_list",
        },
      ],
    },
    {
      title: "Video",
      icon: (
        <Video
          color={
            pathname.startsWith("/upload_video") ||
            pathname.startsWith("/video_list")
              ? "#00AE60"
              : "#637381"
          }
          size={20}
        />
      ),
      items: [
        {
          title: "Add Video",
          link: "/upload_video",
        },
        {
          title: "Video List",
          link: "/video_list",
        },
      ],
    },
    {
      title: "User",
      icon: (
        <Users
          color={
            pathname.startsWith("/create_user") ||
            pathname.startsWith("/user_list")
              ? "#00AE60"
              : "#637381"
          }
          size={20}
        />
      ),
      items: [
        {
          title: "Create User",
          link: "/create_use",
        },
        {
          title: "User List",
          link: "/user_list",
        },
      ],
    },
  ];

  // Only show Students for role 2
  const studentsForRole2 = [
    {
      title: "Students",
      icon: (
        <Students
          color={
            pathname.startsWith("/student_approval") ||
            pathname.startsWith("/student_list")
              ? "#00AE60"
              : "#637381"
          }
          size={20}
        />
      ),
      items: [
        {
          title: "Student Approval",
          link: "/student_approval",
        },
        {
          title: "Student List",
          link: "/student_list",
        },
      ],
    },
  ];

  // If role is 2, only show Dashboard and Students
  if (role === 2) {
    return [
      commonItems[0], // Dashboard
      studentsForRole2[0], // Students
    ];
  }

  // If role is 0 or 1, show all the menus
  return [...commonItems, ...studentsForRole2];
};

export default navConfig;
