import React, { useState, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import jsPDF from 'jspdf';
import './Home.css';
function Home() {
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawings, setDrawings] = useState({});
  const bookRef = useRef(null);
  const canvasRefs = useRef([]);

  const pages = [
    "Cover: Welcome to the book!",
    "Page 1: This is the first page of the book.",
    "Page 2: This is the second page of the book.",
    "Page 3: This is the third page of the book.",
    "Page 4: This is the fourth page of the book.",
    "Page 5: This is the fifth page of the book.",
  ];

  // Ensure canvasRefs are initialized for each page
  if (canvasRefs.current.length !== pages.length) {
    canvasRefs.current = Array(pages.length).fill().map((_, i) => canvasRefs.current[i] || React.createRef());
  }

  const nextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 2, pages.length - 1));
  };

  const prevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 2, 0));
  };

  const zoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2));
  };

  const zoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (bookRef.current.requestFullscreen) {
        bookRef.current.requestFullscreen();
      } else if (bookRef.current.mozRequestFullScreen) {
        bookRef.current.mozRequestFullScreen();
      } else if (bookRef.current.webkitRequestFullscreen) {
        bookRef.current.webkitRequestFullscreen();
      } else if (bookRef.current.msRequestFullscreen) {
        bookRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const toggleDrawing = () => {
    setIsDrawing(!isDrawing);
  };

  const saveDrawing = () => {
    const savedDrawing = canvasRefs.current[page].current.getSaveData();
    setDrawings((prevDrawings) => ({ ...prevDrawings, [page]: savedDrawing }));
    setIsDrawing(false);
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    pages.forEach((text, index) => {
      doc.text(text, 10, 10);
      if (drawings[index]) {
        const imgData = canvasRefs.current[index].current.canvas.drawing.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 20, 180, 160);
      }
      if (index < pages.length - 1) {
        doc.addPage();
      }
    });
    doc.save('book_with_notes.pdf');
  };

  return (
    <div className="App">
      <div ref={bookRef} className="book" style={{ transform: `scale(${zoom})` }}>
        {page === 0 ? (
          <div className="book-page single">
            {pages[page]}
            {drawings[page] && (
              <CanvasDraw
                disabled={!isDrawing}
                hideInterface
                immediateLoading
                saveData={drawings[page]}
                ref={canvasRefs.current[page]}
              />
            )}
            {!drawings[page] && isDrawing && <CanvasDraw ref={canvasRefs.current[page]} />}
          </div>
        ) : (
          <>
            <div className="book-page">
              {pages[page]}
              {drawings[page] && (
                <CanvasDraw
                  disabled={!isDrawing}
                  hideInterface
                  immediateLoading
                  saveData={drawings[page]}
                  ref={canvasRefs.current[page]}
                />
              )}
              {!drawings[page] && isDrawing && <CanvasDraw ref={canvasRefs.current[page]} />}
            </div>
            {page + 1 < pages.length && (
              <div className="book-page">
                {pages[page + 1]}
                {drawings[page + 1] && (
                  <CanvasDraw
                    disabled={!isDrawing}
                    hideInterface
                    immediateLoading
                    saveData={drawings[page + 1]}
                    ref={canvasRefs.current[page + 1]}
                  />
                )}
                {!drawings[page + 1] && isDrawing && <CanvasDraw ref={canvasRefs.current[page + 1]} />}
              </div>
            )}
          </>
        )}
      </div>
      <div className="buttons">
        <button onClick={prevPage} disabled={page === 0}>Previous</button>
        <button onClick={nextPage} disabled={page >= pages.length - 1}>Next</button>
      </div>
      <button onClick={toggleModal} className="accessibility-button">Accessibility</button>
      <button onClick={toggleFullscreen} className="fullscreen-button">
        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
      </button>
      <button onClick={toggleDrawing} className="note-button">Add Note</button>
      {isDrawing && <button onClick={saveDrawing} className="save-button">Save Note</button>}
      <button onClick={downloadAsPDF} className="download-button">Download as PDF</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={zoomIn}>Zoom In</button>
            <button onClick={zoomOut}>Zoom Out</button>
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
