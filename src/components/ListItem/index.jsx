import { useEffect, useState } from 'react';
import './index.css'

export const ListItem = ({ id, title, setCurrentItem, selectedItemId }) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if(selectedItemId === id) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedItemId]);

  const handleClick = () => {
    setCurrentItem(id)
  }
  return (
    <div className={`list-item ${isSelected && 'selected'}`} onClick={() => {
      handleClick();
      setIsSelected(true);
    }}>
      {title} 
    </div>
  )
}
