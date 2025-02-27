"use client"
import React, { useState } from "react";

import MainPage  from "./component/mainPage";

interface TemplateData {
  name: string;
  image: string;
  from: string;
}

export default function Home() {

  return (
  <main>
    <MainPage/>
  </main>
  );
}
