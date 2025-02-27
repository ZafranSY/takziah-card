"use client";
import React, { useState, useRef } from "react";
import TemplatePage from "./TemplatePage";
import InputPanel from "./InputPanel";
import html2canvas from "html2canvas";

interface TemplateData {
  name: string;
  image: string;
  extraMessage: string;
  language: string;
  boolExtraMessage: boolean;
  dateOfDeath: string;
}

const MainPage: React.FC = () => {
  // Initial empty state for the form data
  const initialData: TemplateData = {
    name: "",
    image: "",
    extraMessage: "",
    language: "Malay",
    boolExtraMessage: false,
    dateOfDeath: ""
  };

  // Data currently in the form
  const [templateData, setTemplateData] = useState<TemplateData>(initialData);
  
  // Data to display in the template (only updated when Generate Card is clicked)
  const [finalData, setFinalData] = useState<TemplateData>(initialData);
  
  // Show/hide panels for mobile view
  const [showInputPanel, setShowInputPanel] = useState(true);
  
  // Ref for capturing template as image
  const templateRef = useRef<HTMLDivElement>(null);

  const handleDataChange = (data: TemplateData) => {
    setTemplateData(data);
  };

  const handleGenerateTemplate = (data: TemplateData) => {
    // Update the final data for display in template
    setFinalData({...data});
    
    // On smaller screens, switch to preview mode
    if (window.innerWidth < 1024) {
      setShowInputPanel(false);
    }
  };

  const handleDownload = async () => {
    if (!templateRef.current) return;
    
    try {
      // Show loading state if needed
      
      // Capture the template as an image
      const canvas = await html2canvas(templateRef.current, {
        backgroundColor: "#000000", // Black background
        scale: 2, // Higher quality
        logging: false,
        useCORS: true // To handle cross-origin images
      });
      
      // Convert to data URL
      const image = canvas.toDataURL("image/jpeg", 0.9);
      
      // Create download link
      const link = document.createElement("a");
      link.href = image;
      link.download = `${finalData.name || "takziah-card"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("There was an error generating the download. Please try again.");
    }
  };

  const handleReset = () => {
    // Reset both form and displayed data
    setTemplateData(initialData);
    setFinalData(initialData);
    // Return to input panel on mobile
    setShowInputPanel(true);
  };
  
  const toggleView = () => {
    setShowInputPanel(!showInputPanel);
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex flex-col lg:flex-row h-screen overflow-hidden relative">
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleView}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {showInputPanel ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          )}
        </svg>
      </button>

      {/* Input Panel */}
      <div className={`${showInputPanel ? 'flex' : 'hidden'} lg:flex lg:w-1/3 w-full h-screen`}>
        <InputPanel 
          onDataChange={handleDataChange}
          onGenerateCard={handleGenerateTemplate}
        />
      </div>
      
      {/* Template Preview */}
      <div className={`${!showInputPanel ? 'flex' : 'hidden'} lg:flex lg:w-2/3 w-full h-screen overflow-auto`}>
        <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-800 p-4 flex justify-center">
          <div className="max-w-4xl w-full mx-auto flex flex-col h-full">
            {/* Container for template and buttons */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col min-h-screen">
              {/* Template container with fixed height and scrollable if needed */}
              <div className="flex-1 overflow-auto mb-6" ref={templateRef}>
                <TemplatePage data={finalData} />
              </div>
              
              {/* Buttons container - fixed at bottom */}
              <div className="flex justify-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {/* <button
                  onClick={() => handleGenerateTemplate(templateData)}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                >
                  Update Preview
                </button> */}
                <button
                  onClick={handleDownload}
                  className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition-colors"
                >
                  Download
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gray-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-600 transition-colors"
                >
                  Reset
                </button>
                {!showInputPanel && (
                  <button
                    onClick={toggleView}
                    className="lg:hidden bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                  >
                    Back to Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;