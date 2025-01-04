import {
  Dashboard,
  Doctor,
  OnlineLearning,
  Users,
  Video,
} from "../../assets/IconSet";

const navConfig = ({ pathname }) => [
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
    title: "Courses and Events",
    icon: (
      <Doctor
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

export default navConfig;
