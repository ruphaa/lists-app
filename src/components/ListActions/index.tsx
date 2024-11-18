import "./index.css";
import { ListContext } from "../../ListContext";
import { useContext } from "react";
import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import "./index.css";
import {
  ArchiveIcon,
  Pencil2Icon,
  TrashIcon,
  UploadIcon,
} from "@radix-ui/react-icons";

export const ListActions = () => {
  const { itemId, selectedItem, archiveItem, addNewItem, removeItemById, unArchiveItem } =
    useContext(ListContext) || {};
  return (
    <Flex gap="4" justify="end" align="center" p="4">
      <Tooltip content="Create a note">
        <IconButton onClick={addNewItem} size="2">
          <Pencil2Icon />
        </IconButton>
      </Tooltip>
      <Tooltip content="Delete a note">
        <IconButton onClick={() => removeItemById(itemId)} size="2">
          <TrashIcon />
        </IconButton>
      </Tooltip>
      {selectedItem && selectedItem.archived ? (
        <Tooltip content="Unarchive">
          <IconButton onClick={() => unArchiveItem(itemId)} size="2">
            <UploadIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip content="Archive">
          <IconButton onClick={() => archiveItem(itemId)} size="2">
            <ArchiveIcon />
          </IconButton>
        </Tooltip>
      )}
    </Flex>
  );
};
