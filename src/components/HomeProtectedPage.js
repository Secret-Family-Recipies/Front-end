import React from "react";
import Nav from './Nav';
import './homepage.css'


const HomeProtectedPage = () => {
  // I think I can useState here but not clear as to what I can add
  // keeping it commented for now till I have something solid to work with
  // const [recipe, setRecipe] = useState(null);

  // axios get data from api to put examples that users can use? 
  // Make new component for the saved recipe/recipe boxes that produced when
  // -add recipe button is pressed
  return (
    <div>
      <Nav />
      <h1>Recipes</h1>

      {/* search bar */}
        <div className='search'>
          <label htmlFor='search'></label>
          <input type='text' placeholder='Search' />
        </div>

        {/* container for the details of the page  */}
        <div className='container'>
        {/* button to add new entry */}
        <div>
            <button> + </button>
        </div>  
          <div className='recipeBox'>
            saved recipes go here
          </div>
          <div className='recipeBox'>
            saved recipes go here
          </div>
          <div className='recipeBox'>
            saved recipes go here
          </div>
        </div>
    </div>
  );
};

export default HomeProtectedPage;
