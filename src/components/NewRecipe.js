import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "./Nav";
const initSomething = {
  title: "",
  source: "",
  ingredients: "",
  instructions: "",
  options: "",
};

const NewRecipe = () => {
  // states
  const [form, setForm] = useState(initSomething);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState(initSomething);

  // change handler
  const changeHandler = (e) => {
    const { name, value } = e.target;
    const valueToUse = value;
    setForm({ ...form, [name]: valueToUse });
    setFormErr(name, valueToUse);
  };

  // validation
  //could do it on other component but easier this way
  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Need to have a title")
      .min(2, "more than 2 characters pls"),
    source: yup.string(),
    ingredients: yup
      .string()
      .required("You need ingredients to make something"),
    instructions: yup.string().required("Tell us how to make it thanks"),
    options: yup.string().required("Choose a category please"),
  });

  // useEffect stuff
  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid)); //passing the opposite
  });

  //form errors
  const setFormErr = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setErrors({ ...errors, [name]: "" }); //nothing happens when the form actually validates
      })
      .catch((err) => {
        setErrors({ ...errors, [name]: err.errors[0] }); //actual error setting, grabbing first error
      });
  };

  const submit = (e) => {
    e.preventDefault(); //prevent refresh
    const newUser = {
      title: form.user,
      source: form.user,
      ingredients: form.user,
      instructions: form.user,
      options: form.user,
    };
    axios
      .post("https://reqres.in/api/users", newUser) //send data to the api
      .then((res) => {
        // setForm(res.data); //setForm state to be the data posted
        setForm([res.data, ...form]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Nav />
      <h1>New Recipe</h1>
      <section className="wrapper2">
        <section className="card1">
          <form onSubmit={submit} className="card2">
            <label>
              <div>{errors.title}</div>
              Title:
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={changeHandler}
              />
            </label>
            <br></br>
            <label>
              Source:
              <input
                name="source"
                type="text"
                value={form.source}
                onChange={changeHandler}
              />
            </label>
            <br></br>
            <label>
              <div>{errors.ingredients}</div>
              Ingredients:
              <input
                name="ingredients"
                type="text"
                value={form.ingredients}
                onChange={changeHandler}
              />
            </label>
            <br></br>
            <label>
              <div>{errors.instructions}</div>
              Instructions:
              <input
                name="instructions"
                type="text"
                value={form.instructions}
                onChange={changeHandler}
              />
            </label>
            <br></br>
            <label>
              <div>{errors.options}</div>
              Category
              <select
                name="options"
                value={form.category}
                onChange={changeHandler}
              >
                <option value="">--Choose Category--</option>
                <option value="breakfast">Breakfast</option>
                <option value="brunch">Brunch</option>
                <option value="lunch">Lunch</option>
                <option value="dessert">Dessert</option>
                <option value="snack">Snacks</option>
                <option value="drink">Drinks</option>
              </select>
            </label>
            <br></br>
            <Link to="/recipes">
              <button disabled={disabled} className="cardButton">
                Add Recipe
              </button>
            </Link>
          </form>
        </section>
      </section>
    </div>
  );
};

export default NewRecipe;
