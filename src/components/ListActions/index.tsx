import "./index.css";
import { ListContext } from "../../ListContext";
import { useContext } from "react";
import "./index.css";

export const ListActions = () => {
  const { itemId, handleAddList, handleRemoveList } =
    useContext(ListContext) || {};
  return (
    <>
      <button className="button" onClick={handleAddList}>
        +
      </button>
      <button className="button" onClick={() => handleRemoveList(itemId)}>
        -
      </button>
    </>
  );
};
