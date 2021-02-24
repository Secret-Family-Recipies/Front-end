import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import HomeProtectedPage from "./components/HomeProtectedPage";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route exact path="/signin" component={SignIn}></Route>
        <Route exact path="/recipes" component={HomeProtectedPage}></Route>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
