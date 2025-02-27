"use client"
import React, { useState } from "react";

import MainPage  from "./component/mainPage";

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
  <main>
    <MainPage/>
  </main>
  );
}
