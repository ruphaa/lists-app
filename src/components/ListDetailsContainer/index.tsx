import { useContext } from "react";
import "./index.css";
import { ListDetails } from "../ListDetails";
import { ListContext } from "../../ListContext";

export const ListDetailsContainer = () => {
  const { lists, selectedItem, handleListDetailsChange } =
    useContext(ListContext) || {};
  return lists === undefined || lists.length === 0 ? (
    <p>No lists available</p>
  ) : (
    selectedItem != null && (
      <ListDetails
        list={selectedItem}
        onUpdateListDetails={(id, title, details) =>
          handleListDetailsChange(id, title, details)
        }
      />
    )
  );
};
