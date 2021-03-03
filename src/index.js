import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import HomeProtectedPage from "./components/HomeProtectedPage";
import Signup from "./components/Signup";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>       
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
