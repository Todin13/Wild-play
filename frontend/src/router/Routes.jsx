import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ContactUs from "@/pages/ContactUs";
import AboutUs from "@/pages/AboutUs";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
