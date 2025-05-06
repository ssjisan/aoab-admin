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
import AddLink from "../Page/Links/AddLink";
import LinksList from "../Page/Links/LinksList";
import UpdateLink from "../Page/Links/UpdateLink";
import AddForm from "../Page/Forms/AddForm";
import FormsList from "../Page/Forms/FormsList";
import UpdateForm from "../Page/Forms/UpdateForm";
import AlbumList from "../Page/Albums/AlbumList";
import UpdateAlbum from "../Page/Albums/UpdateAlbum";
import UploadAlbum from "../Page/Albums/UploadAlbum";
import StudentsList from "../Page/Students/StudentsList";
import StudentsApproval from "../Page/Students/StudentsApproval";
import EmailVerificationError from "../Page/Students/EmailVerificationError";
import CourseSetup from "../Page/Courses&Events/CourseSetup";

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

          {/* Courses & Events Routes Start */}
          <Route path="/course_setup" element={<CourseSetup />} />
          <Route path="/add_courses_events" element={<AddCoursesEvents />} />
          <Route path="/courses_events_list" element={<CoursesEventsList />} />
          <Route path="/course_event/:id" element={<PreviewCourseEvent />} />
          <Route path="/courses_events/:id" element={<UpdateCoursesEvents />} />
          {/* Courses & Events Routes End */}

          {/* Online Learning Start */}
          <Route path="/add_online_learning" element={<AddOnlineLearning />} />
          <Route path="/online_learning_list" element={<ResourcesList />} />
          <Route path="resource/:resourceId" element={<UpdateResource />} />

          {/* Online Learning End */}

          {/* Links Start */}
          <Route path="/add_links" element={<AddLink />} />
          <Route path="/links_list" element={<LinksList />} />
          <Route path="link/:linkId" element={<UpdateLink />} />
          {/* Links End */}

          {/* Forms Start */}
          <Route path="/add_forms" element={<AddForm />} />
          <Route path="/forms_list" element={<FormsList />} />
          <Route path="/form/:formId" element={<UpdateForm />} />
          {/* Forms End */}

          {/* Videos Routes Start */}
          <Route path="/upload_video" element={<UploadVideo />} />
          <Route path="/video_list" element={<VideoList />} />
          <Route path="/video/:slug" element={<UpdateVideo />} />
          {/* Videos Routes End */}

          {/* User Routes Start */}
          <Route path="/create_use" element={<AddUser />} />
          <Route path="change_password" element={<ChangePassword />} />
          <Route path="user_list" element={<UserList />} />
          {/* User Routes End */}

          {/* Students Info Routes Start */}
          <Route path="/student_approval" element={<StudentsApproval />} />
          <Route path="/student_list" element={<StudentsList />} />
          <Route path="/email_verification_error" element={<EmailVerificationError />} />
          {/* User Routes End */}

          

          {/* Album Routes Start */}
          <Route path="add_album" element={<UploadAlbum />} />
          <Route path="album_list" element={<AlbumList />} />
          <Route path="album/:albumId" element={<UpdateAlbum />} />

          {/* <Route path="album_list" element={<AlbumList />} />
          <Route path="album/:albumId" element={<UpdateAlbum />} /> */}
          {/* Album Routes End */}
        </Route>
        {/* <Route path="*" element={<ErrorPage />} replace /> */}
      </Routes>
    </>
  );
}
