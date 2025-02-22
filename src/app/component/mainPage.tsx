"use client";
import React, { useState } from "react";
import TemplatePage from "./TemplatePage";

const MainPage = () => {
  const [showTemplate, setShowTemplate] = useState(false); // State to toggle between input and template view

  const handleGenerateTemplate = () => {
    setShowTemplate(true);
  };

  if (showTemplate) {
    // Show the generated template
    return <TemplatePage />;
  }

  // Input screen for now (or other inputs if needed)
  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-50 dark:bg-gray-800">
  <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md w-full max-w-xl h-[95%] max-h-[95%] py-3">

       <div>
        <TemplatePage/>
       </div>
      
      <div className="flex mt-4 gap-4 justify-center items-center">
          <button
            // onClick={handleDownload}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
          >
            Download
          </button>
          <button
            // onClick={handleReset}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
        </div>
    </div>
  );
};

export default MainPage;
