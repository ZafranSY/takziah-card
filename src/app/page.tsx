import Image from "next/image";
import MainPage  from "./component/mainPage";
import Sidebar from "./component/InputPanel";
export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-800">  
       <Sidebar/>

    </div>
  );
}
