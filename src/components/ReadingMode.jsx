import React from "react";
import { useGlobalContext } from "../Context";
import "./styles/ReadingMode.css";

const ReadingMode = ({ children }) => {
  const { readingMode, fontSize, setFontSize } = useGlobalContext();

  return (
    <div className={`reading-mode-container ${readingMode ? "active" : ""}`}>
      <div className="toolbar">
        {
          readingMode === true &&
          <div className="font-controls">
            <button onClick={() => setFontSize(fontSize - 2)} disabled={fontSize <= 12}>
              A-
            </button>
            <span
              style={{
                fontSize: `${fontSize}px`,
              }}
            >{fontSize}px</span>
            <button onClick={() => setFontSize(fontSize + 2)} disabled={fontSize >= 24}>
              A+
            </button>
          </div>
        }
      </div>

      <div className="reading-content" style={{ fontSize: `${fontSize}px` }}>
        {children}
      </div>
    </div>
  );
};

export default ReadingMode;
