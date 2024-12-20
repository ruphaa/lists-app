import "./App.css";
import { ListContainer } from "./components/ListContainer/index";
import { ListDetailsContainer } from "./components/ListDetailsContainer/index";
import { ListActions } from "./components/ListActions/index";
import { Heading, Quote, Theme } from "@radix-ui/themes";
import { ListContextProvider } from "./ListContext";
import { Box, Grid, Flex } from "@radix-ui/themes";
import { FilterList } from "./components/FilterList";

function App() {
  return (
    <Theme
      accentColor="yellow"
      grayColor="gray"
      panelBackground="solid"
      scaling="100%"
      appearance="dark"
      radius="small"
    >
      <ListContextProvider>
        <AppComponent />
      </ListContextProvider>
    </Theme>
  );
}

const AppComponent = () => {
  return (
    <Grid
      width="100vw"
      height="100vh"
      columns="1fr 1fr 3fr"
      rows="64px 1fr 64px"
      areas='"title      sideTitle       header" "sidebar    sideContent     content" "sidebar    footer      footer"'
    >
      <Flex
        width="100%"
        height="100%"
        gridArea="title"
        className="title"
        align="center"
        pl="4"
      >
        <Heading color="lime">
          <Quote>Notes app</Quote>
        </Heading>
      </Flex>
      <Box
        width="100%"
        height="100%"
        gridArea="sideTitle"
        className="sideTitle"
        onClick={() => console.log("clicked")}
      ></Box>
      <Box width="100%" height="100%" gridArea="header" className="header">
        <ListActions />
      </Box>
      <Box
        width="100%"
        height="100%"
        gridArea="sidebar"
        className="sidebar"
        p="4"
      >
        <FilterList />
      </Box>
      <Box
        width="100%"
        height="100%"
        gridArea="sideContent"
        className="sideContent"
      >
        <ListContainer />
      </Box>
      <Box width="100%" height="100%" gridArea="content" className="content">
        <ListDetailsContainer />
      </Box>
      <Box width="100%" height="100%" gridArea="footer" className="footer">
        <DecorativeBox />
      </Box>
    </Grid>
  );
};

/**
 * title      sideTitle       header
 * sidebar    sideContent     content
 * sidebar    sideContent     content
 * sidebar    sideContent     content
 * sidebar    footer      footer
 */
const DecorativeBox = ({ color }: { color?: string }) => {
  return (
    <div style={{ width: "100%", height: "100%", background: color }}></div>
  );
};

export default App;

/**
 * 
 * <div className="container">
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
 */
