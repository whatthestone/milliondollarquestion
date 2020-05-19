import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider as AuthProvider } from "./Context/AuthContext";
import { Provider as PantryProvider } from "./Context/PantryContext";
import { Provider as QnProvider } from "./Context/QnContext";

ReactDOM.render(
  <React.StrictMode>
    <QnProvider>
      <PantryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PantryProvider>
    </QnProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
