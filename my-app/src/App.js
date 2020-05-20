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
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCZr88pgVYVtfizS5dLwUssIspQhez0F44",
  authDomain: "milliondollarquestion-83e1d.firebaseapp.com",
  databaseURL: "https://milliondollarquestion-83e1d.firebaseio.com",
  projectId: "milliondollarquestion-83e1d",
  storageBucket: "milliondollarquestion-83e1d.appspot.com",
  messagingSenderId: "766640572413",
  appId: "1:766640572413:web:efb43df0c767fbb92c7b94",
  measurementId: "G-P5GZMQL6GX",
};

firebase.initializeApp(firebaseConfig);

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
            <Route path="/pantry" component={Profile}></Route>
            <Route path="/saved" component={Saved}></Route>
            <Route path="/main" component={MainRouter}></Route>
            <Route exact path="/" component={Dashboard}></Route>
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
