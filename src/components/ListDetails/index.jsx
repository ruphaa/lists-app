import { useEffect, useState } from "react";
import "./index.css";

export const ListDetails = ({ list, onUpdateListDetails }) => {
  const [title, setTitle] = useState(list.title); // only during first render
  const [details, setDetails] = useState(list.details);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTitle(list.title);
  }, [list.title]);

  useEffect(() => {
    setDetails(list.details);
  }, [list.details]);

  return (
    <div className="list-details">
      {/* Uncontrolled + Controlled + defaultValue */}
      {
        <>
          {isEditing ? (
            <>
              <textarea
                name="title"
                rows={4}
                cols={60}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <textarea
                name="details"
                rows={4}
                cols={60}
                value={details}
                onChange={(e) => {
                  setDetails(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  onUpdateListDetails(list.id, title, details);
                  setIsEditing(false);
                }}
              >
                Submit
              </button>
            </>
          ) : (
            <>
              <StaticDetails title={title} text={details} />
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </>
          )}
        </>
      }
    </div>
  );
};

const StaticDetails = ({ title, text }) => {
  return (
    <>
      <h2>{title}</h2>
      <p>{text}</p>
    </>
  );
};
