/*

Not found page (error 404)
Author: ODIN Thomas

*/
import React from "react";
import MountainSVG from "@/assets/images/mountain-svg";
import MainLayout from "@/layouts/MainLayout";

const NotFoundPage = () => {
  return (
    <MainLayout>
      {/* Background Illustration */}
      <div className="fixed bottom-0 left-0 w-full z-[-1] pointer-events-none transform xl:translate-y-[30%]">
        <MountainSVG className="w-full h-auto object-cover text-mountain-deepgreen" />
      </div>

      {/* Centered Content */}
      <div className="flex items-center justify-center h-[80vh] flex-col text-white text-center px-4">
        <h1 className="text-[12rem] font-extrabold leading-none mb-4">404</h1>
        <h2 className="text-4xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-lg max-w-xl">
          The page you're looking for does not exist or has been moved.
        </p>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
