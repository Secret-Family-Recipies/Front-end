import React, { useState } from "react";
import axios from 'axios'

const SignIn = () => {

  const [formState, setFormState] = useState({
    username: "",
    password: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)

  //onChange function
  const inputChange = e => {
    
  }


  // sign in button function
  const formSignIn = e => {
    e.preventDefault()
    console.log('Signed in!')
    axios
      .post("#", formState)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <form onSubmit={formSignIn}>
      <label htmlFor="username">
        Username
        <input
          type="text"
          name="username"
          value={formState.name}
          onChange={inputChange}
          />
      </label>

      <label htmlFor="password">
        Password
        <input
          type="text"
          name="password"
          value={formState.password}
          onChange={inputChange}
          />
      </label>
    </form>
  );
};

export default SignIn;
