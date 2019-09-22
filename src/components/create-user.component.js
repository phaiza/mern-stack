import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    //in javascript clasees you need to call super when calling
    super(props);

    this.state = {
      username: ""
    };
  }
  onChangeUsername = e =>
    this.setState({
      username: e.target.value
    });

  onSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username
    };
    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.data));
    window.location = "/";
  };

  render() {
    return (
      <div className="container">
        <h3>New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter new username"
              onChange={this.onChangeUsername}
            />
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
