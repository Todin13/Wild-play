import React from 'react';

// Top Page Title Component
export const PageTitle = ({ children }) => {
  return (
    <h1 className="text-4xl font-bold text-gray-900 mb-6">
      {children}
    </h1>
  );
};

// Section Title Component
export const SectionTitle = ({ children }) => {
  return (
    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex justify-center">
      {children}
    </h2>
  );
};