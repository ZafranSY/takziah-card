"use client"

import React, { useState } from "react";
import Image from "next/image";
import TakziahLogo from "../../../public/WhiteLogo.svg"
const InputPanel = () => {
  const [showExtraMessage, setShowExtraMessage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Malay");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const languages = ["Malay", "English"];

  const handleImageUpload = () => {
    const file = e.target.files[0];
    // if (file) {
    //   setSelectedImage(URL.createObjectURL(file));
    // }
  };

  return (
    <div className="fixed top-0 left-0 h-screen lg:w-1/3 m-0 flex flex-col w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl border-r border-gray-700">
      {/* Header Section */}
      <div className="relative w-full bg-black/30 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-center space-x-4">
          <Image src={TakziahLogo} alt="takziah logo" width={30} height={30} />
          <h1 className="text-2xl font-semibold tracking-wide">Takziah Card</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col p-6 space-y-6 overflow-y-auto">
        {/* Image Upload Section */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Memorial Image
          </label>
          <div className={`relative h-48 rounded-lg border-2 border-dashed ${selectedImage ? 'border-green-500' : 'border-gray-600'} 
            transition-all duration-300 hover:border-gray-400`}>
            <input
              type="file"
              id="upload-file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
            {selectedImage ? (
              <div className="relative h-full">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <label
                htmlFor="upload-file"
                className="flex flex-col items-center justify-center h-full cursor-pointer"
              >
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mt-2 text-sm text-gray-400">Click to upload image</p>
                <p className="text-xs text-gray-500">JPG, PNG up to 10MB</p>
              </label>
            )}
          </div>
        </div>

        {/* Language Selection */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Language
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full bg-gray-700/50 backdrop-blur-sm p-3 rounded-lg text-left flex items-center justify-between
                hover:bg-gray-700 transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                {selectedLanguage}
              </div>
              <svg className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen && (
              <div className="absolute w-full mt-2 bg-gray-700/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-600 overflow-hidden z-10">
                {languages.map((language) => (
                  <button
                    key={language}
                    className="w-full text-left p-3 hover:bg-gray-600 transition-colors duration-200
                      flex items-center space-x-2"
                    onClick={() => {
                      setSelectedLanguage(language);
                      setIsOpen(false);
                    }}
                  >
                    <span className={`flex-1 ${selectedLanguage === language ? 'text-blue-400' : 'text-white'}`}>
                      {language}
                    </span>
                    {selectedLanguage === language && (
                      <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Extra Message Toggle */}
        <div className="w-full">
          <div className="flex items-center justify-between bg-gray-700/50 backdrop-blur-sm p-3 rounded-lg">
            <div>
              <h3 className="text-sm font-medium">Additional Message</h3>
              <p className="text-xs text-gray-400">Include a personal message</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showExtraMessage}
                onChange={(e) => setShowExtraMessage(e.target.checked)}
              />
               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600"></div>
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform dark:bg-gray-800"></span>
         
            </label>
          </div>

          {showExtraMessage && (
            <textarea
              className="w-full mt-3 p-3 h-32 rounded-lg bg-gray-700/50 backdrop-blur-sm border border-gray-600
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors
                placeholder-gray-400 text-sm"
              placeholder="Write your message here..."
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-6 bg-black/30 backdrop-blur-sm">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg
          transition-colors duration-200 flex items-center justify-center space-x-2">
          <span>Generate Card</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InputPanel;