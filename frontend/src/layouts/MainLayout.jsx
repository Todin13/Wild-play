// MainLayout.jsx
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
