import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Page/Dashboard";
import { Toaster } from "react-hot-toast";
import Login from "../UserAuth/Login";
import AddUser from "../Page/User/AddUser";
import ChangePassword from "../Page/User/ChangePassword";
import UserList from "../Page/User/UserList";
import AddOnlineLearning from "../Page/OnlineLearning/AddOnlineLearning";
import ResourcesList from "../Page/OnlineLearning/ResourcesList";
import UpdateResource from "../Page/OnlineLearning/UpdateResource";
import UploadVideo from "../Page/Videos/UploadVideo";
import VideoList from "../Page/Videos/VideoList";
import UpdateVideo from "../Page/Videos/UpdateVideo";
import AddCoursesEvents from "../Page/Courses&Events/AddCoursesEvents";
import CoursesEventsList from "../Page/Courses&Events/CoursesEventsList";
import PreviewCourseEvent from "../Page/Courses&Events/PreviewCourseEvent";
import UpdateCoursesEvents from "../Page/Courses&Events/UpdateCoursesEvents";

export default function MainRouters() {
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#59B259",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#59B259",
            },
          },
          error: {
            style: {
              background: "#EC4034",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#EC4034",
            },
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />

          {/* Online Learning Start */}
          <Route path="/add_online_learning" element={<AddOnlineLearning />} />
          <Route path="/online_learning_list" element={<ResourcesList />} />
          <Route path="resource/:resourceId" element={<UpdateResource />} />

          {/* Online Learning End */}

          {/* Videos Routes Start */}
          <Route path="/upload_video" element={<UploadVideo />} />
          <Route path="/video_list" element={<VideoList />} />
          <Route path="/video/:slug" element={<UpdateVideo />} />
          {/* Videos Routes End */}

          {/* Courses & Events Routes Start */}
          <Route path="/add_courses_events" element={<AddCoursesEvents />} />
          <Route path="/courses_events_list" element={<CoursesEventsList />} />
          <Route path="/course_event/:id" element={<PreviewCourseEvent />} />
          <Route path="/courses_events/:id" element={<UpdateCoursesEvents />} />
          {/* Courses & Events Routes End */}

          {/* User Routes Start */}
          <Route path="/create_use" element={<AddUser />} />
          <Route path="change_password" element={<ChangePassword />} />
          <Route path="user_list" element={<UserList />} />
          {/* User Routes End */}
        </Route>
        {/* <Route path="*" element={<ErrorPage />} replace /> */}
      </Routes>
    </>
  );
}
