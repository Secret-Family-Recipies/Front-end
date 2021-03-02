import React from "react";
import Nav from "./Nav";

const EditRecipe = () => {
  return (
    <div>
      <h1>EditRecipe</h1>
      <form>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" />
        <label htmlFor="Createdby">Created by:</label>
        <input type="text" name="source" />
        <label htmlFor="Ingredients">Ingredients</label>
        <input type="text" name="Ingredients" />
        <label htmlFor="instructions">Instructions</label>
        <input type="text" name="instructions" />
        <label htmlFor="category ">category </label>
        <select type="category" name="category">
          <option value="">Please Choose an option</option>
          <option value="dessert">Dessert</option>
          <option value="dinner">Dinner</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="brunch">Brunch</option>
          <option value="snack">Snack</option>
          <option value="drink">Drink</option>
        </select>
        <button>Add Recipe</button>
        <button>Cancel</button>
      </form>
    </div>
  );
};
//yah??
export default EditRecipe;
