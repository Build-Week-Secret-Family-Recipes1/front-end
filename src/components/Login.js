import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import {loginUser} from "../actions";
import {  Redirect } from 'react-router-dom';


function Login (props) {
  const [credentials, setCredentials] = useState({username: '', password: ''});
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(null);

  const handleChange = e => {
    setCredentials({...credentials,
        [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    loginUser(credentials);
    props.func(credentials.username);
    setRedirect('/');
  }

  useEffect(()=>{
    setError(props.error);
  },[props.error]);


  if (redirect !== null) {
    return (
      <Redirect to={redirect} />
    );
  } else if (props.isFetching) {
    return (<p>Logging In...</p>);
  } else {
    return (
      <div className="loginForm">
        <form onSubmit={login}>
          <h2>Please Log In</h2>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Username"
          /><br />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
          /><br />
          {error?<p>{error}</p>:<></>}
          <button className="loginBtn">Log in</button>
        </form>
      </div>
    );
  }
}

// hook up the connect to our store
const mapStateToProps = state => {
  return {
    user: state.user,
    isFetching: state.isFetching,
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
