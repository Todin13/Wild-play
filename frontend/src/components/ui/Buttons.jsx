import React from "react";

const Button = ({ children, variant = "primary", onClick }) => {
  // Define color classes based on the variant
  const colorClasses = {
    primary: "bg-buttonBg hover:bg-accentFocus text-buttonText",
  };

  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-full font-semibold text-base transition-all duration-200 ease-in-out ${colorClasses[variant]} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent self-center`}
    >
      {children}
    </button>
  );
};

export default Button;
