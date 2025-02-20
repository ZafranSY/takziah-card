import Image from "next/image";
import MainPage  from "./component/mainPage";
import Sidebar from "./component/InputPanel";
export default function Home() {
  return (
    <div className="">  
       <Sidebar/>

     <h1 className="text-pink-400">testing</h1>

     <MainPage/>
    </div>
  );
}
