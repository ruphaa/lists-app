import { useEffect, useState } from "react";
import "./index.css";
import { BulletListNote } from "../BulletListNote/index";
import { ListType } from "../../ListContext";

export const ListDetails = ({
  list,
  onUpdateListDetails,
}: {
  list: ListType;
  onUpdateListDetails: (id: number, title: string, details: string) => void;
}) => {
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
              <div className="details-header">
                <h1 className="title">
                  <input
                    className="title-input"
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </h1>
                <button
                  onClick={() => {
                    onUpdateListDetails(list.id, title, details);
                    setIsEditing(false);
                  }}
                >
                  Submit
                </button>
              </div>
              <BulletListNote details={details} setDetails={setDetails} />
            </>
          ) : (
            <>
              <div className="details-header">
                <h1 className="title-input">{title}</h1>
                <button onClick={() => setIsEditing(true)}>Edit</button>
              </div>
              <ul
                className="details-list"
                dangerouslySetInnerHTML={{ __html: details }}
              />
            </>
          )}
        </>
      }
    </div>
  );
};
