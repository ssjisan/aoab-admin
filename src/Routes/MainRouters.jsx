import { Route, Routes, useLocation } from "react-router-dom";
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
import CategorySetup from "../Page/Courses&Events/CategorySetup";
import EnrollmentHistory from "../Page/Courses&Events/EnrollmentHistory";
import ConfirmList from "../Page/Courses&Events/ConfirmList";
import FinalList from "../Page/Courses&Events/FinalList";

export default function MainRouters() {
  function RoutedAddCoursesEvents() {
  const location = useLocation();
  return <AddCoursesEvents key={location.pathname} />;
}
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
          
          <Route path="/setup_category" element={<CategorySetup />} />
          <Route path="/add_courses_events" element={<RoutedAddCoursesEvents />} />
          <Route path="/course/:id" element={<RoutedAddCoursesEvents />} />
          <Route path="/courses_events_list" element={<CoursesEventsList />} />
          <Route path="/course_event/:id" element={<PreviewCourseEvent />} />
          <Route path="/enrollment-history/:courseId" element={<EnrollmentHistory />} />
          <Route path="/confirm/:courseId" element={<ConfirmList />} />
          <Route path="/final-list/:courseId" element={<FinalList />} />
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
