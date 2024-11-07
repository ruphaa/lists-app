import { useEffect, useState } from 'react';
import './index.css'

export const ListItem = ({ id, title, selectedItemId, setCurrentItem }) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if(selectedItemId === id) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedItemId]);

  return (
    <div className={`list-item ${isSelected ? 'selected' : ''}`} onClick={() => {
      setCurrentItem(id);
      setIsSelected(true);
    }}>
      {title} 
    </div>
  )
}
