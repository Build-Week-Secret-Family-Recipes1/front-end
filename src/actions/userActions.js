import {axiosWithAuth, isDev} from "../utils";
import * as t from "./types";

export const getUserId = (username) => {
  if (isDev()) {
    console.log("Dev - getUserId");
    return 0;
  } else {
    axiosWithAuth()
      .get("api/users")
      .then(res=>{
        const filteredUsers = res.data.filter(user=>user.username===username);
        if (filteredUsers.length>=1) {
          console.log(`User found (${username}, id:${filteredUsers[0].id})`);
          return filteredUsers[0].id;
        } else {
          console.log(`User ${username} not found.`);
          return -1;
        }
      })
      .catch(err=>{
        console.log("Error retrieving user list");
        console.log(err.message);
        return -1;
      });
  }
}

export const loginUser = (credentials) => async dispatch => {
  dispatch({ type: t.LOGIN_START, payload: credentials.username });
  if (isDev()) {
    const userId = getUserId(credentials.username);
    if (userId>=0) {
      console.log("Login Success");
      console.log(`Welcome, ${credentials.username}!`);
      dispatch({ type: t.LOGIN_SUCCESS, payload: {resStatus: '200', user: credentials.username, userId: userId }});
      sessionStorage.setItem("user", credentials.username);
      sessionStorage.setItem("userId", userId);
    } else {
      console.log(`Login Failure - No such user (${credentials.username})`);
      dispatch({
        type: t.LOGIN_FAILURE,
        payload: `User ${credentials.username} not found`
      });
    }
  } else {
    axiosWithAuth()
      .post("/auth/login", {username: credentials.username, password: credentials.password})
      .then(res => {
        const userId = getUserId(credentials.username);
        if (userId>=0) {
          console.log("Login Success");
          dispatch({ type: t.LOGIN_SUCCESS, payload: {resStatus: res.status, user: credentials.username, userId: userId }});
          sessionStorage.setItem("user", credentials.username);
          sessionStorage.setItem("userId", userId);
        } else {
          console.log(`Login Failure - No such user (${credentials.username})`);
          dispatch({
            type: t.LOGIN_FAILURE,
            payload: `User ${credentials.username} not found`
          });
        }
      })
    .catch(err => {
      console.log("Login Error");
      dispatch({
        type: t.LOGIN_FAILURE,
        payload: `${err.statusText} with response code ${err.status}, ${err}`
      });
    });
  }
}

export const registerUser = (credentials) => async dispatch => {
  dispatch({ type: t.REGISTER_START, payload: credentials.username });
  if (isDev()) {
    console.log("Register Success");
    dispatch({ type: t.REGISTER_SUCCESS, payload: {resStatus: '200', user: credentials.username }});
    loginUser(credentials);
  } else {
    axiosWithAuth()
      .post("auth/register", {username: credentials.username, password: credentials.password})
      .then(res => {
        console.log("Register Success");
        console.log(res.status);
        dispatch({ type: t.REGISTER_SUCCESS, payload: {resStatus: res.status, user: credentials.username }});
        loginUser(credentials);
      })
    .catch(err => {
      console.log("Register Error");
      dispatch({
        type: t.REGISTER_FAILURE,
        payload: `${err.statusText} with response code ${err.status}`
      });
    });
  }
}

export const logoutUser = (username) => async dispatch => {
  dispatch({ type: t.LOGOUT_START, payload: username });
  if (isDev()) {
    console.log("Logout Success");
    dispatch({ type: t.LOGOUT_SUCCESS, payload: {resStatus: '200', user: username }});
    sessionStorage.clear();
  } else {
    axiosWithAuth()
      .post("auth/logout")
      .then(res => {
        console.log("Logout Success");
        console.log(res.status);
        dispatch({ type: t.LOGOUT_SUCCESS, payload: {resStatus: res.status, user: username }});
        sessionStorage.clear();
      })
    .catch(err => {
      console.log("Logout Error");
      dispatch({
        type: t.LOGOUT_FAILURE,
        payload: `${err.statusText} with response code ${err.status}`
      });
    });
  }
}
