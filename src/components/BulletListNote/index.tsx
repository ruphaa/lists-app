import { useRef, useEffect } from "react";
import "./index.css";

type BulletListNoteProps = {
  details: string | null;
  setDetails: (details: string) => void;
}

export const BulletListNote = ({ details, setDetails }: BulletListNoteProps) => {
  const editorRef = useRef<HTMLUListElement>(null);
  // Initializes editor with an empty bullet point if it’s empty
  const initializeEditor = () => {
    if (editorRef.current) {
      const editor = editorRef.current;
      if (!editor.innerHTML.trim()) {
        if(details !== null) {
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
      const newItem = document.createElement('li');
      newItem.innerHTML = '&nbsp;';
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
  };

  interface HandleInputEvent extends React.FormEvent<HTMLUListElement> {}

  const handleInput = (e: HandleInputEvent) => {
    const childNodes = [...editorRef.current!.childNodes];
    childNodes.forEach((child) => {
      if (!child.textContent?.trim()) {
        child.remove();
      }
    });

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
    >
    </ul>
  );
};
