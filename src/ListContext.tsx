import React, { createContext, useEffect, useState } from "react";
import { deleteItemById, getAllItems, insertItem, updateItemById } from "./data/list";

const defaultList = [
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

async function initDefaultStorage(list: ListType[]) {
  let items: ListType[]  = [];
  for (let item of list) {
    items.push(await insertItem(item));
  }
  return items;
}

export type ListContextType = {
  lists: ListType[];
  selectedItem: ListType | undefined;
  itemId: number;
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<ListType | undefined>>;
  setItemId: React.Dispatch<React.SetStateAction<number>>;
  addNewItem: () => void;
  removeItemById: (listId: number) => void;
  updateItem: (id: number, title: string, details: string) => void;
  setCurrentItem: (id: number) => void;
};

const ListContext = createContext<ListContextType>({
  lists: [],
  selectedItem: undefined,
  itemId: 0,
  setLists: () => {},
  setSelectedItem: () => {},
  setItemId: () => {},
  addNewItem: () => {},
  removeItemById: () => {},
  updateItem: () => {},
  setCurrentItem: () => {},
});

export type ListType = {
  id: number;
  title: string;
  details: string;
};

const ListContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, setLists] = useState<ListType[]>([]);
  const [itemId, setItemId] = useState(1);
  const [selectedItem, setSelectedItem] = useState<ListType | undefined>(
    undefined
  );

  useEffect(() => {
    getAllItems().then((items) => {
      if (items.length === 0) {
        initDefaultStorage(defaultList).then((items) => {
          setLists(items);
          setSelectedItem(items[0]);
          setItemId(items[0].id);
        });
      } else {
        setLists(items);
        setSelectedItem(items[0]);
        setItemId(items[0].id);
      }
    });
  }, []);

  function addNewItem() {
    const newItem = {
      id: lists.length + 1,
      title: `List ${lists.length + 1}`,
      details: `<li>Contains items for list ${lists.length + 1}</li>`,
    };
    insertItem(newItem).then((item) => {
      setLists([...lists, item]);
      setItemId(item.id);
      setSelectedItem(item);
    });
  }

  function removeItemById(listId: number) {
    deleteItemById(listId).then(() => {
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
    });
  }

  function updateItem(id: number, title: string, details: string) {
    updateItemById(id, { id, title, details }). then(() => {
      setLists((lists) => {
        return lists.map((list) => {
          if (list.id === id) {
            return { ...list, title: title, details: details };
          }
          return list;
        });
      });
    });
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
        addNewItem,
        removeItemById,
        updateItem,
        setCurrentItem,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export { ListContext, ListContextProvider };
