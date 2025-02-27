"use client";

import React from "react";
import { Amiri } from "next/font/google";

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
});

interface TemplateData {
  name: string;
  image: string;
  extraMessage: string;
  language: string;
  boolExtraMessage: boolean;
  dateOfDeath: string;
}

interface TemplatePageProps {
  data: TemplateData;
}

const TemplatePage: React.FC<TemplatePageProps> = ({ data }) => {
  const getLocalizedText = () => {
    if (data.language === "Malay") {
      return {
        title: "Takziah",
        subtitle: "Dengan penuh kesedihan, kami mengumumkan pemergian",
        date: "Tarikh Kematian",
        message: "Semoga Allah mencucuri rahmat ke atas roh beliau"
      };
    } else {
      return {
        title: "Condolences",
        subtitle: "With great sadness, we announce the passing of",
        date: "Date of Death",
        message: "May their soul rest in peace"
      };
    }
  };
  
  const text = getLocalizedText();
  
  return (
    <div className="w-full bg-black flex justify-center items-center p-8">
      <div className="max-w-4xl w-full bg-black text-white text-center p-12 pb-16">
        {/* Header Logo */}
        <div className="mb-8 pt-8">
          {/* Arabic Text */}
          <div className={amiri.className}>
            <h1 className="text-4xl mb-12 text-amber-400">
              إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">{text.title}</h2>
          <p className="text-lg">{text.subtitle}</p>
          
          {/* Divider */}
          <div className="w-3/4 h-px bg-white mx-auto my-8"></div>
          
          {/* Name */}
          <h3 className="text-2xl font-bold px-8 py-2">
            {data.name || "Name will appear here"}
          </h3>
          
          {/* Prayer */}
          <p className="text-lg px-12 my-8">
            {text.message}
          </p>
          
          {/* Image */}
          <div className="w-48 h-48 mx-auto my-12 rounded-full overflow-hidden">
            {data.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={data.image}
                alt="Memorial"
                className="w-full h-full object-cover grayscale"
                style={{ filter: "grayscale(100%)" }}
              />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <span className="text-sm text-gray-400">No image selected</span>
              </div>
            )}
          </div>
          
          {/* Extra Message if enabled */}
          {data.boolExtraMessage && data.extraMessage && (
            <div className="my-8 px-8">
              <p className="text-lg italic">{data.extraMessage}</p>
            </div>
          )}
          
          {/* Divider */}
          <div className="w-3/4 h-px bg-white mx-auto my-8"></div>
          
          {/* Footer */}
          <div className="mt-8 mb-8">
            <p className="text-lg mb-2">{text.date}</p>
            <p className="text-xl font-semibold px-8 py-2">
              {data.dateOfDeath || "Date will appear here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;