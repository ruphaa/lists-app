import "./index.css";
import { ListItem } from "../ListItem";

export const ListContainer = ({ lists, setCurrentItem, selectedItemId }) => {
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
            selectedItemId={selectedItemId}
          />
        ))
      )}
    </div>
  );
};
