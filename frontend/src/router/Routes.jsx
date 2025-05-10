/*

Router Page
Author: ODIN Thomas
Author: HERVET Thibaut
Author: SMIRNIV Kiril
Author: Xiang Yu Oon

Everybody added what he as done

*/
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import GuideSearchPage from "@/pages/SearchGuidePage";
import GuideDetailPage from "@/pages/GuideDetailPage";
import TripDetailPage from "@/pages/TripDetailPage";
import CreateTripPage from "@/pages/CreateTripPage";
import CreateGuidePage from "@/pages/CreateGuidePage";
import ContactUs from "@/pages/ContactUs";
import AboutUs from "@/pages/AboutUs";
import Register from "@/pages/user/RegisterPage";
import Login from "@/pages/user/LoginPage";
import Profile from "@/modules/users/UserProfilePage";
import UserTable from "@/pages/user/UserTablePage";
import UserDetail from "@/modules/users/UserDetailPage";
import Bookings from "@/pages/Bookings";
import BookingDetails from "@/pages/BookingDetails";
import NewBooking from "@/pages/NewBooking";
import VanDetails from "@/pages/VanDetails";
import SearchPage from "@/pages/SearchPage";
import Campervans from "@/pages/Campervans";
import Deals from "@/pages/Deals";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFoundPage from "@/pages/NotFoundPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<ContactUs />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/userTable" element={<UserTable />} />
    <Route path="/userDetail" element={<UserDetail />} />
    <Route path="/bookings" element={<Bookings />} />
    <Route path="/bookings/:booking_id" element={<BookingDetails />} />
    <Route path="/bookings/new" element={<NewBooking />} />
    <Route path="/campervans/:van_id" element={<VanDetails />} />
    <Route path="/search_page" element={<SearchPage />} />
    <Route path="/campervans" element={<Campervans />} />
    <Route path="/deals" element={<Deals />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/search-guides" element={<GuideSearchPage />} />
    <Route path="/guides" element={<GuideDetailPage />} />
    <Route path="/trips" element={<TripDetailPage />} />
    <Route path="/plan-trip" element={<CreateTripPage />} />
    <Route path="/create-guide" element={<CreateGuidePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
