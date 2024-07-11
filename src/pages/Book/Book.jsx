import { useEffect, useState } from "react";
import Controls from "./Controls";
import Page from "./Page";
import { pages } from "./pages";
import html2canvas from "html2canvas";
import useSpeech from "../../hooks/useSpeech";
import { Icon } from "@iconify/react";

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
      setCurrentPage,  // Add setCurrentPage to reset the page
   } = useSpeech(pages);

   // Determine the indices for the left and right pages
   const leftPageIndex = currentPage;
   const rightPageIndex = currentPage + 1;
   const canGoToNextPage = rightPageIndex < pages.length;
   const canGoToPreviousPage = leftPageIndex > 0;

   // State for scaling the book based on screen width
   const [scale, setScale] = useState(1);
   const [isSinglePage, setIsSinglePage] = useState(window.innerWidth < 768);

   useEffect(() => {
      const handleResize = () => {
         const w = window.innerWidth;
         setIsSinglePage(w < 768);
         if (w < 1300) {
            setScale(w / 1300); // Scale the book based on the window width
         } else {
            setScale(1); // Reset scale for larger screens
         }
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   // Function to take a screenshot of the book
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

   // Function to reload the book to the first page
   const reloadPage = () => {
      setCurrentPage(0);  // Reset the current page to the first page
   };

   return (
      <div className="h-screen overflow-hidden flex flex-col items-center bg-gray-100">
         <div className="flex flex-1 items-start justify-center w-full relative">
            <div
               className="page-container flex"
               style={{ transform: `scale(${scale})` }}
            >
               <div
                  className="p-4 rounded mb-4 overflow-auto w-[610px] h-[842px] bg-white shadow-lg"
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
               {!isSinglePage && (
                  <>
                     <div className="border-l-2 border-gray-300"></div>
                     {canGoToNextPage ? (
                        <div
                           className="p-4 rounded mb-4 overflow-auto w-[610px] h-[842px] bg-white shadow-lg"
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
                        <div className="w-[610px] h-[842px] bg-white"></div>
                     )}
                  </>
               )}
            </div>
            {/* Navigation buttons for previous and next pages */}
            <button
               className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-1 bg-[#FF9248] text-black rounded-full border-2 border-blue-200 hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out ${
                  !canGoToPreviousPage ? "opacity-50 cursor-not-allowed" : ""
               }`}
               onClick={goToPreviousPage}
               disabled={!canGoToPreviousPage}
            >
               <Icon icon="mdi:arrow-left" width={30} />
            </button>
            <button
               className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-1 bg-[#FF9248] text-black rounded-full border-2 border-blue-200 hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out ${
                  !canGoToNextPage ? "opacity-50 cursor-not-allowed" : ""
               }`}
               onClick={goToNextPage}
               disabled={!canGoToNextPage}
            >
               <Icon icon="mdi:arrow-right" width={30} />
            </button>
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
               reloadPage={reloadPage}  // Pass the reloadPage function to Controls
            />
         </div>
      </div>
   );
};

export default Book;
