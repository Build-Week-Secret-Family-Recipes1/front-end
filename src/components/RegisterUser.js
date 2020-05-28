import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import {loginUser, registerUser} from "../actions";
import {  Redirect, Link } from 'react-router-dom';
import { axiosWithAuth, isDev } from '../utils';
import axios from "axios";

function RegisterUser (props) {
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({username: '', password: '', passwordConfirm: ''});

  const handleChange = e => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    });
  };

  const register = e => {
    e.preventDefault();

    if (credentials.password === credentials.passwordConfirm){
      registerUser(credentials);
      props.func(this.state.credentials.username);
      props.history.push("/home");
    }
  };

   useEffect(()=>{
     
   },[props.isPosting])

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
