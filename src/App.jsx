import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProfile from "./pages/admin/AdminProfile";
import ManageTeachers from "./pages/admin/ManageTeacers";
import ManageStudents from "./pages/admin/ManageStudents";
import Courses from "./pages/admin/Courses";
import AddStudents from "./pages/admin/AddStudents";
import AddTeachers from "./pages/admin/AddTeachers";
import AdminHome from "./pages/admin/AdminHome";
import StudentHome from "./pages/student/StudentHome";
import StudentProfile from "./pages/student/StudentProfile";
import TeacherHome from "./pages/teacher/TeacherHome";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import TeacherLogin from "./pages/teacher/TeacherLogin";
import StudentLogin from "./pages/student/StudentLogin";
import PrivateAdminRoute from "./components/admin/PrivateAdminRoute";
import PrivateStudentRoute from "./components/student/PrivateStudentRoute";
import PrivateTeacherRoute from "./components/teacher/PrivateTeacherRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="admin/login" element={<AdminLogin />} />
        <Route element={<PrivateAdminRoute />}>
          <Route path="admin/home" element={<AdminHome />} />
          <Route path="admin/profile" element={<AdminProfile />} />
          <Route path="admin/manage-teachers" element={<ManageTeachers />} />
          <Route path="admin/add-teachers" element={<AddTeachers />} />
          <Route path="admin/manage-students" element={<ManageStudents />} />
          <Route path="admin/add-students" element={<AddStudents />} />
          <Route path="admin/courses" element={<Courses />} />
        </Route>
        {/* Student Routes */}
        <Route path="student/login" element={<StudentLogin />} />
        <Route element={<PrivateStudentRoute />}>
          <Route path="student/home" element={<StudentHome />} />
          <Route path="student/profile" element={<StudentProfile />} />
        </Route>
        {/* teacher Routes */}
        <Route path="teacher/login" element={<TeacherLogin />} />
        <Route element={<PrivateTeacherRoute />}>
          <Route path="teacher/home" element={<TeacherHome />} />
          <Route path="teacher/profile" element={<TeacherProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
