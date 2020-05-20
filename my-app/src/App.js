import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useLocation,
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const App = () => {
  return (
    <div>
      <Router>
        <MyNav />
        <Switch>
          <Route path="/pantry" component={Profile}></Route>
          <Route path="/saved" component={Saved}></Route>
          <Route path="/main" component={MainRouter}></Route>
          <Route exact path="/" component={Dashboard}></Route>
        </Switch>
      </Router>
    </div>
  );
};

const MainRouter = () => {
  let query = useQuery(); //get params
  let { path, url } = useRouteMatch();
  return <Main url={url} path={path} ingredient={query.get("ingredient")} />;
};

export default App;
