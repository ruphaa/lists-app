import React, { useRef, useEffect } from "react";
import "./index.css";

export const BulletListNote = ({ details, setDetails }) => {
  const editorRef = useRef(null);
  // Initializes editor with an empty bullet point if it’s empty
  const initializeEditor = () => {
    if (!editorRef.current.innerHTML.trim()) {
      if(details !== null) {
        editorRef.current.innerHTML = details;
      } else {
        editorRef.current.innerHTML = "<li>&nbsp;</li>";
      }
    }
  };
  useEffect(() => {
    initializeEditor();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItem = document.createElement('li');
      newItem.innerHTML = '&nbsp;';
      editorRef.current.appendChild(newItem);
      // Move caret to new line
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(newItem, 0);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const handleInput = (e) => {
    const childNodes = [...editorRef.current.childNodes];
    childNodes.forEach((child) => {
      if (!child.textContent.trim()) {
        child.remove();
      }
    });

    // Update the editor's state
    setDetails(editorRef.current.innerHTML);

    // Reinitialize if the editor is empty
    initializeEditor();
  };

  return (
    <ul
      ref={editorRef}
      contentEditable="true"
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      style={{
        padding: "10px 12px",
        minHeight: "100%",
        height: "100vh",
        outline: "none",
        fontSize: "1.2rem",
      }}
    >
    </ul>
  );
};
