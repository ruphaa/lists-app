import "./index.css";
import { ListItem } from "../ListItem";
import { ListContext } from "../../ListContext";
import { useContext, useMemo } from "react";

export const ListContainer = () => {
  const {
    lists,
    setCurrentItem,
    itemId,
    filter,
  } = useContext(ListContext) || {};
  
  const filteredLists = useMemo(() => {
    return lists.filter((list) => filter === "archived" ? list.archived : !list.archived);
  }, [lists, filter]);

  return (
    <div className="list-container">
      {filteredLists.length === 0 ? (
        <p>No lists available</p>
      ) : (
        filteredLists.map((list, index) => (
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
