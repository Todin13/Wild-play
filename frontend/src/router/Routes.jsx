import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ContactUs from "@/pages/ContactUs";
import AboutUs from "@/pages/AboutUs";
import Register from "@/pages/user/RegisterPage";
import Login from "@/pages/user/LoginPage";
import Profile from "@/pages/user/UserProfilePage";
import Update from "@/pages/user/UserUpdatePage";
import PwUpdate from "@/pages/user/PasswordUpdatePage";
import UserTable from "@/pages/user/UserTablePage";
import UserDetail from "@/pages/user/UserDetailPage";
import Bookings from "@/pages/Bookings";
import BookingDetails from "@/pages/BookingDetails";
import NewBooking from "@/pages/NewBooking";
import BookingsCampers from "@/pages/BookingsCampers";
import VanDetails from "@/pages/VanDetails";

const AppRouter = () => (
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
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/bookings/:booking_id" element={<BookingDetails />} />
      <Route path="/bookings/new" element={<NewBooking />} />
      <Route path="/bookings/campers" element={<BookingsCampers />} />
      <Route path="/bookings/campers/details/:van_id" element={<VanDetails />} /> 
    </Routes>
);

export default AppRouter;
