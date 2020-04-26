import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
// import Nav from "./components/Nav";
import { Navbar, NavDropdown } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <Router>
        <div>

          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/main">Main</Link>
            </li>
          </ul>

          <hr />
          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          <Switch>
            <Route exact path="/" component={Dashboard}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/main" component={MainRouter}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const MainRouter = () => {
  let { path, url } = useRouteMatch();
  return <Main url={url} path={path} />;
};

export default App;
