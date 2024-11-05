import { useState } from "react";
import "./App.css";
import { ListContainer } from "./components/ListContainer";
import { ListDetails } from "./components/ListDetails";

function App() {
  const [lists, setLists] = useState([
    {
      id: 1,
      title: "Best books 2024",
      details: "Contains the best books to read in 2024",
    },
    {
      id: 2,
      title: "Quick app ideas",
      details: "Contains quick app ideas to work on",
    },
    {
      id: 3,
      title: "Blog ideas",
      details: "Contains blog ideas to write about",
    },
    {
      id: 4,
      title: "Podcasts to follow",
      details: "Contains podcasts to follow",
    },
  ]);
  const [itemId, setItemId] = useState(1);
  const [selectedItem, setSelectedItem] = useState(lists[0]);

  function handleAddList() {
    const newList = {
      id: lists.length + 1,
      title: `List ${lists.length + 1}`,
      details: `Contains items for list ${lists.length + 1}`,
    };
    setLists([...lists, newList]);
    setItemId(newList.id);
  }

  function handleRemoveList(listId) {
    setLists((lists) => {
      const updatedLists = lists.filter(list => list.id !== listId);
      if (updatedLists.length === 0) {
        setItemId(0);
        setSelectedItem(null);
      } else {
        setItemId(updatedLists[0].id);
        setSelectedItem(updatedLists[0]);
      }
      return updatedLists;
    });
  }

  function handleListDetailsChange(id, title, details) {
    setLists((lists) => {
      return lists.map((list) => {
        if (list.id === id) {
          return { ...list, title: title, details: details };
        }
        return list;
      });
    });
    setItemId(id);
  }

  function setCurrentItem(id) {
    const selectedItem = lists.find((list) => list.id === id);
    setSelectedItem(selectedItem);
    setItemId(id);
  }

  return (
    <div className="container">
      <aside className="side-panel">
        <ListContainer
          lists={lists}
          selectedItemId={itemId}
          setCurrentItem={setCurrentItem}
        />
      </aside>
      <div className="header">
        <button className="button" onClick={handleAddList}>
          +
        </button>
        <button className="button" onClick={() => handleRemoveList(itemId)}>
          -
        </button>
      </div>
      <div className="main">
        {lists.length === 0 ? (
          <p>No lists available</p>
        ) : (
          <ListDetails
            list={selectedItem}
            onUpdateListDetails={(id, title, details) => handleListDetailsChange(id, title, details)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
