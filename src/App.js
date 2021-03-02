import React from "react";
//import { Counter } from "./features/counter/Counter";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import HomeProtectedPage from "./components/HomeProtectedPage";
import { Route } from "react-router-dom";
import NewRecipe from "./components/NewRecipe";

function App() {
  return (
    <div className="App">
      <Route exact path="/signin" component={SignIn}></Route>
      <Route exact path="/signup" component={SignUp}></Route>
      <Route exact path="/recipes" component={HomeProtectedPage}></Route>
      <Route exact path="/newRecipe" component={NewRecipe}></Route>
      <SignIn />
    </div>
  );
}

export default App;
