"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import TakziahLogo from "../../../public/logo1.svg"
import ThemeToggle from "./ThemeToggle";

interface TemplateData  {
  name: string;
  image: string;
  extraMessage: string;
  language: string;
  boolExtraMessage: boolean;
  dateOfDeath: string;
}

interface InputPanelProps {
  onDataChange: (data: TemplateData) => void;
  onGenerateCard: (data: TemplateData) => void;
}

const InputPanel: React.FC<InputPanelProps> = ({ onDataChange, onGenerateCard }) => {
  const [formData, setFormData] = useState<TemplateData>({
    name: "",
    image: "",
    extraMessage: "",
    language: "Malay", // Default language
    boolExtraMessage: false,
    dateOfDeath: ""
  });
  
  useEffect(() => {
    // Sync data with parent component
    onDataChange(formData);
  }, [formData, onDataChange]);
  
  const [isOpen, setIsOpen] = useState(false);
  const languages = ["Malay", "English"];

  async function removeBackground(file: File): Promise<string>{
    const formData = new FormData();
    formData.append("image_file", file);

    try {
      const response = await fetch("https://api.remove.bg/v1.0/removebg",{
        method:"POST",
        headers:{
        "X-Api-key":"fLSptCTyQHXLSVw1sHuBvpyG"
        },
        body:formData
      });
      
      if (!response.ok) {
        throw new Error("Background removal failed");
      }
    
      const blob = await response.blob();
      return URL.createObjectURL(blob);
      
    } catch {
      console.error("Background removal failed");
      const imageUrl = URL.createObjectURL(file);

      return imageUrl;
    }
  }
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try{
        const processedImageURL = await removeBackground(file);
        setFormData(prevData => ({
          ...prevData,
          image: processedImageURL
        }));
      } catch {
        console.error("Background removal failed");
        const imageUrl = URL.createObjectURL(file);

        setFormData(prevData => ({
          ...prevData,
          image: imageUrl
        }));
      }
    }
  };
  
  const handleLanguageSelect = (language: string) => {
    setFormData(prevData => ({ ...prevData, language }));
    setIsOpen(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: checked }));
  };

  const handleDataSubmit = () => {
    // Update parent component with current data
    onDataChange(formData);
    // Generate card with current data
    onGenerateCard(formData);
  };

  const handleImageRemove = () => {
    setFormData(prevData => ({ ...prevData, image: "" }));
  };

  return (
    <div className="fixed top-0 left-0 h-screen lg:w-1/3 m-0 flex flex-col w-full shadow-lg
      bg-gradient-to-br from-slate-50 via-white to-blue-50 
      dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
      text-slate-700 dark:text-slate-200 
      border-r border-slate-200 dark:border-slate-700">
      
      {/* Header Section */}
      <div className="relative w-full bg-white/80 dark:bg-slate-800/80 p-6 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-4 justify-between">
          <div className="flex items-center gap-3">
            <Image src={TakziahLogo} alt="takziah logo" width={30} height={30} className="dark:invert" />
            <h1 className="text-2xl font-semibold tracking-wide bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Takziah Card
            </h1>
          </div>
          
          <div className="ml-4">
            <ThemeToggle/>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col p-6 space-y-6 overflow-y-auto">
        <div>
          <label className="block text-sm text-slate-600 dark:text-slate-300">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-3 p-3 h-10 rounded-lg text-slate-700 dark:text-white bg-white dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              focus:border-blue-400 dark:focus:border-blue-500 
              focus:ring-1 focus:ring-blue-400 dark:focus:ring-blue-500 
              transition-colors
              text-sm shadow-sm"
          />
        </div>
        
        {/* Image Upload Section */}
        <div className="w-full">
          <label className="block text-sm font-medium mb-2 text-slate-600 dark:text-slate-300">
            Memorial Image
          </label>
          <div className={`relative h-48 rounded-lg border-2 border-dashed 
            ${formData.image ? 'border-blue-500 dark:border-blue-400' : 'border-slate-300 dark:border-slate-600'} 
            transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500
            bg-slate-50 dark:bg-slate-800/50`}>
            <input
              type="file"
              id="upload-file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            {formData.image ? (
              <div className="relative h-full">
                {/* Using img tag for blob URLs to handle dynamic images */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={handleImageRemove}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full hover:bg-red-600 transition-colors text-white"
                >
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <label
                htmlFor="upload-file"
                className="flex flex-col items-center justify-center h-full cursor-pointer"
              >
                <svg className="w-12 h-12 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Click to upload image</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">JPG, PNG up to 10MB</p>
              </label>
            )}
          </div>
        </div>

        {/* Language Selection */}
        <div className="w-full">
          <label className="block text-sm font-medium mb-2 text-slate-600 dark:text-slate-300">
            Language
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full bg-white dark:bg-slate-800 p-3 rounded-lg text-left flex items-center justify-between
                border border-slate-200 dark:border-slate-700
                hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-200
                shadow-sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                {formData.language}
              </div>
              <svg className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen && (
              <div className="absolute w-full mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-xl 
                border border-slate-200 dark:border-slate-700 overflow-hidden z-10">
                {languages.map((language) => (
                  <button
                    key={language}
                    className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200
                      flex items-center space-x-2"
                    onClick={() => handleLanguageSelect(language)}
                  >
                    <span className={`flex-1 ${formData.language === language ? 'text-blue-500 dark:text-blue-400' : ''}`}>
                      {language}
                    </span>
                    {formData.language === language && (
                      <svg className="w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
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
          <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-lg
            border border-slate-200 dark:border-slate-700 shadow-sm">
            <div>
              <h3 className="text-sm font-medium">Additional Message</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Include a personal message</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                name="boolExtraMessage"
                checked={formData.boolExtraMessage}
                onChange={handleCheckboxChange}
              />
              <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 
                peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer 
                peer-checked:bg-blue-500 dark:peer-checked:bg-blue-400"></div>
              <span className="absolute left-1 top-1 w-4 h-4 bg-white dark:bg-slate-200 
                rounded-full peer-checked:translate-x-5 transition-transform"></span>
            </label>
          </div>

          {formData.boolExtraMessage && (
            <textarea
              name="extraMessage"
              value={formData.extraMessage}
              onChange={handleChange}
              className="w-full mt-3 p-3 h-32 rounded-lg bg-white dark:bg-slate-800
                border border-slate-200 dark:border-slate-700
                focus:border-blue-400 dark:focus:border-blue-500 
                focus:ring-1 focus:ring-blue-400 dark:focus:ring-blue-500 
                transition-colors placeholder-slate-400 dark:placeholder-slate-500
                text-sm shadow-sm"
              placeholder="Write your message here..."
            />
          )}
        </div>
        
        <div>
          <label className="block text-sm text-slate-600 dark:text-slate-300">Date of Death:</label>
          <input
            type="date"
            name="dateOfDeath"
            value={formData.dateOfDeath}
            onChange={handleChange}
            className="w-full mt-3 p-3 h-10 rounded-lg text-slate-700 dark:text-white bg-white dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              focus:border-blue-400 dark:focus:border-blue-500 
              focus:ring-1 focus:ring-blue-400 dark:focus:ring-blue-500 
              transition-colors
              text-sm shadow-sm"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm 
        border-t border-slate-200 dark:border-slate-700">
        <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 
          hover:from-blue-700 hover:to-cyan-700
          dark:from-blue-500 dark:to-cyan-500
          dark:hover:from-blue-600 dark:hover:to-cyan-600
          text-white font-medium py-3 px-4 rounded-lg
          transition-all duration-200 flex items-center justify-center space-x-2
          shadow-sm hover:shadow"
          onClick={handleDataSubmit}>
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