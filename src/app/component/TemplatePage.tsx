"use client";
import React from "react";
import ImageSample  from "../../../public/image.png";

interface TemplatePageProps {
  image?: string; // Path to the image
  message?: string; // Optional custom message
}

const TemplatePage: React.FC<TemplatePageProps> = ({
  image = ImageSample.src,
  message = "In Loving Memory of Someone Special", // Default placeholder message
}) => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md text-center">
        <div className="mb-4">
          {/* Display the image */}
          <h1 className="text-black">
          إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
          </h1>
          <img
            src={image}
            alt="Generated Takziah Card"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div>
          {/* Display the message */}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {message}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            May they rest in peace and be remembered fondly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;
