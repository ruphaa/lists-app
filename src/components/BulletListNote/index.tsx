import { useRef, useEffect } from "react";
import "./index.css";

type BulletListNoteProps = {
  details: string | null;
  setDetails: (details: string) => void;
};

export const BulletListNote = ({
  details,
  setDetails,
}: BulletListNoteProps) => {
  const editorRef = useRef<HTMLUListElement>(null);
  // Initializes editor with an empty bullet point if it’s empty
  const initializeEditor = () => {
    if (editorRef.current) {
      const editor = editorRef.current;
      if (!editor.innerHTML.trim()) {
        if (details !== null) {
          if(details === "<br>" ) {
            console.log("details is empty");
            details = "<li>&nbsp;</li>";
          }
          editor.innerHTML = details;
        } else {
          editor.innerHTML = "<li>&nbsp;</li>";
        }
      }
    }
  };
  useEffect(() => {
    initializeEditor();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItem = document.createElement("li");
      newItem.innerHTML = "&nbsp;";
      editorRef?.current?.appendChild(newItem);
      // Move caret to new line
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(newItem, 0);
      range.collapse(true);
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
    if (e.key === "Backspace") {
      const editor = editorRef.current!;
      const childNodes = [...editor.childNodes];
      const lastNode = childNodes[childNodes.length - 1];
      if (childNodes.length > 1 && lastNode.textContent === "") {
        lastNode.remove();
      }
    }
  };

  const handleInput = (e: React.FormEvent<HTMLUListElement>) => {
    const editor = editorRef.current!;
    const childNodes = [...editor.childNodes];
    childNodes.forEach((child, index) => {
      if (!child.textContent?.trim() && index < childNodes.length - 1) {
        child.remove();
      }
    });
    
    // If all content is deleted, reinitialize with a single bullet point
    if (!editor.innerHTML.trim()) {
      editor.innerHTML = "<li>&nbsp;</li>";
    }

    // Update the editor's state
    setDetails(editorRef.current!.innerHTML);

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
    ></ul>
  );
};
