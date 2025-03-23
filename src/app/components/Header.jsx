import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";

export default function Header() {
  return (
    <header className="flex items-center justify-center gap-20 bg-amber-50 px-6 py-4 shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Image src="/logo.png" alt="Slack Logo" width={70} height={70} />
      </div>

      {/* Navigation Menu */}
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="text-gray-600 hover:text-gray-900">Product</a>
        <a href="#" className="text-gray-600 hover:text-gray-900">Enterprise</a>
        <a href="#" className="text-gray-600 hover:text-gray-900">Resources</a>
        <a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a>
      </nav>

      {/* Right Section - Search, Sign In, Buttons */}
      <div className="flex items-center space-x-4">
        {/* Search Icon */}
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
          <AiOutlineSearch size={20} className="text-gray-700" />
        </button>

        {/* Sign In */}
        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
          Sign In
        </a>

        {/* Talk to Sales & Try for Free Buttons */}
        <button className="px-4 py-2 border border-gray-400 rounded-md text-purple-800 hover:text-gray-900">
          TALK TO SALES
        </button>
        <button className="px-4 py-2 bg-purple-800 text-white rounded-md">
          TRY FOR FREE
        </button>
      </div>
    </header>
  );
}
