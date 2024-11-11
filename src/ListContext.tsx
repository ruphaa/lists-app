import React, { createContext, useEffect, useState } from "react";

export type ListContextType = {
  lists: ListType[];
  selectedItem: ListType | undefined;
  itemId: number;
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<ListType | undefined>>;
  setItemId: React.Dispatch<React.SetStateAction<number>>;
  handleAddList: () => void;
  handleRemoveList: (listId: number) => void;
  handleListDetailsChange: (id: number, title: string, details: string) => void;
  setCurrentItem: (id: number) => void;
};

const ListContext = createContext<ListContextType>({
  lists: [],
  selectedItem: undefined,
  itemId: 0,
  setLists: () => {},
  setSelectedItem: () => {},
  setItemId: () => {},
  handleAddList: () => {},
  handleRemoveList: () => {},
  handleListDetailsChange: () => {},
  setCurrentItem: () => {},
});

export type ListType = {
    id: number;
    title: string;
    details: string;
}

const ListContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [lists, setLists] = useState<ListType[]>(() => {
    const savedLists = localStorage.getItem("lists");
    return savedLists ? JSON.parse(savedLists) : [
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
    ];
  });
  const [itemId, setItemId] = useState(1);
  const [selectedItem, setSelectedItem] = useState<ListType | undefined>(lists[0]);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists))
  }, [lists]);

  useEffect(() => {
    if(lists.length > 0) {
      setSelectedItem(lists[0]);
      setItemId(lists[0].id);
    }
  }, []);

  function handleAddList() {
    const newList = {
      id: lists.length + 1,
      title: `List ${lists.length + 1}`,
      details: `<li>Contains items for list ${lists.length + 1}</li>`,
    };
    setLists([...lists, newList]);
    setItemId(newList.id);
  }

  function handleRemoveList(listId: number) {
    setLists((lists) => {
      const updatedLists = lists.filter((list) => list.id !== listId);
      if (updatedLists.length === 0) {
        setItemId(0);
        setSelectedItem(undefined);
      } else {
        setItemId(updatedLists[0].id);
        setSelectedItem(updatedLists[0]);
      }
      return updatedLists;
    });
  }

  function handleListDetailsChange(id: number, title: string, details: string) {
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

  function setCurrentItem(id: number) {
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
