import React, { createContext, useEffect, useState } from "react";
import { archiveItemById, deleteItemById, getAllItems, insertItem, updateItemById, unArchiveItemById } from "./data/list";

const defaultList = [
  {
    id: 1,
    title: "Best books 2024",
    details: "<li>Contains the best books to read in 2024</li>",
    archived: false,
  },
  {
    id: 2,
    title: "Quick app ideas",
    details: "<li>Contains quick app ideas to work on</li>",
    archived: true,
  },
  {
    id: 3,
    title: "Blog ideas",
    details: "<li>Contains blog ideas to write about</li>",
    archived: false,
  },
  {
    id: 4,
    title: "Podcasts to follow",
    details: "<li>Contains podcasts to follow</li>",
    archived: false,
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
  filter: "all" | "archived";
  archiveItem: (id: number) => void;
  unArchiveItem: (id: number) => void;
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<ListType | undefined>>;
  setItemId: React.Dispatch<React.SetStateAction<number>>;
  setFilter: React.Dispatch<React.SetStateAction<"all" | "archived">>;
  addNewItem: () => void;
  removeItemById: (listId: number) => void;
  updateItem: (id: number, title: string, details: string) => void;
  setCurrentItem: (id: number) => void;
  getFilteredLists: (filter: string) => ListType[];
};

const ListContext = createContext<ListContextType>({
  lists: [],
  selectedItem: undefined,
  itemId: 0,
  filter: "all",
  archiveItem: () => {},
  unArchiveItem: () => {},
  setLists: () => {},
  setSelectedItem: () => {},
  setItemId: () => {},
  setFilter: () => {},
  addNewItem: () => {},
  removeItemById: () => {},
  updateItem: () => {},
  setCurrentItem: () => {},
  getFilteredLists: () => [],
});

export type ListType = {
  id: number;
  title: string;
  details: string;
  archived?: boolean;
};

const ListContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, setLists] = useState<ListType[]>([]);
  const [itemId, setItemId] = useState(1);
  const [selectedItem, setSelectedItem] = useState<ListType | undefined>(
    undefined
  );
  const [filter, setFilter] = useState<"all" | "archived">("all");

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

  function archiveItem(id: number) {
    archiveItemById(id).then(() => {
      setLists((lists) => {
        return lists.map((list) => {
          if (list.id === id) {
            return { ...list, archived: true };
          }
          return list;
        });
      });
    });
  }

  function unArchiveItem(id: number) {
    unArchiveItemById(id).then(() => {
      console.log(id);
      setLists((lists) => {
        console.log(lists);
        return lists.map((list) => {
          if (list.id === id) {
            return { ...list, archived: false };
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

  function getFilteredLists() {
    const filteredLists = lists.filter((list) => filter === "archived" ? list.archived : !list.archived);
    return filteredLists;
  }

  return (
    <ListContext.Provider
      value={{
        lists,
        selectedItem,
        itemId,
        filter,
        archiveItem,
        unArchiveItem,
        setLists,
        setSelectedItem,
        setItemId,
        setFilter,
        addNewItem,
        removeItemById,
        updateItem,
        setCurrentItem,
        getFilteredLists,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export { ListContext, ListContextProvider };
