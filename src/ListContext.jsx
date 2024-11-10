import React, { createContext, useState, useEffect } from "react";

const ListContext = createContext();

const ListContextProvider = ({ children }) => {
  const [lists, setLists] = useState([
    {
      id: 1,
      title: "Best books 2024",
      details: "<li>Contains the best books to read in 2024</li>",
    },
    {
      id: 2,
      title: "Quick app ideas",
      details: "<li>Contains quick app ideas to work on</li>",
    },
    {
      id: 3,
      title: "Blog ideas",
      details: "<li>Contains blog ideas to write about</li>",
    },
    {
      id: 4,
      title: "Podcasts to follow",
      details: "<li>Contains podcasts to follow</li>",
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
      const updatedLists = lists.filter((list) => list.id !== listId);
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
    <ListContext.Provider
      value={{
        lists,
        selectedItem,
        itemId,
        setLists,
        setSelectedItem,
        setItemId,
        handleAddList,
        handleRemoveList,
        handleListDetailsChange,
        setCurrentItem,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export { ListContext, ListContextProvider };
