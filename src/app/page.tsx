"use state"
import React, { useState } from "react";

import Image from "next/image";
import MainPage  from "./component/mainPage";
import InputPanel from "./component/InputPanel";
import ThemeToggle from "./component/ThemeToggle";
import { SiE } from "react-icons/si";

interface TemplateData {
  name: string;
  image: string;
  from: string;
}

export default function Home() {
  const [templateData, setTemplateData] = useState<TemplateData>({
    name: "",
    image: "/api/placeholder/400/400",
    from: ""
  });
  const handleDataChange = (data: TemplateData) => {
    setTemplateData(data);
  };
  return (
    <div className="bg-white dark:bg-gray-800 flex h-screen">  
    <div className="w-1/4">
    <InputPanel onDataChange = {handleDataChange} />

    </div>
    <div className="  w-3/4 mx-auto">
      <MainPage/>
    </div>

    </div>
  );
}
