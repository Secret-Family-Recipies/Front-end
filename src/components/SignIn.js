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
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  //This handles the token to navigate to the HomePrivate Route
  // const { push } = props.history;

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  // onChange function
  const inputChange = (e) => {
    const { name, value } = e.target;
    Yup.reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        //This is setting the state to the form
        setFormState({
          ...formState,
          [e.target.id]: e.target.value,
        });
        //This is setting the errors if there are errors
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // onSubmit function
  const formSignIn = (e) => {
    e.preventDefault();
    axios
      .post("#", formState)
      .then((res) => {
        localStorage.setItem("token", res.data.payload); //Here?
        // push("/HomeProtectedPage");
      })
      .catch((err) => console.log(err.res));
  };

  return (
    <>
      <h1>Secret Family Recipes</h1>
      <section className="wrapper">
        <img src={foodImg} className="cardImg" alt="food"></img>
        <section className="card1">
          <form onSubmit={formSignIn}>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formState.username}
                onChange={(e) => inputChange(e)}
              />
              {errors.username.length > 0 && (
                <p className="error">{errors.username}</p>
              )}
            </label>
            <br></br>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formState.password}
                onChange={(e) => inputChange(e)}
              />
              {errors.password.length > 0 && (
                <p className="error">{errors.password}</p>
              )}
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
