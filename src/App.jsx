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
    if (lists.length === 0) {
      setItemId(0);
      return;
    }
    const updatedLists = lists.filter((list) => list.id !== listId);
    setLists([...updatedLists]);
    if (updatedLists.length === 0) {
      setItemId(0);
    } else {
      setItemId(updatedLists[0].id);
    }
  }

  return (
    <div className="container">
      <aside className="side-panel">
        <ListContainer
          lists={lists}
          setCurrentItem={setItemId}
          onAddList={handleAddList}
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
          <ListDetails list={lists.find((list) => list.id === itemId)} />
        )}
      </div>
    </div>
  );
}

export default App;
