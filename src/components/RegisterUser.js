import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import {registerUser} from "../actions";
import { Redirect, Link } from 'react-router-dom';
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

const H1 = styled.h1`
    color: white;
    font-size: 2.8rem;
    font-weight: bold;
    padding: 70px;
    margin: 0;
    border-bottom: 2px solid #00CC00;
    background-color: rgba(106, 216, 86, 0.9);
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
    display: inline-block;
    font-size: 1.1rem;
    width: 30%;
    padding: 10px 0;
    text-align: right;
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
  color: green;
`

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
        <H1>Secret Family Recipes</H1>
        <StyledForm onSubmit={register}>
          <H2>Register</H2>
          <InputContainer>
            <Label htmlFor="username">Username: </Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Username"
            />
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
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="passwordConfirm">Confirm Password: </Label>
            <Input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              value={credentials.passwordConfirm}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </InputContainer>
          {error !== ''?<div><p>{error}</p><br /></div>:<></>}
          <Button className="loginBtn">Register</Button>
          <P>Already registered? <Link to="/login" style={{ textDecoration: 'none' }}><Span>Log In Here!</Span></Link></P>
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
    isPosting: state.isPosting,
    error: state.error,
    resStatus: state.resStatus
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(RegisterUser);
