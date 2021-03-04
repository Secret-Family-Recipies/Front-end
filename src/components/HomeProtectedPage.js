import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { axiosWithAuth } from "./axiosWithAuth";
import { Link } from "react-router-dom";

const HomeProtectedPage = () => {
  // I think I can useState here but not clear as to what I can add
  // keeping it commented for now till I have something solid to work with
  const [recipe, setRecipe] = useState([]);

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
  }, []);

  //routing for the single recipe
  // const singleRec = (res) => {};

  return (
    <div>
      <Nav />
      <h1>Recipes</h1>

      {/* container for the details of the page  */}
      <section className="card3">
        <div className="redCard">
          {/* <h2>Add Recipe</h2> */}
          <Link to="/newRecipe">
            <button className="cardButton"> + </button>
          </Link>
        </div>

        {recipe.map((res) => (
          <Link to={`/recipe/${res.id}`} key={res.id} className="link">
            {/* //This takes each id from the recipe data because we are mapping
              though and then we can use it to click */}
            {/*  //OnClick with the ability to link to that recipe, on the div, the route should take the id, using the id, useEffect pull the id from the url */}
            <div className="redCard">
              <h3>{res.title}</h3>
              <p>
                <b>Author: </b>
                {res.createdBy}
              </p>
              <p>
                <b>Ingredients: </b> {res.ingredients}
              </p>
              <p>
                <b>Instructions: </b>
                {res.instructions}
              </p>
            </div>
            <br></br>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default HomeProtectedPage;
