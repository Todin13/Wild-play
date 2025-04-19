import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ContactUs from "@/pages/ContactUs";
import AboutUs from "@/pages/AboutUs";
import Register from "@/modules/users/RegisterPage";
import Login from "@/modules/users/LoginPage";
import Profile from "@/modules/users/UserProfilePage";
import Update from "@/modules/users/UserUpdatePage";
import PwUpdate from "@/modules/users/PasswordUpdatePage";
import UserTable from "@/modules/users/UserTablePage";
import UserDetail from "@/modules/users/UserDetailPage";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/update" element={<Update />} />
      <Route path="/pwupd" element={<PwUpdate />} />
      <Route path="/userTable" element={<UserTable />} />
      <Route path="/userDetail" element={<UserDetail />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
