import "./index.css";
import { ListItem } from "../ListItem";
import { ListContext, ListType } from "../../ListContext";
import { useContext } from "react";

export const ListContainer = ({ lists }: {lists: ListType[]}) => {
  const {
    setCurrentItem,
    itemId,
  } = useContext(ListContext) || {};
  return (
    <div className="list-container">
      <div className="flex">
        <h2 className="title">My Lists</h2>
      </div>
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
