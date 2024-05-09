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
import ManageBatches from "./pages/admin/ManageBatches";
import AdminAnounce from "./pages/admin/AdminAnounce";
import StudentAnnouncement from "./pages/student/StudentAnnouncement";
import TeacherAnnouncement from "./pages/teacher/TeacherAnnouncement";
import TeacherBatch from "./pages/teacher/TeacherBatch";
import TeacherAttendence from "./pages/teacher/TeacherAttendence";
import StudentApplyLeave from "./pages/student/StudentApplyLeave";
import TeacherApplyLeave from "./pages/teacher/TeacherApplyLeave";
import Leaves from "./pages/admin/Leaves";
import TeachersBatchLeaves from "./pages/teacher/TeachersBatchLeaves";
// import BatchChatTeacher from "./pages/teacher/BatchChat";
import BatchChatStudent from "./pages/student/BatchChat";
import AddTimeTable from "./pages/admin/AddTimeTable";
import TeacherTimetable from "./pages/teacher/Timetable";
import StudentTimetable from "./pages/student/Timetable";
import AddMCQ from "./pages/teacher/AddMcq";
import StudentMcqs from "./pages/student/StudentMcqs";
import TeacherBatchMcqs from "./pages/teacher/TeacherBatchMcqs";
import StudentAssignments from "./pages/student/StudentAssignments";
import BatchAssignments from "./pages/teacher/BatchAssignments";
import StudentAnsweredMcqs from "./pages/student/StudentAnsweredMcqs";
import Home from "./pages/common/Home";
import TeacherRemarks from "./pages/teacher/TeacherRemarks";
import StudentRemarks from "./pages/student/StudentRemarks";
import StudentRanking from "./pages/student/StudentRanking";
import BatchRanking from "./pages/teacher/BatchRanking";
import Error404page from "./pages/common/Error404page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error404page />} />
        <Route path="/" element={<Home />} />

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
          <Route path="admin/batches" element={<ManageBatches />} />
          <Route path="admin/announcement" element={<AdminAnounce />} />
          <Route path="admin/leaves" element={<Leaves />} />
          <Route path="admin/timetable" element={<AddTimeTable />} />
        </Route>
        {/* Student Routes */}
        <Route path="student/login" element={<StudentLogin />} />
        <Route element={<PrivateStudentRoute />}>
          <Route path="student/home" element={<StudentHome />} />
          <Route path="student/profile" element={<StudentProfile />} />
          <Route path="student/apply-leave" element={<StudentApplyLeave />} />
          <Route path="student/chats" element={<BatchChatStudent />} />
          <Route path="student/timetable" element={<StudentTimetable />} />

          <Route
            path="student/announcement"
            element={<StudentAnnouncement />}
          />
          <Route path="student/mcqs" element={<StudentMcqs />} />
          <Route
            path="student/answered-mcqs"
            element={<StudentAnsweredMcqs />}
          />
          <Route path="student/assignments" element={<StudentAssignments />} />
          <Route path="student/remarks" element={<StudentRemarks />} />
          <Route path="student/ranks" element={<StudentRanking />} />
        </Route>

        {/* teacher Routes */}
        <Route path="teacher/login" element={<TeacherLogin />} />
        <Route element={<PrivateTeacherRoute />}>
          <Route path="teacher/home" element={<TeacherHome />} />
          <Route path="teacher/profile" element={<TeacherProfile />} />
          <Route path="teacher/batch" element={<TeacherBatch />} />
          <Route path="teacher/attendence" element={<TeacherAttendence />} />
          <Route path="teacher/apply-leave" element={<TeacherApplyLeave />} />
          <Route path="teacher/leaves" element={<TeachersBatchLeaves />} />
          {/* <Route path="teacher/chats" element={<BatchChatTeacher />} /> */}
          <Route path="teacher/timetable" element={<TeacherTimetable />} />
          <Route
            path="teacher/announcement"
            element={<TeacherAnnouncement />}
          />
          <Route path="teacher/add-mcq" element={<AddMCQ />} />
          <Route path="teacher/batch-mcq" element={<TeacherBatchMcqs />} />
          <Route path="teacher/batch-ranks" element={<BatchRanking />} />

          <Route path="teacher/assignments" element={<BatchAssignments />} />
          <Route path="teacher/remarks" element={<TeacherRemarks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
