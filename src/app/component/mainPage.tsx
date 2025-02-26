"use client";
import React, { useState } from "react";
import TemplatePage from "./TemplatePage";
import InputPanel from "./InputPanel";
interface TemplateData{

  name:string
  image : string
  extraMessage: string
  language : string
  boolExtraMessage :boolean
  dateOfDeath : string
}

const MainPage: React.FC = () => {


  const [templateData, setTemplateData] = useState<TemplateData>({
    name: "",
    image: "",
    extraMessage: "",
    language: "Malay",
    boolExtraMessage: false,
    dateOfDeath: ""
  });
  const handleDataChange = (data: TemplateData) => {
    setTemplateData(data);
  };

  const [showTemplate, setShowTemplate] = useState(false);

  const handleGenerateTemplate = () => {
    setShowTemplate(true);
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

    <div className="bg-white dark:bg-gray-800 flex h-screen">  
    <div className="w-1/4">
    <InputPanel onDataChange = {handleDataChange} />

    </div>
    <div className="  w-3/4 mx-auto">
      
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-4 flex justify-center">
      <div className="max-w-4xl mx-auto flex flex-col h-full">
        {/* Container for template and buttons */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col">
          {/* Template container with fixed height and scrollable if needed */}
          <div className="flex-1 overflow-auto mb-6">
            <TemplatePage data={templateData} />
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
    </div>

    </div>

   
  );
};

export default MainPage;