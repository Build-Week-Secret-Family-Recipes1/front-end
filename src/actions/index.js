import {axiosWithAuth} from "../utils/axiosWithAuth";
import axios from "axios";
import { testList } from "../tests/TestData";
import { isDev } from "../utils/isDev";

export const FETCHING_RECIPE_START = "FETCHING_RECIPE_START";
export const FETCHING_RECIPE_SUCCESS = "FETCHING_RECIPE_SUCCESS";
export const FETCHING_RECIPE_FAILURE = "FETCHING_RECIPE_FAILURE";
export const FETCHING_LIST_START = "FETCHING_LIST_START";
export const FETCHING_LIST_SUCCESS = "FETCHING_LIST_SUCCESS";
export const FETCHING_LIST_FAILURE = "FETCHING_LIST_FAILURE";
export const POSTING_RECIPE_START = "POSTING_RECIPE_START";
export const POSTING_RECIPE_SUCCESS = "POSTING_RECIPE_SUCCESS";
export const POSTING_RECIPE_FAILURE = "POSTING_RECIPE_FAILURE";
export const UPDATING_RECIPE_START = "UPDATING_RECIPE_START";
export const UPDATING_RECIPE_SUCCESS = "UPDATING_RECIPE_SUCCESS";
export const UPDATING_RECIPE_FAILURE = "UPDATING_RECIPE_FAILURE";
export const DELETING_RECIPE_START = "DELETING_RECIPE_START";
export const DELETING_RECIPE_SUCCESS = "DELETING_RECIPE_SUCCESS";
export const DELETING_RECIPE_FAILURE = "DELETING_RECIPE_FAILURE";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

const modifyRecipe = (r) => {
    if (r.id>2) {
      return({id: r.id, title: r.title, source: r.source,
        ingredients: r.ingredients.split(';'),
        steps: r.instructions.split(';'),
        tags: r.category.split(';')
      });
    } else {
      return({id: r.id, title: r.title, source: r.source,
        ingredients: r.ingredients.split(', '),
        steps: r.instructions.split(', '),
        tags: [r.category]
      });
    }
}

export const getRecipe = (recipeId) => async dispatch => {
  dispatch({ type: FETCHING_RECIPE_START, payload: recipeId });
  console.log(`Fetching ${recipeId}`);
  // implement the code calling actions for .then and .catch
  if (isDev()) {
    dispatch({ type: FETCHING_RECIPE_SUCCESS, payload: {resStatus: '200', recipe: testList.filter(r=>r.id===recipeId)}})
  } else {
    axiosWithAuth()
      .get(`api/recipes`)
      .then(res => {
        const selectedRecipe = modifyRecipe(res.data.filter(r=>r.id===recipeId));
        dispatch({ type: FETCHING_RECIPE_SUCCESS, payload: {resStatus: res.status, recipe: selectedRecipe }});
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: FETCHING_RECIPE_FAILURE,
          payload: `${err.statusText} with response code ${err.status}`
        });
      });
  }
};

export const getList = () => async dispatch => {
  dispatch({ type: FETCHING_LIST_START });
  console.log(`Fetching list`);
  if (isDev()) {
    dispatch({ type: FETCHING_LIST_SUCCESS, payload: {resStatus: '200', list: testList }});
  } else {
    axiosWithAuth()
      .get(`api/recipes`)
      .then(res => {
        const modifiedList = res.data.map(r=>modifyRecipe(r));
        dispatch({ type: FETCHING_LIST_SUCCESS, payload: {resStatus: res.status, list: modifiedList }});
      })
      .catch(err => {
        dispatch({
          type: FETCHING_LIST_FAILURE,
          payload: `${err.statusText} with response code ${err.status}`
        });
      });
  }
};

export const postRecipe = (recipe) => async dispatch => {
  dispatch({ type: POSTING_RECIPE_START, payload: recipe });
  if (isDev()) {
    dispatch({ type: POSTING_RECIPE_SUCCESS, payload: {resStatus: '201', data: {message: 'New Recipe Added.', id: 4} }})
  } else {
    const modifiedRecipe = {title: recipe.title, source: recipe.source,
      ingredients: recipe.ingredients.join(';'), instructions: recipe.steps.join(';'),
      category: recipe.tags.join(';')}
    axiosWithAuth()
      .post(`/api/recipes`, modifiedRecipe)
      .then(res => {
        console.log(res);
        dispatch({ type: POSTING_RECIPE_SUCCESS, payload: {resStatus: res.status, data: res.data }});
      })
      .catch(err => {
        console.log(err);
        console.log(err.json);
        dispatch({
          type: POSTING_RECIPE_FAILURE,
          payload: `${err.statusText} with response code ${err.status}, ${err}`
        });
      });
    }
};

export const updateRecipe = (recipe) => async dispatch => {
  dispatch({ type: UPDATING_RECIPE_START, payload: recipe });
  if (isDev()) {
    dispatch({ type: UPDATING_RECIPE_SUCCESS, payload: {resStatus: '200', data: {message: 'updated', id: recipe.id} }});
  } else {
    const modifiedRecipe = {title: recipe.title, source: recipe.source,
      ingredients: recipe.ingredients.join(';'), instructions: recipe.steps.join(';'),
      category: recipe.tags.join(';')}
    axiosWithAuth()
      .put(`api/recipes/${recipe.id}`, modifiedRecipe)
      .then(res => {
        console.log(res);
        dispatch({ type: UPDATING_RECIPE_SUCCESS, payload: {resStatus: res.status, data: res.data }});
      })
      .catch(err => {
        dispatch({
          type: UPDATING_RECIPE_FAILURE,
          payload: `${err.statusText} with response code ${err.status}, ${err}`
        });
      });
    }
}

export const deleteRecipe = (recipe) => async dispatch => {
  dispatch({ type: DELETING_RECIPE_START, payload: recipe });
  if (isDev()) {
    dispatch({ type: DELETING_RECIPE_SUCCESS, payload: {resStatus: '200', data: {message: 'deleted', id: recipe.id}} });
  } else {
    axiosWithAuth()
      .delete(`api/recipes/${recipe.id}`)
      .then(res => {
        console.log(res);
        dispatch({ type: DELETING_RECIPE_SUCCESS, payload: {resStatus: res.status, data: res.data} });
      })
      .catch(err => {

        dispatch({
          type: DELETING_RECIPE_FAILURE,
          payload: `${err.statusText} with response code ${err.status}, ${err}`
        });
      });
    }
}

export const loginUser = (credentials) => async dispatch => {
  dispatch({ type: LOGIN_START, payload: credentials.username });
  if (isDev()) {
    dispatch({ type: LOGIN_SUCCESS, payload: {resStatus: '200', user: credentials.username }});
    localStorage.addItem("user", credentials.username);
  } else {
    axiosWithAuth()
      .post("/auth/login", credentials)
      .then(res => {
        dispatch({ type: LOGIN_SUCCESS, payload: {resStatus: res.status, user: credentials.username }});
        localStorage.addItem("user", credentials.username);
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
      .post("auth/register", credentials)
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
  } else {
    axiosWithAuth()
      .post("auth/logout")
      .then(res => {
        dispatch({ type: LOGOUT_SUCCESS, payload: {resStatus: res.status, user: username }});
        localStorage.removeItem("user");
      })
    .catch(err => {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: `${err.statusText} with response code ${err.status}, ${err}`
      });
    });
  }
}
