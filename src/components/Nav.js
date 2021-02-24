import React from "react";
import NavImg from "../assets/NavImg.png";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <h1>Secret Family Recipes</h1>
      <Link to="/signin">Logout</Link>
      <Link to="/recipes">Recipes</Link>
      <img src={NavImg} className="nav" alt="food" />
    </div>
  );
};

export default Nav;
