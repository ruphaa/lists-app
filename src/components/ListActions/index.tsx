import "./index.css";
import { ListContext } from "../../ListContext";
import { useContext } from "react";
import { Button } from "@radix-ui/themes";
import "./index.css";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

export const ListActions = () => {
  const { itemId, addNewItem, removeItemById } = useContext(ListContext) || {};
  return (
    <>
      <Button onClick={addNewItem}>
        <Pencil2Icon />
      </Button>
      <Button onClick={() => removeItemById(itemId)}>
        <TrashIcon />
      </Button>
    </>
  );
};
