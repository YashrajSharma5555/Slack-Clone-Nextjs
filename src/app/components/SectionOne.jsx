import Image from "next/image";
import { FaGoogle } from "react-icons/fa";

export default function SectionOne() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center text-center md:text-left m-auto w-full py-16 px-6 gap-12 max-w-6xl">
      {/* Left Side - Text Content */}
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 max-w-2xl">
          Slack is where the future works
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl">
          Transform the way you work with one place for everything you need to get stuff done.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <button className="px-6 py-3 bg-purple-800 text-white rounded-md font-medium">
            TRY FOR FREE
          </button>
          <button className="px-3 gap-1 py-2 border border-gray-400 text-gray-700 rounded-sm bg-blue-500 flex items-center space-x-3 shadow-md hover:bg-gray-100 transition">
            <div className="bg-white p-2 rounded">
              <FaGoogle className="w-5 h-5" />
            </div>
            <span className="font-medium text-white">Sign Up with Google</span>
          </button>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image src="/video.png" alt="Slack Video" width={600} height={600} className="w-full max-w-md md:max-w-lg" />
      </div>
    </section>
  );
}
