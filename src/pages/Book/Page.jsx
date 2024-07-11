import React, { useEffect } from "react";

const Page = ({
   content,
   textSize,
   elementsRef,
   handleLineClick,
   pageIndex,
}) => {
   useEffect(() => {
      // Parsing the HTML content to find all clickable elements
      const container = document.createElement("div");
      container.innerHTML = content;
      const clickableElements = container.querySelectorAll("p, span");

      elementsRef.current = Array.from(clickableElements);
   }, [content, elementsRef]);

   return (
      <div
         className={`text ${textSize}`}
         dangerouslySetInnerHTML={{ __html: content }}
         onClick={(e) => {
            const clickedElement = e.target;
            const index = elementsRef.current.indexOf(clickedElement);
            if (index !== -1) {
               handleLineClick(index, pageIndex);
            }
         }}
      />
   );
};

export default Page;
