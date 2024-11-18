import { useEffect, useState } from "react";
import "./index.css";
import { BulletListNote } from "../BulletListNote/index";
import { ListType } from "../../ListContext";
import { Box, Button, Heading } from "@radix-ui/themes";

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
                <Heading mb="2" size="4">
                  <input
                    className="title-input"
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </Heading>
                <Button
                  onClick={() => {
                    onUpdateListDetails(list.id, title, details);
                    setIsEditing(false);
                  }}
                >
                  <Box p="4" display="block">
                    Submit
                  </Box>
                </Button>
              </div>
              <BulletListNote details={details} setDetails={setDetails} />
            </>
          ) : (
            <>
              <div className="details-header">
                <h1 className="title-input">{title}</h1>
                <Button onClick={() => setIsEditing(true)}>
                  <Box p="4" display="block">
                    Edit
                  </Box>
                </Button>
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
