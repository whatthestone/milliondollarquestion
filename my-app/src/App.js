import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
import MyNav from "./components/MyNav";
import Saved from "./pages/Saved";
import Login from "./pages/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <MyNav />
          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          <Switch>
            <Route exact path="/" component={Dashboard}></Route>
            <Route path="/pantry" component={Profile}></Route>
            <Route path="/saved" component={Saved}></Route>
            <Route path="/main" component={MainRouter}></Route>
            <Route path="/login" component={Login}></Route>
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
