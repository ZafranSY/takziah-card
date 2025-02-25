"use client";
import React, { useState } from "react";
import TemplatePage from "./TemplatePage";
interface TemplateData {
  name: string;
  image: string;
  from: string;
}
const MainPage = () => {
  const [showTemplate, setShowTemplate] = useState(false);

  const handleGenerateTemplate = () => {
    setShowTemplate(true);
  };
  const [templateData, setTemplateData] = useState<TemplateData>({
    name: "",
    image: "/api/placeholder/400/400",
    from: ""
  });

  const handleDataChange = (data: TemplateData) => {
    setTemplateData(data);
  };
  const handleDownload = () => {
    // Implement download functionality
    console.log("Download clicked");
  };

  const handleReset = () => {
    // Implement reset functionality
    console.log("Reset clicked");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-4 flex justify-center">
      <div className="max-w-4xl mx-auto flex flex-col h-full">
        {/* Container for template and buttons */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col">
          {/* Template container with fixed height and scrollable if needed */}
          <div className="flex-1 overflow-auto mb-6">
            <TemplatePage />
          </div>
          
          {/* Buttons container - fixed at bottom */}
          <div className="flex justify-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleDownload}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
              Download
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;