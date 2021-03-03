import React from "react";
import NavImg from "../assets/NavImg.png";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <h1>Secret Family Recipes</h1>
      <Link to="/signup">Sign up</Link>
      <Link to="/signin">Logout</Link>     
      <img src={NavImg} className="nav" alt="food" />
    </div>
  );
};

export default Nav;
