import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import "./homepage.css";
import { axiosWithAuth } from "./axiosWithAuth";
//import PrivateRoute from "./PrivateRoute";
import { Link } from "react-router-dom";

const HomeProtectedPage = () => {
  // I think I can useState here but not clear as to what I can add
  // keeping it commented for now till I have something solid to work with
  const [recipe, setRecipe] = useState([]);
  // const [editing, setEditing] = useState(false);

  // const getRecipe = () => {
  //   //Here?
  //   axiosWithAuth()
  //     .get(`https://secret-family-recipies00.herokuapp.com/api/recipes`)
  //     .then((res) => {
  //       setRecipe(res.data.recipes);
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log("My eeeee", err);
  //     });
  // };
  // useEffect(() => {
  //   getRecipe();
  // }, []);

  // const editRecipe = (recipe) => {
  //   setEditing(true);
  //   setRecipe(recipe);
  // };

  //Saving edit
  // const saveEdit = (e) => {
  //   e.preventDefault();
  //   axiosWithAuth()
  //     .put(
  //       `https://secret-family-recipies00.herokuapp.com/api/recipes/${recipe.id}`,
  //       recipe
  //     )
  //     .then((res) => {
  //       console.log(res.data.id);
  //       const state = recipe.map((res) => {
  //         if (res.id === res.data.id) {
  //           return recipe;
  //         } else {
  //           return res;
  //         }
  //       });
  //       setEditing(false);
  //     })
  //     .catch((err) => {
  //       console.error("My Error", err);
  //     });
  // };

  //Deleting
  // const deleteRecipe = (res) => {
  //   console.log(res.id);
  //   axiosWithAuth()
  //     .delete(`https://secret-family-recipies00.herokuapp.com/${res.id}`)
  //     .then((res) => {
  //       const filteredArray = recipe.filter(
  //         (res) => res.id !== res.data //Here?
  //       );
  //       recipe(filteredArray);
  //     })
  //     .catch((err) => {
  //       console.error(`My error`, err);
  //     });
  // };

  useEffect(() => {
    const getDatData = () => {
      axiosWithAuth()
        .get("api/recipes")
        .then((res) => {
          setRecipe(res.data);
        })
        .catch((err) => {
          console.error("Our Error", err);
        });
    };
    getDatData();
  }, [recipe]);

  //routing for the single recipe
  // const singleRec = (res) => {};

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
            <div>
              <Link to={`/recipe/${res.id}`}>
                {/* //This takes each id from the recipe data because we are mapping
              though and then we can use it to click */}
                {/*  //OnClick with the ability to link to that recipe, on the div, the route should take the id, using the id, useEffect pull the id from the url */}
                <div>
                  <h2>{res.title}</h2>
                  <p>Author:{res.createdBy}</p>
                  <p>Ingredients:{res.ingredients}</p>
                  <p>instructions:{res.instructions}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeProtectedPage;
//delete on the profile page
//On lognin recice the user token and id

//then set both to loack storage,
//Set user id to local storage
//user
//get user recipies
