import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateExercise extends Component {
  constructor(props) {
    //in javascript clasees you need to call super when calling
    super(props);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: []
    };
  }

  // React Lifecycle method

  componentDidMount = () => {
    axios.get("http://localhost:5000/users/").then(response => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map(user => user.username),
          username: response.data[0].username
        });
      }
    });
  };

  onChangeUsername = e =>
    this.setState({
      username: e.target.value
    });

  onChangeDescription = e =>
    this.setState({
      description: e.target.value
    });

  onChangeDuration = e =>
    this.setState({
      duration: e.target.value
    });

  onChangeDate = date =>
    this.setState({
      date: date
    });

  onSubmit = e => {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };
    console.log(exercise);
    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.data));
    window.location = "/";
  };

  render() {
    return (
      <div className="container">
        <h3>New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Username:</label>
            <select
              className="form-control"
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(user => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter exercise description"
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input
              type="number"
              className="form-control"
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              ></DatePicker>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onSubmit={this.onSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
