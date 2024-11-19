import { useEffect, useState } from "react";
import "./index.css";
import { BulletListNote } from "../BulletListNote/index";
import { ListType } from "../../ListContext";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";

export const ListDetails = ({
  list,
  onUpdateListDetails,
}: {
  list: ListType;
  onUpdateListDetails: (id: number, listProps: Partial<ListType>) => void;
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
      <Flex className="details-header" justify="between" align="start">
        <Box>
          <Heading mb="2" size="4">
            {isEditing ? (
              <input
                className="title-input"
                name="title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            ) : (
              title
            )}
          </Heading>
          {!isEditing && <Text>{list.updatedAt}</Text>}
        </Box>
        {isEditing ? (
          <Button
            onClick={() => {
              onUpdateListDetails(list.id, { title, details, updatedAt: new Date().toISOString() });
              setIsEditing(false);
            }}
          >
            <Box p="4" display="block">
              Submit
            </Box>
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            <Box p="4" display="block">
              Edit
            </Box>
          </Button>
        )}
      </Flex>
      {isEditing ? (
        <BulletListNote details={details} setDetails={setDetails} />
      ) : (
        <ul
          className="details-list"
          dangerouslySetInnerHTML={{ __html: details }}
        />
      )}
    </div>
  );
};
