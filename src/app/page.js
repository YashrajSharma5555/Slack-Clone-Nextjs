import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import LogoBar from '@/app/components/MiddleSection'
import SectionThree from "./components/SectionThree";
import Header from "./components/Header";
import SectionOne from "./components/SectionOne";
import NotificationBar from "./components/NotificationBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      

      {/* header */}
      <Header/>

      {/* notification bar */}
      <NotificationBar/>

      {/* Section 1 */}
      <SectionOne/>



{/* section 2 */}
<LogoBar/>

{/* section3 */}
<SectionThree/>


      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <p>© 2025 Slack Clone. All rights reserved.</p>
      </footer>
    </div>
  );
}
