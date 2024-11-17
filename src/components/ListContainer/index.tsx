import "./index.css";
import { ListItem } from "../ListItem";
import { ListContext } from "../../ListContext";
import { useContext } from "react";

export const ListContainer = () => {
  const {
    lists,
    setCurrentItem,
    itemId,
  } = useContext(ListContext) || {};
  return (
    <div className="list-container">
      {lists.length === 0 ? (
        <p>No lists available</p>
      ) : (
        lists.map((list, index) => (
          <ListItem
            key={index}
            id={list.id}
            title={list.title}
            setCurrentItem={setCurrentItem}
            selectedItemId={itemId}
          />
        ))
      )}
    </div>
  );
};
