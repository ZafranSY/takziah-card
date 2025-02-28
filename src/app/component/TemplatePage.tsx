"use client";

import React from "react";
import { Amiri } from "next/font/google";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
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
  // Localized text
  const getLocalizedText = () => {
    if (data.language === "Malay") {
      return {
        title: "Takziah",
        subtitle: "kepada seluruh keluarga",
        date: "Tarikh Kematian",
        message: "Semoga rohnya dicucuri rahmat dan ditempatkan dalam kalangan mereka yang beriman",
      };
    } else {
      return {
        title: "Condolences",
        subtitle: "With great sadness, we announce the passing of",
        date: "Date of Death",
        message: "May their soul rest in peace",
      };
    }
  };

  const text = getLocalizedText();

  return (
    <div
      className={`
        w-full
        /* On mobile: up to 24rem wide; sm: up to 28rem; md: up to 36rem. */
        max-w-sm
        sm:max-w-md
        md:max-w-xl
        mx-auto

        bg-black
        text-white
        rounded-md
        shadow-md
        p-4
        sm:p-8
        flex
        flex-col
        items-center

        /* On mobile, clamp height so card + buttons fit.
           On desktop (md+), remove that limit and set a min height so it’s bigger. */
        max-h-[calc(100vh-120px)]
        md:max-h-none
        md:min-h-[700px]
        overflow-auto
      `}
    >
      <div className={amiri.className}>
        <h1 className="text-xl sm:text-3xl mb-4 text-amber-400 text-center">
          إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
        </h1>
      </div>

      {/* Title / Subtitle */}
      <h2 className="text-base sm:text-2xl font-semibold text-center">
        {text.title}
      </h2>
      <p className="text-sm sm:text-sm mt-1 sm:mt-2 text-center">
        {text.subtitle}
      </p>

      {/* Divider */}
      <div className="w-3/4 h-px bg-white mx-auto my-2 sm:my-4" />

      {/* Name */}
      <h3 className="text-sm sm:text-xl font-bold px-2 sm:px-4 py-1 text-center">
        {data.name || "Name will appear here"}
      </h3>

      {/* Prayer */}
      <p className="text-xs sm:text-lg px-4 sm:px-8 my-2 sm:my-4 text-center">
        {text.message}
      </p>

      {/* Image */}
      <div
        className="
          w-20 h-20
          sm:w-32 sm:h-32
          mx-auto
          my-2 sm:my-4
          rounded-full
          overflow-hidden
       
        "
      >
        {data.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={data.image}
            alt="Memorial"
            className="w-full h-full object-cover"
            style={{ filter: "grayscale(100%)" }}
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center ">
            <span className="text-xs text-gray-400 text-center">No image selected</span>
          </div>
        )}
      </div>

      {/* Extra Message if enabled */}
      {data.boolExtraMessage && data.extraMessage && (
        <div className="my-2 sm:my-4 px-2 sm:px-6 text-center">
          <p className="text-xs sm:text-lg italic">{data.extraMessage}</p>
        </div>
      )}

      {/* Divider */}
      <div className="w-3/4 h-px bg-white mx-auto my-2 sm:my-4" />

      {/* Footer (Date) */}
      <div className="mt-2 sm:mt-4 mb-1 sm:mb-2 text-center">
        <p className="text-xs sm:text-lg mb-1">{text.date}</p>
        <p className="text-sm sm:text-xl font-semibold px-2 py-1">
          {data.dateOfDeath || "Date will appear here"}
        </p>
      </div>
    </div>
  );
};

export default TemplatePage;
