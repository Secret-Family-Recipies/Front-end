import React from "react";

import { Counter } from "./features/counter/Counter";
import "./App.css";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import HomeProtectedPage from "./components/HomeProtectedPage";
import NewRecipe from "./components/NewRecipe";
import Recipe from "./components/Recipe";
import EditRecipe from "./components/EditRecipe";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <h1>Secret Family Recipes</h1>
    </div>
  );
}

export default App;
