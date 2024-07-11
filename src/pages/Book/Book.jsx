import { useEffect, useState } from "react";
import Controls from "./Controls";
import Page from "./Page";
import { pages } from "./pages";
import { Icon } from "@iconify/react";
import html2canvas from "html2canvas";
import useSpeech from "../../hooks/useSpeech";

const Book = () => {
   const {
      isAudioEnabled,
      toggleAudio,
      currentPage,
      goToPreviousPage,
      goToNextPage,
      elements,
      handleLineClick,
      textSize,
      increaseTextSize,
      decreaseTextSize,
      isZoomControlsVisible,
      toggleZoomControls,
    //   setCurrentPage,
   } = useSpeech(pages);

   const leftPageIndex = currentPage;
   const rightPageIndex = currentPage + 1;
   const canGoToNextPage = rightPageIndex < pages.length;
   const canGoToPreviousPage = leftPageIndex > 0;
   const [scale, setScale] = useState(1);

   useEffect(() => {
      const handleResize = () => {
         const w = window.innerWidth;
         if (w < 1300) {
            setScale(w / 1300);
         } else {
            setScale(1);
         }
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   const takeScreenshot = () => {
      const bookElement = document.querySelector(".page-container");
      if (bookElement) {
         html2canvas(bookElement).then((canvas) => {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = `page-${currentPage + 1}.png`;
            link.click();
         });
      }
   };

   return (
      <div className="h-screen overflow-hidden flex flex-col items-center bg-gray-100">
         <div className="flex flex-1 items-start justify-center w-full">
            <div
               className="page-container min-w-[1400px]"
               style={{ transform: `scale(${scale})` }}
            >
               <div
                  className="p-4 rounded mb-4 overflow-auto w-[595px] h-[842px] bg-white"
                  style={{ boxShadow: "25px 0px 20px -20px rgba(0,0,0,0.45)" }}
               >
                  <h3 className="text-xl font-bold">Part 3</h3>
                  <h4 className="text-lg font-semibold">Hajinの日記</h4>
                  <h5 className="text-sm text-gray-500">
                     Page {leftPageIndex + 1}
                  </h5>
                  <Page
                     content={pages[leftPageIndex].content}
                     textSize={textSize}
                     elementsRef={elements}
                     onLineClick={(index) =>
                        handleLineClick(index, leftPageIndex)
                     }
                     pageIndex={leftPageIndex}
                  />
               </div>
               <div className="border-l-2 border-gray-300"></div>
               {canGoToNextPage ? (
                  <div
                     className="p-4 rounded mb-4 overflow-auto w-[595px] h-[842px] bg-white"
                     style={{
                        boxShadow: "-25px 0px 20px -20px rgba(0,0,0,0.45)",
                     }}
                  >
                     <h5 className="text-sm text-gray-500">
                        Page {rightPageIndex + 1}
                     </h5>
                     <Page
                        content={pages[rightPageIndex].content}
                        textSize={textSize}
                        elementsRef={elements}
                        onLineClick={(index) =>
                           handleLineClick(index, rightPageIndex)
                        }
                        pageIndex={rightPageIndex}
                     />
                  </div>
               ) : (
                  <div className="w-[595px] h-[842px] bg-white"></div>
               )}
            </div>
         </div>
         <div className="w-full flex justify-center">
            <Controls
               isAudioEnabled={isAudioEnabled}
               toggleAudio={toggleAudio}
               toggleZoomControls={toggleZoomControls}
               isZoomControlsVisible={isZoomControlsVisible}
               increaseTextSize={increaseTextSize}
               decreaseTextSize={decreaseTextSize}
               takeScreenshot={takeScreenshot} 
            />
         </div>
         <button
            className={`left-0 top-1/2 transform -translate-y-1/2 p-1 bg-[#FF9248] text-black rounded-full border-2 border-blue-200 hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out ${
               !canGoToPreviousPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={goToPreviousPage}
            disabled={!canGoToPreviousPage}
         >
            <Icon icon="mdi:arrow-left" width={30} />
         </button>
         <button
            className={`right-0 top-1/2 transform -translate-y-1/2 p-1 bg-[#FF9248] text-black rounded-full border-2 border-blue-200 hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out ${
               !canGoToNextPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={goToNextPage}
            disabled={!canGoToNextPage}
         >
            <Icon icon="mdi:arrow-right" width={30} />
         </button>
      </div>
   );
};

export default Book;
