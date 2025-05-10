/*

Main layout of the website
Author: ODIN Thomas

*/
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
