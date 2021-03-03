import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

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
    username: yup.string().trim().required("Username is required"),
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
        localStorage.setItem("token", res.data.payload);
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
        <div style={{ color: "red", fontWeight: "bold" }}>
          <p> {errors.username} </p>
          <p> {errors.password} </p>
        </div>
        <div>
          <button disabled={btnDisabled} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
