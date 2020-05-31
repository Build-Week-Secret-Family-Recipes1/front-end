import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import {  Redirect, Link } from 'react-router-dom';
import { logoutUser } from "../actions";

function Logout(props) {
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(()=>{
      if (submitted && props.resStatus!==null) {
        console.log(props.resStatus);
        props.func(props.user);
        console.log("Time to go home");
        setRedirect('/home');
      }
    },[submitted, props.resStatus, props.error]);

    useEffect(()=>{
      if (props.error && props.error !== '') {
        setError(props.error);
        setSubmitted(false);
      }
    },[props.error]);

    useEffect(()=>{
      props.logoutUser(props.user);
      setSubmitted(true);
    },[]);

    if (redirect) {
      return (
        <Redirect to={redirect} />
      );
    } else if (submitted && props.isFetching) {
      return (<p>Logging Out...</p>);
    } else {
      return (
      <>{error!==null?<div>{error}</div>:<></>}</>
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
  { logoutUser }
)(Logout);
