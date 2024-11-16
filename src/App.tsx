import "./App.css";
import { ListContainer } from "./components/ListContainer/index";
import { ListDetailsContainer } from "./components/ListDetailsContainer/index";
import { ListActions } from "./components/ListActions/index";
import { ListContextProvider } from "./ListContext";
import { Grid } from "@radix-ui/themes";

function App() {
  return (
    <ListContextProvider>
      <AppComponent />
    </ListContextProvider>
  );
}

const AppComponent = () => {
  return (
    // <div className="container">
    <Grid display="grid" columns="repeat(12, 1fr)" rows="repeat(12, 1fr)">
      <aside className="side-panel">
        <ListContainer />
      </aside>
      <div className="header">
        <ListActions />
      </div>
      <div className="main">
        <ListDetailsContainer />
      </div>
    </Grid>
    // </div>
  );
};

export default App;
