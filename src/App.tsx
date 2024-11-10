import "./App.css";
import { useContext } from "react";
import { ListContainer } from "./components/ListContainer/index";
import { ListDetails } from "./components/ListDetails/index";
import { ListContext, ListContextProvider } from "./ListContext";

function App() {
  return (
    <ListContextProvider>
      <AppComponent />
    </ListContextProvider>
  );
}

const AppComponent = () => {
  const {
    lists,
    itemId,
    selectedItem,
    handleAddList,
    handleRemoveList,
    handleListDetailsChange,
  } = useContext(ListContext);
  return (
    <div className="container">
      <aside className="side-panel">
        <ListContainer lists={lists} />
      </aside>
      <div className="header">
        <button className="button" onClick={handleAddList}>
          +
        </button>
        <button className="button" onClick={() => handleRemoveList(itemId)}>
          -
        </button>
      </div>
      <div className="main">
        {lists === undefined || lists.length === 0 ? (
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
        )}
      </div>
    </div>
  );
};

export default App;