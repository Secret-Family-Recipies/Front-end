import React, { useState } from "react";
import * as yup from "yup";
import Nav from "./Nav";
import { axiosWithAuth } from "./axiosWithAuth";
import { Link } from "react-router-dom";

const initSomething = {
  title: "",
  createdBy: "",
  ingredients: "",
  instructions: "",
};

const NewRecipe = (props) => {
  // states
  const { push } = props.history;

  const [form, setForm] = useState(initSomething);
  // const [setDisabled] = useState(true);
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
    createdBy: yup.string(),
    ingredients: yup
      .string()
      .required("You need ingredients to make something"),
    instructions: yup.string().required("Tell us how to make it thanks"),
    options: yup.string().required("Choose a category please"),
  });

  // useEffect stuff
  // useEffect(() => {
  //   schema.isValid(form).then((valid) => setDisabled(!valid)); //passing the opposite
  // });

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
    axiosWithAuth()
      .post("/api/recipes", form) //send data to the api
      .then((res) => {
        push("/recipes");
        // setForm(res.data); //setForm state to be the data posted
        setForm(res.data, ...form);
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
      <section className="wrapper">
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
            <label>
              Created By:
              <input
                name="createdBy"
                type="text"
                value={form.createdBy}
                onChange={changeHandler}
              />
            </label>
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

            <div className="buttonButt">
              <button className="cardButton">Add Recipe</button>
              <br></br>
              <br></br>
              <Link to={`/recipes`}>
                <button className="cardButton">Cancel</button>
              </Link>
              <br></br>
              <br></br>
            </div>
          </form>
        </section>
      </section>
    </div>
  );
};

export default NewRecipe;
