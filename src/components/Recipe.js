import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "./axiosWithAuth";
import Nav from "./Nav";

const Recipes = (props) => {
  const [recipe, setRecipe] = useState("");
  const { push } = props.history;

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

  //Deleting
  const deleteRecipe = (res) => {
    console.log(res.id);
    axiosWithAuth()
      .delete(`/api/recipes/${recipeId}`)
      .then((res) => {
        push("/recipes");
        const filteredArray = recipe.filter(
          (res) => res.id !== res.data //Here?
        );
        recipe(filteredArray);
      })
      .catch((err) => {
        console.error(`My error`, err);
      });
  };

  return (
    <>
      <Nav />
      <div className="card1">
        <h1>{recipe.title}</h1>
        <h3>Created by:{recipe.createdBy}</h3>
        <h3>Ingredients: {recipe.ingredients}</h3>
        <h3>Instructions: {recipe.instructions}</h3>

        <Link to={`/editRecipe${recipeId}`}>
          <button className="cardButton">Edit</button>
        </Link>
        <button className="cardButton" onClick={deleteRecipe}>
          Delete
        </button>
      </div>
    </>
  );
};

export default Recipes;
