import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import "./homepage.css";
import { axiosWithAuth } from "./axiosWithAuth";
import PrivateRoute from "./PrivateRoute";
import { Link } from "react-router-dom";

const HomeProtectedPage = () => {
  // I think I can useState here but not clear as to what I can add
  // keeping it commented for now till I have something solid to work with
  const [recipe, setRecipe] = useState([]);
  const [editing, setEditing] = useState(false);

  const getRecipe = () => {
    axiosWithAuth()
      .get(`https://secret-family-recipies00.herokuapp.com/api/recipes`)
      .then((res) => {
        setRecipe(res.data.recipes);
      })
      .catch((err) => {
        console.log("My Error", err);
      });
  };
  useEffect(() => {
    getRecipe();
  }, []);

  const editRecipe = (recipe) => {
    setEditing(true);
    setRecipe(recipe);
  };

  //Saving edit
  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(
        `https://secret-family-recipies00.herokuapp.com/api/recipes/${recipe.id}`,
        recipe
      )
      .then((res) => {
        console.log(res.data.id);
        const state = recipe.map((res) => {
          if (res.id === res.data.id) {
            return recipe;
          } else {
            return res;
          }
        });
        setEditing(false);
      })
      .catch((err) => {
        console.error("My Error", err);
      });
  };

  //Deleting
  const deleteRecipe = (res) => {
    console.log(res.id);
    axiosWithAuth()
      .delete(`https://secret-family-recipies00.herokuapp.com/${res.id}`)
      .then((res) => {
        const filteredArray = recipe.filter(
          (res) => res.id !== res.data //Here?
        );
        recipe(filteredArray);
      })
      .catch((err) => {
        console.error(`My error`, err);
      });
  };

  useEffect(() => {
    const getDatData = () => {
      axiosWithAuth()
        .get("https://secret-family-recipies00.herokuapp.com/api/recipes")
        .then((res) => {
          setRecipe(res.data);
        })
        .catch((err) => {
          console.error("Our Error", err);
        });
    };
    getDatData();
  }, [recipe]);

  return (
    <div>
      <Nav />
      <h1>Recipes</h1>

      {/* container for the details of the page  */}
      <div className="container">
        <div>
          <Link to="/newRecipe">
            <button> + </button>
          </Link>
        </div>
        <div className="recipeBox">
          {recipe.map((res) => (
            <Link to="/Recipe">
              <div>
                <h2>{res.title}</h2>
                <p>Author:{res.createdBy}</p>
                <p>Ingredients:{res.ingredients}</p>
                <p>instructions:{res.instructions}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeProtectedPage;
