import React, { useState, useEffect } from "react";
import "./TextToSpeech.css";

const TextToSpeech = () => {
   const [isAudioEnabled, setIsAudioEnabled] = useState(false);
   const [currentIndex, setCurrentIndex] = useState(0);
   const elements = React.useRef([]);
   const voices = React.useRef([]);

   useEffect(() => {
      // Load available voices
      voices.current = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
         voices.current = window.speechSynthesis.getVoices();
      };
   }, []);

   useEffect(() => {
      if (isAudioEnabled && elements.current.length > 0) {
         speakText(
            elements.current[currentIndex].textContent,
            elements.current[currentIndex]
         );
      }
   }, [isAudioEnabled, currentIndex]);

   const highlightText = (element) => {
      const highlightedElements = document.querySelectorAll(".highlight");
      highlightedElements.forEach((el) => el.classList.remove("highlight"));
      element.classList.add("highlight");
   };

   const speakText = (text, element) => {
      const speech = new SpeechSynthesisUtterance(text);
      speech.voice = getVoiceForText(text);
      speech.onstart = () => highlightText(element);
      speech.onend = () => {
         element.classList.remove("highlight");
         if (isAudioEnabled) {
            setCurrentIndex(
               (prevIndex) => (prevIndex + 1) % elements.current.length
            );
         }
      };
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
   };

   const getVoiceForText = (text) => {
      const isJapanese = /[\u3040-\u30FF\u31F0-\u31FF\uFF00-\uFFEF]/.test(text);
      return (
         voices.current.find((voice) =>
            voice.lang.startsWith(isJapanese ? "ja" : "en")
         ) || null
      );
   };

   const toggleAudio = () => {
      setIsAudioEnabled(!isAudioEnabled);
      if (!isAudioEnabled) {
         setCurrentIndex(0);
      }
   };

   const handleLineClick = (index) => {
      setCurrentIndex(index);
      if (isAudioEnabled) {
         speakText(
            elements.current[index].textContent,
            elements.current[index]
         );
      }
   };

   return (
      <div>
         <button onClick={toggleAudio}>
            {isAudioEnabled ? "Disable Audio" : "Enable Audio"}
         </button>
         <div>
            <p
               ref={(el) => (elements.current[0] = el)}
               onClick={() => handleLineClick(0)}
            >
               This is the first line. Click to hear this line.
            </p>
            <p
               ref={(el) => (elements.current[1] = el)}
               onClick={() => handleLineClick(1)}
            >
               これは2行目です。クリックしてこの行を聞いてください。
            </p>
            <p
               ref={(el) => (elements.current[2] = el)}
               onClick={() => handleLineClick(2)}
            >
               This is the third line. Click to hear this line.
            </p>
            <span
               ref={(el) => (elements.current[3] = el)}
               onClick={() => handleLineClick(3)}
            >
               これは4行目です。クリックしてこの行を聞いてください。 
            </span>
            <span
               ref={(el) => (elements.current[4] = el)}
               onClick={() => handleLineClick(4)}
            >
               Click on this span to hear this text.
            </span>
         </div>
      </div>
   );
};

export default TextToSpeech;
