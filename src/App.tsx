import "./App.css";
import { ListContainer } from "./components/ListContainer/index";
import { ListDetailsContainer } from "./components/ListDetailsContainer/index";
import { ListActions } from "./components/ListActions/index";
import { ListContextProvider } from "./ListContext";

function App() {
  return (
    <ListContextProvider>
      <AppComponent />
    </ListContextProvider>
  );
}

const AppComponent = () => {
  return (
    <div className="container">
      <aside className="side-panel">
        <ListContainer />
      </aside>
      <div className="header">
        <ListActions />
      </div>
      <div className="main">
        <ListDetailsContainer />
      </div>
    </div>
  );
};

export default App;
