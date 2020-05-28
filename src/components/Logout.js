import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import {  Redirect, Link } from 'react-router-dom';
import { logoutUser } from "../actions";

function Logout(props) {
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(()=>{
      if (submitted && props.resStatus!==null && props.error==='') {
        console.log(props.resStatus);
        props.func(props.user);
        setRedirect('/home');
      }
    },[submitted, props.resStatus, props.error]);

    useEffect(()=>{
      setError(props.error);
      setSubmitted(false);
    },[props.error]);

    useEffect(()=>{
      logoutUser(props.user);
      setSubmitted(true);
    },[]);

    if (redirect !== null) {
      return (
        <Redirect to={redirect} />
      );
    } else if (submitted && props.isFetching) {
      return (<p>Logging Out...</p>);
    } else {
      return (
        <div>{error!==null?{error}:<></>}</div>
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
