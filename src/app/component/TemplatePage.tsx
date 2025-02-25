import React from "react";
import Image from "next/image";
import { Amiri } from "next/font/google";

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
});

interface TemplatePageProps {
  name?: string;
  image?: string;
  from?: string;
}

const TemplatePage: React.FC<TemplatePageProps> = ({
  name = "",
  image = "/api/placeholder/400/400",
  from = ""
}) => {
  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center p-4">
      <div className="max-w-2xl w-full bg-black text-white text-center p-6">
        {/* Header Logo */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4">
            <img 
              src="/api/placeholder/64/64" 
              alt="Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Arabic Text */}
          <div className={amiri.className}>
            <h1 className="text-4xl mb-8 text-amber-400">
              إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">TAKZIAH</h2>
          <p className="text-sm">Kepada seluruh keluarga</p>
          
          {/* Divider */}
          <div className="w-3/4 h-px bg-white mx-auto my-6"></div>
          
          {/* Name */}
          <h3 className="text-xl font-bold px-8">
            {name}
          </h3>
          
          {/* Prayer */}
          <p className="text-sm px-12 my-6">
            Semoga rohnya dicucuri rahmat dan ditempatkan di dalam kalangan mereka yang beriman
          </p>
          
          {/* Image */}
          <div className="w-48 h-48 mx-auto my-8 rounded-full overflow-hidden">
            <img
              src={image}
              alt="Memorial"
              className="w-full h-full object-cover grayscale"
            />
          </div>
          
          {/* Divider */}
          <div className="w-3/4 h-px bg-white mx-auto my-6"></div>
          
          {/* Footer */}
          <div className="mt-6">
            <p className="text-sm mb-2">DARIPADA</p>
            <p className="text-lg font-semibold px-8">
              {from}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;