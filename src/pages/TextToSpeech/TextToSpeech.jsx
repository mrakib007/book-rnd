import React, { useState, useEffect } from 'react';
import './TextToSpeech.css';

const TextToSpeech = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const elements = React.useRef([]);

  useEffect(() => {
    if (isAudioEnabled && elements.current.length > 0) {
      speakText(elements.current[currentIndex].textContent, elements.current[currentIndex]);
    }
  }, [isAudioEnabled, currentIndex]);

  const highlightText = (element) => {
    // Remove highlight from previously highlighted elements
    const highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(el => el.classList.remove('highlight'));

    // Add highlight to clicked element
    element.classList.add('highlight');
  };

  const speakText = (text, element) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.onstart = () => highlightText(element);
    speech.onend = () => {
      element.classList.remove('highlight');
      if (isAudioEnabled) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % elements.current.length);
      }
    };
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    window.speechSynthesis.speak(speech);
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
      speakText(elements.current[index].textContent, elements.current[index]);
    }
  };

  return (
    <div>
      <button onClick={toggleAudio}>
        {isAudioEnabled ? 'Disable Audio' : 'Enable Audio'}
      </button>
      <div>
        <p ref={el => elements.current[0] = el} onClick={() => handleLineClick(0)}>
          This is the first line. Click to hear this line.
        </p>
        <p ref={el => elements.current[1] = el} onClick={() => handleLineClick(1)}>
          This is the second line. Click to hear this line.
        </p>
        <p ref={el => elements.current[2] = el} onClick={() => handleLineClick(2)}>
          This is the third line. Click to hear this line.
        </p>
        <p ref={el => elements.current[3] = el} onClick={() => handleLineClick(3)}>
          This is the fourth line. Click to hear this line.
        </p>
        <span ref={el => elements.current[4] = el} onClick={() => handleLineClick(4)}>
          Click on this span to hear this text.
        </span>
      </div>
    </div>
  );
};

export default TextToSpeech;
