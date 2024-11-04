import './index.css'

export const ListItem = ({ id, title, setCurrentItem }) => {

  const handleClick = () => {
    setCurrentItem(id)
  }
  return (
    <div className="list-item" onClick={handleClick}>
      {title} 
    </div>
  )
}
