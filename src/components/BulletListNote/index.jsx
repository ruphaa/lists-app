import { useState } from "react";
import "./index.css";

export const BulletListNote = ({ list }) => {
  const { notes, setNotes } = useState([]);
  return (
    <div className="bullet-list">
      <h2>Title</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};
