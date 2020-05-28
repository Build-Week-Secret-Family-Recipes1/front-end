import {axiosWithAuth, isDev} from "../utils";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const getUserId = (username) => {
  if (isDev()) {
    return 0;
  } else {
    axiosWithAuth()
      .post("api/users")
      .then(res=>{
        return res.data.filter(user=>user.username===username).id;
      })
      .catch(err=>{return -1});
  }
}

export const loginUser = (credentials) => async dispatch => {
  dispatch({ type: LOGIN_START, payload: credentials.username });
  if (isDev()) {
    const userId = getUserId(credentials.username);
    dispatch({ type: LOGIN_SUCCESS, payload: {resStatus: '200', user: credentials.username, userId: userId }});
    localStorage.addItem("user", credentials.username);
    localStorage.addItem("userId", userId);
  } else {
    axiosWithAuth()
      .post("/auth/login", credentials)
      .then(res => {
        const userId = getUserId(credentials.username);
        dispatch({ type: LOGIN_SUCCESS, payload: {resStatus: res.status, user: credentials.username, userId: userId }});
        localStorage.addItem("user", credentials.username);
        localStorage.addItem("userId", userId);
      })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILURE,
        payload: `${err.statusText} with response code ${err.status}, ${err}`
      });
    });
  }
}

export const registerUser = (credentials) => async dispatch => {
  dispatch({ type: REGISTER_START, payload: credentials.username });
  if (isDev()) {
    dispatch({ type: REGISTER_SUCCESS, payload: {resStatus: '200', user: credentials.username }});
    loginUser(credentials);
  } else {
    axiosWithAuth()
      .post("auth/register", {username: credentials.username, password: credentials.password})
      .then(res => {
        dispatch({ type: REGISTER_SUCCESS, payload: {resStatus: res.status, user: credentials.username }});
        loginUser(credentials);
      })
    .catch(err => {
      dispatch({
        type: REGISTER_FAILURE,
        payload: `${err.statusText} with response code ${err.status}, ${err}`
      });
    });
  }
}

export const logoutUser = (username) => async dispatch => {
  dispatch({ type: LOGOUT_START, payload: username });
  if (isDev()) {
    dispatch({ type: LOGOUT_SUCCESS, payload: {resStatus: '200', user: username }});
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  } else {
    axiosWithAuth()
      .post("auth/logout")
      .then(res => {
        dispatch({ type: LOGOUT_SUCCESS, payload: {resStatus: res.status, user: username }});
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
      })
    .catch(err => {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: `${err.statusText} with response code ${err.status}, ${err}`
      });
    });
  }
}
