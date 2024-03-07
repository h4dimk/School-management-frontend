import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Profile from "./pages/admin/Profile";
import ManageTeachers from "./pages/admin/ManageTeacers";
import ManageStudents from "./pages/admin/ManageStudents";
import Courses from "./pages/admin/Courses";
import AddStudents from "./pages/admin/AddStudents";
import AddTeachers from "./pages/admin/AddTeachers";
import Home from "./pages/admin/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manage-teachers" element={<ManageTeachers />} />
        <Route path="/add-teachers" element={<AddTeachers />} />
        <Route path="/manage-students" element={<ManageStudents />} />
        <Route path="/add-students" element={<AddStudents />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
