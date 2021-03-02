import React from "react";
//import { Counter } from "./features/counter/Counter";
import "./App.css";
import Nav from "./components/Nav";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="App">
      <Nav />
      <SignIn />
    </div>
  );
}

export default App;
