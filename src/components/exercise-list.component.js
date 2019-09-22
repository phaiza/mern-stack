import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Exercise = props => {
  return (
    <tr>
      <th scope="row">{props.exercise.username}</th>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={"/edit/" + props.exercise._id} className="btn btn-warning">
          Edit
        </Link>

        <a
          href="#"
          className="btn button-small btn-primary"
          onClick={() => props.deleteExercise(props.exercise._id)}
        >
          Delete
        </a>
      </td>
    </tr>
  );
};

export default class ExerciseList extends Component {
  constructor(props) {
    //in javascript clasees you need to call super when calling
    super(props);

    this.state = {
      exercises: []
    };
  }

  // React Lifecycle method

  componentDidMount = () => {
    axios
      .get("http://localhost:5000/exercises/")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            exercises: response.data
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // this component will also allow user to delete exercises - create method for that

  deleteExercise = id => {
    axios
      .delete("http://localhost:5000/exercises/delete/" + id)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));
    //upadte react state
    this.setState({
      exercises: this.state.exercises.filter(exercise => exercise._id !== id)
    });
  };

  exerciseList = () => {
    return this.state.exercises.map(exercise => {
      return (
        <Exercise
          key={exercise._id}
          exercise={exercise}
          deleteExercise={this.deleteExercise}
        />
      );
    });
  };
  render() {
    return (
      <div className="container">
        <h1>Exercise List</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
