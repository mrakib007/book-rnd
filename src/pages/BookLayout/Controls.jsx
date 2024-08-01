import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PanelButton from "../../components/PanelButton";

const Controls = () => {
   const navigate = useNavigate();

   const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 800);
      };

      window.addEventListener("resize", handleResize);

      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   return (
      <div className="flex flex-wrap justify-center items-center w-full">
         <PanelButton
            isMobile={isMobile}
            icon="mdi:camera"
            text={isMobile ? "" : "Screenshot"}
         />
         <PanelButton
            isMobile={isMobile}
            icon="material-symbols-light:folder"
            text={isMobile ? "" : "Gallery"}
         />
         <PanelButton
            isMobile={isMobile}
            icon="material-symbols-light:home-outline"
            text={isMobile ? "" : "Home"}
            onClick={() => navigate("/")}
         />
         <PanelButton
            isMobile={isMobile}
            icon="ooui:arrow-previous-ltr"
            text={isMobile ? "" : "Previous"}
         />
         <PanelButton
            isMobile={isMobile}
            icon="mdi:volume-high"
            text={isMobile ? "" : "Listen"}
         />
         <PanelButton
            isMobile={isMobile}
            icon="teenyicons:pdf-outline"
            text={isMobile ? "" : "PDF"}
         />
         <PanelButton
            isMobile={isMobile}
            icon="mdi:reload"
            text={isMobile ? "" : "Reload"}
         />
         <PanelButton
            isMobile={isMobile}
            icon="mdi:fullscreen"
            text={isMobile ? "" : "Fullscreen"}
         />
      </div>
   );
};

export default Controls;
