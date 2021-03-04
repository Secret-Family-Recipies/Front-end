import React from "react";
import NavImg from "../assets/NavImg.png";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className="flexing">
        <div className="navBar2">
          <h1>Secret Family Recipes</h1>
        </div>
        <div className="navBar">
          <Link to="/" className="links">
            Logout
          </Link>
          <Link to="/recipes" className="links">
            Recipes
          </Link>
        </div>
      </nav>
      <br></br>
      <img src={NavImg} className="nav" alt="food" />
    </>
  );
};

export default Nav;
