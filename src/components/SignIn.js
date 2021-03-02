import React, { useState, useEffect } from "react";
import axios from 'axios'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

// formSchema using Yup
const formSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required("A username is required")
    .min(4, "Must be at least 4 characters"),
  password: Yup.string()
    .required("A password is required")
    .min(6, "Must be at least 6 characters")
});

// SignIn component
const SignIn = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errors, setErrors] = useState({
    username: "",
    password: ""
  });
  const [post, setPost] = useState([]);

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
        setErrors({
          ...errors,
          [name]: ""
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0] 
        });
      });
    setFormState({
      ...formState,
      [name]: value
    });
  };

  // onSubmit function
  const formSignIn = (e) => {
    e.preventDefault();
    setFormState({ username: "", password: "" });
    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        setPost(res.data);
        console.log("success", res);
      })
      .catch((err) => console.log(err.res));
  };

  return (
    <form onSubmit={formSignIn}>
      <h1>Secret Family Recipes</h1>
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

      <button disabled={buttonDisabled}>Sign In</button>
      <Link to="/Signup">New User?</Link>
    </form>
  );
};

export default SignIn;