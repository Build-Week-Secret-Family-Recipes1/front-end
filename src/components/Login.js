import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import {loginUser} from "../actions";
import {  Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledForm = styled.form`
    width: 45vw;
    padding: 20px;
    margin: 50px 25vw;
    display: flex;
    flex-direction: column;
    border: 2px solid #32CD32;
    border-radius: 5px;
`

const H2 = styled.h2`
    font-size: 2.5rem;
`

const InputContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 10px 0;
`

const Label = styled.label`
    font-size: 1.1rem;
    width: 20%;
`

const Input = styled.input`
    padding: 5px;
    font-size: 1rem;
    border: 2px solid #6AD856;
    border-radius: 5px;
    width: 40%;
`

const Button = styled.button`
    display: inline-block;
    padding: 10px;
    margin: 30px auto;
    width: 9rem;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    background-color: ${props => props.secondary ? '#FE9A76' : '#6AD856'};
    color: white;
`

const P = styled.p`
  font-size: 1rem;
`

const Span = styled.span`
  text-decoration: none;
  color: green;
`

function Login (props) {
  const [credentials, setCredentials] = useState({username: '', password: ''});
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setCredentials({...credentials,
        [e.target.name]: e.target.value
    });
  };

  const login = (e) => {
    e.preventDefault();
    setSubmitted(true);
    loginUser(credentials);
  };

  useEffect(()=>{
    if (submitted && props.resStatus!==null && props.error==='') {
      console.log(props.resStatus);
      props.func(credentials.username);
      setRedirect('/home');
    }
  },[submitted, props.resStatus, props.error]);

  useEffect(()=>{
    setError(props.error);
    setSubmitted(false);
  },[props.error]);


  if (redirect !== null) {
    return (
      <Redirect to={redirect} />
    );
  } else if (submitted && props.isFetching) {
    return (<p>Logging In...</p>);
  } else {
    return (
      <div className="loginForm">
        <StyledForm onSubmit={login}>
          <H2>Please Log In</H2>
          <InputContainer>
            <Label htmlFor="username">Username: </Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Username"
            /><br />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="password">Password: </Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
            /><br />
          </InputContainer>
          {error?<p>{error}</p>:<></>}
          <Button className="loginBtn">Log in</Button>

          <P>Not a member yet? <Link to={'/register'}><Span>Sign Up Here!</Span></Link></P>
        </StyledForm>
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
    resStatus: state.resStatus
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
