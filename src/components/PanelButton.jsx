import { Icon } from "@iconify/react";
const PanelButton = ({ icon, text, onClick, isMobile }) => (
   <button
      className="bg-[#FF9248] h-[55px] w-[80px] flex flex-col items-center justify-center  rounded-lg border-2 border-white text-[#2E2929] hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out"
      onClick={onClick}
   >
      <div className=" p-2">
         <Icon icon={icon} width={isMobile ? 20 : 25} />
         <p className="text-sm">{text}</p>
      </div>
   </button>
);

export default PanelButton;
