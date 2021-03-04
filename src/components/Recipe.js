import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "./axiosWithAuth";

const Recipes = (props) => {
  const [recipe, setRecipe] = useState("");

  const recipeId = props.match.params.id; //This pulls the id from the url to display to the page
  useEffect(() => {
    axiosWithAuth()
      .get(`/api/recipes/${recipeId}`)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => {
        console.log("its my error", err);
      });
  });

  return (
    <>
      <h1>{recipe.title}</h1>
      <h3>Created by:{recipe.createdBy}</h3>
      <h3>Ingredients: {recipe.ingredients}</h3>
      <h3>Instructions: {recipe.instructions}</h3>
      <h3>Category: ADD DATA</h3>
      <Link to="/editRecipe">
        <button>Edit</button>
      </Link>
      <button>Delete</button>
    </>
  );
};

export default Recipes;
