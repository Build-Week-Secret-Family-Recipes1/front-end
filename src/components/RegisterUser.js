import React from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

class RegisterUser extends React.Component {
  state = {
    error: "",
    credentials: {
      username: "",
      password: "",
      passwordConfirm: ""
    }
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  register = e => {
    e.preventDefault();

    if (this.state.credentials.password === this.state.credentials.passwordConfirm){
        axiosWithAuth()
        .post("/user", this.state.credentials)
        .then(res => {
          localStorage.setItem("token", res.data.payload);
          this.props.func();
          this.props.history.push("/");
        })
        .catch(err => {
          console.log("Err is: ", err);
          this.setState({
            ...this.state,
            error: err
          })
        });
      } else {
        this.setState({
          ...this.state,
          error: "Passwords do not match."
        })
      }
  };

  render() {
    return (
      <div className="loginForm">
        <form onSubmit={this.register}>
          <h2>Register</h2>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
            placeholder="Username"
          /><br />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
            placeholder="Password"
          /><br />
          <label htmlFor="passwordConfirm">Confirm Password: </label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            value={this.state.credentials.passwordConfirm}
            onChange={this.handleChange}
            placeholder="Confirm Password"
          /><br />
          {this.state.error !== ''?<div><p>{this.state.error}</p><br /></div>:<></>}
          <button className="loginBtn">Register</button>
        </form>
      </div>
    );
  }
}

export default RegisterUser;
