import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import {registerUser} from "../actions";
import { Redirect, Link } from 'react-router-dom';

function RegisterUser (props) {
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({username: '', password: '', passwordConfirm: ''});
  const [submitted, setSubmitted] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleChange = e => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    });
  };

  const register = e => {
    e.preventDefault();

    if (credentials.password === credentials.passwordConfirm){
      setSubmitted(true);
      registerUser(credentials);
    }
  };

   useEffect(()=>{
     if (submitted && !props.isPosting && !props.isFetching && props.resStatus!==null) {
       props.func(credentials.username);
       setRedirect("/home");
     }
   },[submitted, props.isPosting, props.resStatus, props.isFetching])

   useEffect(()=>{
     setError(props.error);
   },[props.error])

   if (redirect) {
     return (<Redirect to={redirect} />);
   } else if (props.isPosting || props.isFetching) {
     return (<p>Please wait...</p>);
   } else {
    return (
      <div className="loginForm">
        <form onSubmit={register}>
          <h2>Register</h2>
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
          <label htmlFor="passwordConfirm">Confirm Password: </label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            value={credentials.passwordConfirm}
            onChange={handleChange}
            placeholder="Confirm Password"
          /><br />
          {error !== ''?<div><p>{error}</p><br /></div>:<></>}
          <button className="loginBtn">Register</button>
          <p>Already registered? <Link to="/login">Log In Here!</Link></p>
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
    isPosting: state.isPosting,
    error: state.error,
    resStatus: state.resStatus
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(RegisterUser);
