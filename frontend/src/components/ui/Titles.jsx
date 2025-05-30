/*

UI for titles
Author: ODIN Thomas

*/
import React from "react";

const Title = ({ children, variant = "section" , className = ""}) => {
  const baseClasses = "text-center text-title";

  const variants = {
    page: "text-4xl font-extrabold",
    section: "text-2xl font-bold",
  };

  return <h1 className={`${baseClasses} ${variants[variant]} ${className}`}>{children}</h1>;
};

export default Title;
