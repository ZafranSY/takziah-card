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
  const initialData: TemplateData = {
    name: "",
    image: "",
    extraMessage: "",
    language: "Malay",
    boolExtraMessage: false,
    dateOfDeath: "",
  };

  // We only keep finalData
  const [finalData, setFinalData] = useState<TemplateData>(initialData);
  const [showInputPanel, setShowInputPanel] = useState(true);

  const templateRef = useRef<HTMLDivElement>(null);

  // We can pass an empty function to onDataChange if needed
  const handleDataChange = (data: TemplateData) => {
    // No-op or remove entirely if not needed
  };

  // The "Generate Card" button sets finalData for display & download
  const handleGenerateTemplate = (data: TemplateData) => {
    setFinalData({ ...data });
    if (window.innerWidth < 1024) {
      setShowInputPanel(false);
    }
  };

  const handleDownload = async () => {
    if (!templateRef.current) return;
    try {
      // Save current inline styles
      const originalStyle = templateRef.current.style.cssText;
      templateRef.current.style.height = "auto";
      templateRef.current.style.overflow = "visible";

      // Capture the template using html2canvas
      const canvas = await html2canvas(templateRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: false,
      });

      // Optional: If you do grayscale processing, keep that code here.
      // For brevity, we'll skip it. If you still want it, re-add your code.
      
      const image = canvas.toDataURL("image/jpeg", 1.0);
      const link = document.createElement("a");
      link.href = image;
      link.download = `${finalData.name || "takziah-card"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Restore the original styles
      templateRef.current.style.cssText = originalStyle;
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("There was an error generating the download. Please try again.");
    }
  };

  const handleReset = () => {
    setFinalData(initialData);
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
        {showInputPanel ? (
          // Eye icon
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z 
                 M2.458 12C3.732 7.943 7.523 5 
                 12 5c4.478 0 8.268 2.943 
                 9.542 7-1.274 4.057-5.064 
                 7-9.542 7-4.477 0-8.268
                 -2.943-9.542-7z"
            />
          </svg>
        ) : (
          // Pencil icon
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536
                 m-2.036-5.036a2.5 2.5 
                 0 113.536 3.536
                 L6.5 21.036H3v-3.572
                 L16.732 3.732z"
            />
          </svg>
        )}
      </button>

      {/* Input Panel */}
      <div
        className={`
          ${showInputPanel ? "flex" : "hidden"}
          lg:flex lg:w-1/3 w-full h-screen
        `}
      >
        <InputPanel
          onDataChange={handleDataChange}
          onGenerateCard={handleGenerateTemplate}
        />
      </div>

      {/* Template Preview */}
      <div
        className={`
          ${!showInputPanel ? "flex" : "hidden"}
          lg:flex lg:w-2/3 w-full h-screen overflow-auto
        `}
      >
        <div className="max-h-screen w-full bg-gray-100 dark:bg-gray-800 p-4 flex justify-center">
          <div className="max-w-4xl w-full mx-auto flex flex-col h-full justify-center items-center">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col min-h-screen justify-center items-center">
              {/* The TemplatePage container */}
              <div className="flex-1 mb-6" ref={templateRef}>
                <TemplatePage data={finalData} />
              </div>

              {/* Buttons container */}
              <div className="flex justify-center gap-2 md:gap-4 pt-2 md:pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleDownload}
                  className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition-colors h-10"
                >
                  Download
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gray-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-600 transition-colors h-10"
                >
                  Reset
                </button>
                {!showInputPanel && (
                  <button
                    onClick={toggleView}
                    className="lg:hidden bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors h-10"
                  >
                    Back
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
