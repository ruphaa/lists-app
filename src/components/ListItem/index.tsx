import { useEffect, useState } from "react";
import "./index.css";

type ListItemProps = {
  id: number;
  title: string;
  selectedItemId: number;
  setCurrentItem: (id: number) => void;
};

export const ListItem = ({
  id,
  title,
  selectedItemId,
  setCurrentItem,
}: ListItemProps) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (selectedItemId === id) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedItemId]);

  return (
    <div
      className={`list-item ${isSelected ? "selected" : ""}`}
      onClick={() => {
        setCurrentItem(id);
        setIsSelected(true);
      }}
    >
      {title}
    </div>
  );
};
