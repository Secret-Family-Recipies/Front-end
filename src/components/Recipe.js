import React from "react";
import { Link } from "react-router-dom";

const Recipes = () => {
  return (
    <>
      <h1>Name of Recipe</h1>
      <h3>Created by: ADD DATA</h3>
      <h3>Ingredients: ADD DATA</h3>
      <h3>Instructions: ADD DATA</h3>
      <h3>Category: ADD DATA</h3>
      <Link to="/editRecipe">
        <button>Edit</button>
      </Link>
      <button>Delete</button>
    </>
  );
};

export default Recipes;
