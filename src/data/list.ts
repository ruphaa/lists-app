import { ListType } from "../ListContext";

const LOCAL_STORAGE_KEY = "myLists";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const saveItems = async (lists: ListType[]) => {
  // await wait(2000);
  return localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lists));
};

// Retrieve all items from localStorage
const getAllItems = async () => {
  // await wait(1000);
  const lists = localStorage.getItem(LOCAL_STORAGE_KEY);
  return lists ? JSON.parse(lists) : [];
}

// Get a single item by its ID
const getItemById = async (id: number) => {
  // await wait(1000);
  const items = await getAllItems();
  return items.find((item: ListType) => item.id === id) || null;
}

const insertItem = async (item: ListType) => {
  // await wait(1000);
  const items = await getAllItems();
  items.push(item);
  await saveItems(items);
  return item;
}

const updateItemById = async (id: number, item: ListType) => {
  // await wait(1000);
  const items = await getAllItems();
  const index = items.findIndex((item: ListType) => item.id === id);
  items[index] = {...items[index], ...item};
  await saveItems(items);
  return true;
}

const deleteItemById = async (id: number) => {
  // await wait(1000);
  const items = await getAllItems();
  const updatedItems = items.filter((item: ListType) => item.id !== id);
  await saveItems(updatedItems);
  return true;
}

const getItemsCount = async () => {
  const lists = await getAllItems();
  return lists.length;
}

const deleteAllItems = async () => {
  // await wait(1000);
  await localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export {
  getAllItems,
  getItemById,
  insertItem,
  updateItemById,
  deleteItemById,
  getItemsCount,
  deleteAllItems,
};
