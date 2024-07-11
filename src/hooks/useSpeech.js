import { useState, useEffect, useRef } from 'react';

const useSpeech = (pages) => {
    const [isAudioEnabled, setIsAudioEnabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [textSize, setTextSize] = useState('text-base');
    const [isZoomControlsVisible, setIsZoomControlsVisible] = useState(false);
    const elements = useRef([]);
    const voices = useRef([]);
    const speechRef = useRef(null);

    useEffect(() => {
        const updateVoices = () => {
            voices.current = window.speechSynthesis.getVoices();
            console.log('Available voices:', voices.current);
        };
        updateVoices();
        window.speechSynthesis.onvoiceschanged = updateVoices;
    }, []);

    useEffect(() => {
        if (isAudioEnabled) {
            speakPageText(currentPage);
        } else {
            window.speechSynthesis.cancel();
        }
    }, [isAudioEnabled, currentPage]);

    const highlightText = (index) => {
        elements.current.forEach((el) => el?.classList.remove('bg-yellow-200'));
        if (elements.current[index]) {
            elements.current[index].classList.add('bg-yellow-200');
        }
    };

    const stripHTML = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    };

    const getVoiceForText = (text) => {
        const isJapanese = /[\u3040-\u30FF\u31F0-\u31FF\uFF00-\uFFEF]/.test(text);
        const preferredLang = isJapanese ? 'ja' : 'en';
        console.log(`Text: "${text}"`);
        console.log(`Is Japanese: ${isJapanese}`);

        let voice = voices.current.find((voice) => voice.lang.startsWith(preferredLang));
        if (!voice) {
            console.warn(`No voice found for ${preferredLang}. Falling back to English.`);
            voice = voices.current.find((voice) => voice.lang.startsWith('en')) || voices.current[0];
        }

        if (!voice) {
            console.error('No voices available!');
            return null;
        }

        console.log(`Using ${preferredLang} voice:`, voice);
        return voice;
    };

    const speakLine = (text, index) => {
        const strippedText = stripHTML(text);
        const voice = getVoiceForText(strippedText);

        if (!voice) {
            console.error('No suitable voice found for text:', strippedText);
            return;
        }

        const speech = new SpeechSynthesisUtterance(strippedText);
        speech.voice = voice;
        speech.lang = voice.lang;

        speech.onstart = () => {
            highlightText(index);
        };

        speech.onend = () => {
            if (isAudioEnabled && index + 1 < elements.current.length) {
                speakLine(elements.current[index + 1].innerText, index + 1);
            } else if (isAudioEnabled && currentPage + 1 < pages.length) {
                speakPageText(currentPage + 1);
            }
        };

        window.speechSynthesis.cancel();
        speechRef.current = speech;
        window.speechSynthesis.speak(speech);
    };

    const speakPageText = (pageIndex) => {
        const pagesToSpeak = [pages[pageIndex].content];

        // If there's a right page, add its content to the pagesToSpeak array
        if (pageIndex + 1 < pages.length) {
            pagesToSpeak.push(pages[pageIndex + 1].content);
        }

        // Flatten the content from both pages into a single text string
        const allLines = pagesToSpeak.flatMap(content => content.split(/\n+/));
        elements.current = allLines.map(line => {
            const div = document.createElement('div');
            div.innerHTML = line;
            return div;
        });

        if (allLines.length > 0) {
            speakLine(allLines[0], 0);
        }
    };

    const toggleAudio = () => {
        setIsAudioEnabled((prev) => {
            if (prev) {
                window.speechSynthesis.cancel();
            }
            return !prev;
        });
    };

    const handleLineClick = (index) => {
        if (isAudioEnabled) {
            speakLine(elements.current[index].innerText, index);
        }
    };

    const increaseTextSize = () => {
        setTextSize((prevSize) => {
            switch (prevSize) {
                case 'text-sm': return 'text-base';
                case 'text-base': return 'text-lg';
                case 'text-lg': return 'text-xl';
                case 'text-xl': return 'text-2xl';
                case 'text-2xl': return 'text-3xl';
                case 'text-3xl': return 'text-4xl';
                case 'text-4xl': return 'text-5xl';
                default: return prevSize;
            }
        });
    };

    const decreaseTextSize = () => {
        setTextSize((prevSize) => {
            switch (prevSize) {
                case 'text-5xl': return 'text-4xl';
                case 'text-4xl': return 'text-3xl';
                case 'text-3xl': return 'text-2xl';
                case 'text-2xl': return 'text-xl';
                case 'text-xl': return 'text-lg';
                case 'text-lg': return 'text-base';
                case 'text-base': return 'text-sm';
                default: return prevSize;
            }
        });
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => (prevPage - 2 + pages.length) % pages.length);
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => (prevPage + 2) % pages.length);
    };

    const toggleZoomControls = () => {
        setIsZoomControlsVisible((prev) => !prev);
    };

    return {
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
        setCurrentPage,
        isZoomControlsVisible,
        toggleZoomControls,
    };
};

export default useSpeech;

