import { useEffect, useState } from "react";
import Controls from "./Controls";
import Page from "./Page";
import { pages } from "./pages";
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
   } = useSpeech(pages);

   const leftPageIndex = currentPage;
   const rightPageIndex = currentPage + 1;
   const canGoToNextPage = rightPageIndex < pages.length;
   const canGoToPreviousPage = leftPageIndex > 0;
   const [scale, setScale] = useState(1);
   const [isSinglePage, setIsSinglePage] = useState(window.innerWidth < 768);

   useEffect(() => {
      const handleResize = () => {
         const w = window.innerWidth;
         setIsSinglePage(w < 768);
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
      </div>
   );
};

export default Book;
