import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import "./homepage.css";
import { axiosWithAuth } from "./axiosWithAuth";
import { Link } from "react-router-dom";

const HomeProtectedPage = () => {
  // I think I can useState here but not clear as to what I can add
  // keeping it commented for now till I have something solid to work with
  const [recipe, setRecipe] = useState([]);
  // const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    const getDatData = () => {
      axiosWithAuth()
        .get("#")
        .then((res) => {
          setRecipe(res.data);
        })
        .catch((err) => {
          console.error("Our Error", err);
        });
    };
    getDatData();
  }, [recipe]);
  // axios get data from api to put examples that users can use?
  // Make new component for the saved recipe/recipe boxes that produced when
  // -add recipe button is pressed

  //Get user?
  // const getUser = () => {
  //   axiosWithAuth()
  //   .get('users/getuserinfo')
  //   .then(res => {
  //     console.log(res.data)
  //     localStorage.setItem('user:id', res.data.userid)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }

  return (
    <div>
      <Nav />
      <h1>Recipes</h1>

      {/* container for the details of the page  */}
      <div className="container">
        {/* button to add new entry */}
        <div>
          <Link to="/newRecipe">
            <button> + </button>
          </Link>
        </div>
        <div className="recipeBox">
          {/* I think I can return a component here with a .map function of the component? */}
          {/* though I think I need the something specific for it */}
          saved recipes go here
        </div>
        <div className="recipeBox">saved recipes go here</div>
        <div className="recipeBox">saved recipes go here</div>
      </div>
    </div>
  );
};

export default HomeProtectedPage;
