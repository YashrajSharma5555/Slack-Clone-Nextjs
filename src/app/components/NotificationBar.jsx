import { AiOutlineClose } from "react-icons/ai";

export default function NotificationBar() {
  return (
    
    <div className="w-full max-w-6xl mx-auto rounded-4xl bg-cyan-700 text-white text-center py-3 px-7 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
    
      <p className="text-sm md:text-base leading-relaxed md:leading-normal max-w-3xl">
        Slack is your digital HQ. Meet the new features keeping teams connected in a work-from-anywhere world.{" "}
      </p>
        <a href="#" className="underline font-semibold">
          Let's go →
        </a>
      <div className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer flex items-center justify-center">
        <AiOutlineClose size={20} className="text-gray-700" />
      </div>
    </div>
  );
}
