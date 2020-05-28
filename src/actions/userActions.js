import {axiosWithAuth, isDev} from "../utils";
import * as t from "./types";

export const getUserId = (username) => {
  if (isDev()) {
    return 0;
  } else {
    axiosWithAuth()
      .post("api/users")
      .then(res=>{
        const filteredUsers = res.data.filter(user=>user.username===username);
        if (filteredUsers.length>=1) {
          return filteredUsers[0].id;
        } else {
          return -1;
        }
      })
      .catch(err=>{return -1});
  }
}

export const loginUser = (credentials) => async dispatch => {
  dispatch({ type: t.LOGIN_START, payload: credentials.username });
  if (isDev()) {
    const userId = getUserId(credentials.username);
    if (userId>=0) {
      dispatch({ type: t.LOGIN_SUCCESS, payload: {resStatus: '200', user: credentials.username, userId: userId }});
      sessionStorage.addItem("user", credentials.username);
      sessionStorage.addItem("userId", userId);
    } else {
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
          dispatch({ type: t.LOGIN_SUCCESS, payload: {resStatus: res.status, user: credentials.username, userId: userId }});
          sessionStorage.addItem("user", credentials.username);
          sessionStorage.addItem("userId", userId);
        } else {
          dispatch({
            type: t.LOGIN_FAILURE,
            payload: `User ${credentials.username} not found`
          });
        }
      })
    .catch(err => {
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
    dispatch({ type: t.REGISTER_SUCCESS, payload: {resStatus: '200', user: credentials.username }});
    loginUser(credentials);
  } else {
    axiosWithAuth()
      .post("auth/register", {username: credentials.username, password: credentials.password})
      .then(res => {
        dispatch({ type: t.REGISTER_SUCCESS, payload: {resStatus: res.status, user: credentials.username }});
        loginUser(credentials);
      })
    .catch(err => {
      dispatch({
        type: t.REGISTER_FAILURE,
        payload: `${err.statusText} with response code ${err.status}, ${err}`
      });
    });
  }
}

export const logoutUser = (username) => async dispatch => {
  dispatch({ type: t.LOGOUT_START, payload: username });
  if (isDev()) {
    dispatch({ type: t.LOGOUT_SUCCESS, payload: {resStatus: '200', user: username }});
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userId");
  } else {
    axiosWithAuth()
      .post("auth/logout")
      .then(res => {
        dispatch({ type: t.LOGOUT_SUCCESS, payload: {resStatus: res.status, user: username }});
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("userId");
      })
    .catch(err => {
      dispatch({
        type: t.LOGOUT_FAILURE,
        payload: `${err.statusText} with response code ${err.status}, ${err}`
      });
    });
  }
}
