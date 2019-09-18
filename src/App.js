import React from "react";
import logo from "./logo.svg";
import "./App.css";

// importing bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
// import react router
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={ExerciseList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;
