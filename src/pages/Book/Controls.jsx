import React from "react";
import { Icon } from "@iconify/react";
// import ZoomControls from "./ZoomControls"; // Uncomment if ZoomControls is needed
import Accessibility from "../../utils/Accessibility";

const Controls = ({
   isAudioEnabled,
   toggleAudio,
   toggleZoomControls,
   isZoomControlsVisible,
   increaseTextSize,
   decreaseTextSize,
   takeScreenshot,
   reloadPage,  // Add this prop
}) => (
   <div className="fixed bottom-0 left-0 w-full bg-[#FFDFCD] p-2">
      <div className="flex justify-center items-center">
         {/* Uncomment the ZoomControls component if you need zoom controls */}
         {/* {isZoomControlsVisible && (
            <ZoomControls
               increaseTextSize={increaseTextSize}
               decreaseTextSize={decreaseTextSize}
            />
         )} */}
         <div className="flex space-x-4">
            <button
               className="h-[56px] bg-[#FF9248] rounded-lg border-2 border-white text-[#2E2929] hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out"
               onClick={toggleZoomControls}
            >
               <div className="flex flex-col items-center justify-center">
                  <Icon icon="mdi:zoom-in" width={22} />
                  <p className="text-sm">Zoom In</p>
               </div>
            </button>
            <button
               className="h-[56px] bg-[#FF9248] rounded-lg border-2 border-white text-[#2E2929] hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out"
               onClick={toggleAudio}
            >
               <div className="flex flex-col items-center justify-center">
                  <Icon
                     icon={
                        isAudioEnabled ? "mdi:volume-high" : "mdi:volume-off"
                     }
                     width={22}
                  />
                  <p>Listen</p>
               </div>
            </button>
            <button
               className="h-[56px] bg-[#FF9248] rounded-lg border-2 border-white text-[#2E2929] hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out"
               onClick={reloadPage}  // Add the onClick event to trigger page reload
            >
               <div className="flex flex-col items-center justify-center">
                  <Icon icon="mdi:reload" width={22} />
                  <p>Reload</p>
               </div>
            </button>
            <button
               className="h-[56px] bg-[#FF9248] rounded-lg border-2 border-white text-[#2E2929] hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out"
               onClick={takeScreenshot} 
            >
               <div className="flex flex-col items-center justify-center">
                  <Icon icon="mdi:camera" width={22} />
                  <p>Screenshot</p>
               </div>
            </button>
         </div>
         <div><Accessibility /></div>
      </div>
   </div>
);

export default Controls;
