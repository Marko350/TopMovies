import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Person from "./pages/Person";
import TopRated from "./pages/TopRated";
import Genre from "./pages/Genre";
import Navigation from "./components/Navigation";
import Search from "./pages/Search";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div style={{ background: "#343a40" }}>
      <ScrollToTop />
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/movie/:id">
          <Movie />
        </Route>
        <Route path="/person/:id">
          <Person />
        </Route>
        <Route path="/topRated">
          <TopRated />
        </Route>
        <Route path="/genre">
          <Genre />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
