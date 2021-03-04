import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import foodImg from "../assets/CardImg.png";

//InitialState
const initialState = {
  username: "",
  password: "",
};

// formSchema using Yup
const formSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required("A username is required")
    .min(4, "Must be at least 4 characters"),
  password: Yup.string()
    .required("A password is required")
    .min(6, "Must be at least 6 characters"),
});

// SignIn component
const SignIn = (props) => {
  const [formState, setFormState] = useState(initialState);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errors, setErrors] = useState(initialState);
  //This handles the token to navigate to the HomePrivate Route
  const { push } = props.history;

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  function validateChange(e) {
    Yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  }

  const change = (e) => {
    const { name, value } = e.target;
    validateChange(e);
    setFormState({ ...formState, [name]: value });
    setErrors(name, value);
  };

  // onSubmit function
  const submit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://secret-family-recipies00.herokuapp.com/api/auth/login",
        formState
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token); //Here?
        push("/recipes");
      })
      .catch((err) => console.log(err.res));
  };

  return (
    <>
      <h1>Secret Family Recipes</h1>
      <section className="wrapper">
        <img src={foodImg} className="cardImg" alt="food"></img>
        <section className="card1">
          <form onSubmit={submit}>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formState.username}
                onChange={change}
              />
              <p className="error">{errors.username}</p>
            </label>
            <br></br>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formState.password}
                onChange={change}
              />
              <p className="error">{errors.password}</p>
            </label>
            <br></br>
            <button disabled={buttonDisabled} className="cardButton">
              Sign In
            </button>
            <br></br>
            <br></br>
            <Link to="/signup">New User?</Link>
          </form>
        </section>
      </section>
    </>
  );
};

export default SignIn;
