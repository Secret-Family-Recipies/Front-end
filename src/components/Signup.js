import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import foodImg from "../assets/CardImg.png";
import { Link } from "react-router-dom";

const Signup = (props) => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const { push } = props.history;

  const [btnDisabled, setBtnDisabled] = useState(true);

  const formSchema = yup.object().shape({
    username: yup
    .string()
    .trim()
    .required("Username is required")
    .min(4, "Must be at least 4 characters"),
    password: yup
      .string()
      .trim()
      .required("The password is a required field")
      .min(6, "Password must be at least 6 characters long"),
  });

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setBtnDisabled(!valid);
    });
  }, [formState, formSchema]);

  function validateChange(e) {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  }

  function inputChange(e) {
    const newFormData = { ...formState, [e.target.name]: e.target.value };
    validateChange(e);
    setFormState(newFormData);
    console.log(formState);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://secret-family-recipies00.herokuapp.com/api/auth/register",
        formState
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        push("/recipes");
        setFormState({
          username: "",
          password: "",
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div>
      <h1>Secret Family Recipes</h1>
      <section className="wrapper">
        <img src={foodImg} className="cardImg" alt="food"></img>
        <section className="card1">
          <h2>Sign up</h2>
          <form onSubmit={onSubmit}>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username"
                value={formState.name}
                onChange={inputChange}
              />
            </label>
            <p className="error"> {errors.username} </p>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={formState.password}
                onChange={inputChange}
              />
            </label>
            <p className="error"> {errors.password} </p>
            <button disabled={btnDisabled} type="submit" className="cardButton">
              Submit
            </button>
            <br></br> <br></br>
            <Link to="/" className="links">
              Current User?
            </Link>
          </form>
        </section>
      </section>
    </div>
  );
};

export default Signup;
