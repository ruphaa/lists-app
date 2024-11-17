import "./index.css";
import { ListContext } from "../../ListContext";
import { useContext } from "react";
import { Button, IconButton } from "@radix-ui/themes";
import "./index.css";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

export const ListActions = () => {
  const { itemId, addNewItem, removeItemById } = useContext(ListContext) || {};
  return (
    <>
      <IconButton onClick={addNewItem}>
        <Pencil2Icon />
      </IconButton>
      <IconButton onClick={() => removeItemById(itemId)}>
        <TrashIcon />
      </IconButton>
    </>
  );
};
