import Image from "next/image";
import { FaGoogle } from "react-icons/fa";

export default function SectionThree() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center text-center md:text-left m-auto w-full py-16 px-6 gap-12 max-w-6xl">
      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image src="/video2.jpg" alt="Slack Video" width={600} height={600} className="w-full max-w-md md:max-w-lg" />
      </div>

      {/* Left Side - Text Content */}
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 max-w-2xl">
          Now is your moment to build a better tomorrow
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl">
            We have seen what the future can be. Now its time to decide what it will be.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <button className="px-4 py-2 border-1 rounded-md text-purple-800 hover:text-gray-900">
          WATCH VIDEO
        </button>
        </div>
      </div>
    </section>
  );
}
