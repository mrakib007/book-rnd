import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import cursor from "./cursor.svg";

const Accessibility = () => {
   const [isDivVisible, setDivVisibility] = useState(false);
   const selectedButton = localStorage.getItem("selectedButton");
   const [fontSize, setFontSize] = useState(16);

   const invertColor = () => {
      document.documentElement.style.filter = "invert(100%)";
   };
   const monochrome = () => {
      document.documentElement.style.filter = "grayscale(100%)";
   };
   const highlightLinks = () => {
      const links = document.querySelectorAll("a");
      links.forEach((link) => {
         link.style.color = "tomato";
         link.style.backgroundColor = "#cde400";
      });
   };

   const showHeadings = () => {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      headings.forEach((heading) => {
         heading.style.backgroundColor = "#cde400";
      });
   };
   const bigCursor = () => {
      document.documentElement.style.cursor = `url(${cursor}), auto`;
   };
   const decreaseText = () => {
      const paragraphElement = document.querySelector("*");
      paragraphElement.style.fontSize = `${fontSize - 1}px`;
   };
   const increaseText = () => {
      const paragraphElement = document.querySelector("*");
      paragraphElement.style.fontSize = `${fontSize + 1}px`;
   };
   const normalText = () => {
      const paragraphElement = document.querySelector("*");
      paragraphElement.style.fontSize = `16px`;
   };
   const resetChanges = () => {
      document.documentElement.style.filter = "";
      const links = document.querySelectorAll("a");
      links.forEach((link) => {
         link.style.color = "";
         link.style.backgroundColor = "inherit";
      });
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      headings.forEach((heading) => {
         heading.style.backgroundColor = "";
      });
      document.documentElement.style.cursor = "auto";
      const paragraphElement = document.querySelector("*");
      paragraphElement.style.fontSize = `16px`;
   };
   const buttons = [
      {
         key: "increaseText",
         text: "Increase Text",
         icon: "material-symbols:text-increase",
         action: increaseText,
      },
      {
         key: "normalText",
         text: "Format Text",
         icon: "material-symbols:text-format",
         action: normalText,
      },
      {
         key: "decreaseText",
         text: "Decrease Text",
         icon: "material-symbols:text-decrease",
         action: decreaseText,
      },
      {
         key: "monochrome",
         text: "Monochrome",
         icon: "material-symbols:accessibility",
         action: monochrome,
      },
      {
         key: "bigCursor",
         text: "Big Cursor",
         icon: "ph:cursor",
         action: bigCursor,
      },
      {
         key: "invertColor",
         text: "Invert Color",
         icon: "mdi:invert-colors",
         action: invertColor,
      },
      {
         key: "highlightLink",
         text: "Highlight Links",
         icon: "mdi:insert-link",
         action: highlightLinks,
      },
      {
         key: "showHeadings",
         text: "Show Headings",
         icon: "bx:heading",
         action: showHeadings,
      },
      {
         key: "reset",
         text: "Reset",
         icon: "mdi:restore",
         action: resetChanges,
      },
   ];

   const handleButtonClick = () => {
      setDivVisibility(!isDivVisible);
   };

   const handleClickAway = (event) => {
      if (
         isDivVisible &&
         containerRef.current &&
         !containerRef.current.contains(event.target)
      ) {
         setDivVisibility(false);
      }
   };

   useEffect(() => {
      document.addEventListener("click", handleClickAway);

      return () => {
         document.removeEventListener("click", handleClickAway);
      };
   }, [isDivVisible]);

   const containerRef = useRef(null);

   useEffect(() => {
      if (selectedButton) {
         const selectedAction = buttons.find(
            (button) => button.key === selectedButton
         );
         if (selectedAction) {
            selectedAction.action();
         }
      }
   }, [selectedButton]);

   return (
      <div ref={containerRef} className="relative ml-2">
         <button
            onClick={handleButtonClick}
            className="h-[56px] bg-[#FF9248] rounded-lg border-2 border-white text-[#2E2929] hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out"
         >
            <div className="flex flex-col items-center justify-center p-1">
               <Icon icon="material-symbols-light:accessibility" width={25} />
               <p className="text-sm">Accessibility</p>
            </div>
         </button>

         {isDivVisible && (
            <div className="absolute bottom-12 left-0 flex flex-col space-y-2 bg-gray-600 p-2 rounded-md mb-2">
               {buttons.map((button) => (
                  <button
                     key={button.key}
                     className="p-2 bg-zinc-900 text-white rounded-md"
                     onClick={() => {
                        localStorage.setItem("selectedButton", button.key);
                        button.action();
                        // setDivVisibility(false);
                     }}
                  >
                     <Icon icon={button.icon} className="h-6 w-6" />
                  </button>
               ))}
            </div>
         )}
      </div>
   );
};

export default Accessibility;
