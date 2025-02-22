import Image from "next/image";
import MainPage  from "./component/mainPage";
import Sidebar from "./component/InputPanel";
import ThemeToggle from "./component/ThemeToggle";
import { SiE } from "react-icons/si";


export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-800 flex h-screen">  
    <div className="w-1/3">
      <Sidebar/>
    </div>
    <div className="  w-2/3">
      <MainPage/>
    </div>

    </div>
  );
}
