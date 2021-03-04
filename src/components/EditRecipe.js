import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "./axiosWithAuth";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const EditRecipe = (props) => {
  const [recipeToEdit, setRecipeToEdit] = useState("");
  const { push } = props.history;
  const recipeId = props.match.params.id;

  //Grabbing data//
  useEffect(() => {
    axiosWithAuth()
      .get(`/api/recipes/${recipeId}`)
      .then((res) => {
        setRecipeToEdit(res.data);
      })
      .catch((err) => {
        console.log("its my error", err);
      });
  }, [recipeId]);

  //OnChange
  const change = (e) => {
    const { name, value } = e.target;
    const valueToUse = value;
    setRecipeToEdit({ ...recipeToEdit, [name]: valueToUse });
  };

  // Saving edit
  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/recipes/${recipeId}`, recipeToEdit)
      .then((res) => {
        push("/recipes");
        recipeToEdit.map((res) => {
          if (res.id === res.data.id) {
            return recipeToEdit;
          } else {
            return res;
          }
        });
      })
      .catch((err) => {
        console.error("My Error", err);
      });
  };
  return (
    <>
      <Nav />
      <div className="card1">
        <h1>EditRecipe</h1>
        <form>
          <label htmlFor="title">{recipeToEdit.title}</label>
          <input
            onChange={change}
            type="text"
            placeholder="Edit Title"
            name="title"
          />
          <br></br>
          <label htmlFor="Createdby">
            Created by: {recipeToEdit.createdBy}
          </label>
          <input
            onChange={change}
            type="text"
            placeholder="Edit Author"
            name="createdBy"
          />
          <br></br>

          <label htmlFor="ingredients">
            Ingredients: {recipeToEdit.ingredients}
          </label>
          <input
            onChange={change}
            placeholder="Edit Ingredients"
            type="text"
            name="ingredients"
          />
          <br></br>

          <label htmlFor="instructions">
            Instructions: {recipeToEdit.instructions}
          </label>
          <input
            onChange={change}
            placeholder="Edit Instructions"
            type="text"
            name="instructions"
          />
          <br></br>

          <button onClick={saveEdit} className="cardButton">
            Save
          </button>

          <br></br>
          <Link to={`/recipe/${recipeId}`}>
            <button className="cardButton">Cancel</button>
          </Link>
        </form>
      </div>
    </>
  );
};
export default EditRecipe;
