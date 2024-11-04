import './index.css'

export const ListDetails = ({ list }) => {
  return (
    <div className="list-details">
        <h2>{list.title}</h2>
        <p>{list.details}</p>
    </div>
  )
}
