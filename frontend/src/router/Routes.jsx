import { Routes, Route } from "react-router-dom";
import Register from "../pages/RegisterPage";
import Login from "../pages/LoginPage";
import Profile from "../pages/UserProfilePage";
import User from "../pages/UserDashboardPage";
import Update from "../pages/UserUpdatePage";
import PwUpdate from "../pages/PasswordUpdatePage";
import UserTable from "../pages/UserTablePage";
import UserDetail from "../pages/UserDetailPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/update" element={<Update />} />
      <Route path="/pwupd" element={<PwUpdate />} />
      <Route path="/dashboard" element={<User />} />
      <Route path="/userTable" element={<UserTable />} />
      <Route path="/userDetail" element={<UserDetail />} />
    </Routes>
  );
}

export default AppRoutes;