import React from "react";
//import { Counter } from "./features/counter/Counter";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import HomeProtectedPage from "./components/HomeProtectedPage";
import { Route } from "react-router-dom";
import NewRecipe from "./components/NewRecipe";
import PrivateRoute from "./components/PrivateRoute";
import EditRecipe from "./components/EditRecipe";
import Recipe from "./components/Recipe";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={SignIn}></Route>
      <Route exact path="/signup" component={SignUp}></Route>
      <PrivateRoute
        exact
        path="/recipes"
        component={HomeProtectedPage}
      ></PrivateRoute>
      <PrivateRoute
        exact
        path="/newRecipe"
        component={NewRecipe}
      ></PrivateRoute>
      <PrivateRoute exact path="/recipe/:id" component={Recipe}></PrivateRoute>
      {/* This makes it so you can oass in a variable through the URL */}
      <PrivateRoute
        exact
        path="/editRecipe"
        component={EditRecipe}
      ></PrivateRoute>
    </div>
  );
}

export default App;
