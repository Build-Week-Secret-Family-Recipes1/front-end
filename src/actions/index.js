import axios from "axios";
import {axiosWithAuth} from "../utils/axiosWithAuth";

export const FETCHING_RECIPE_START = "FETCHING_RECIPE_START";
export const FETCHING_RECIPE_SUCCESS = "FETCHING_RECIPE_SUCCESS";
export const FETCHING_RECIPE_FAILURE = "FETCHING_RECIPE_FAILURE";
export const FETCHING_LIST_START = "FETCHING_LIST_START";
export const FETCHING_LIST_SUCCESS = "FETCHING_LIST_SUCCESS";
export const FETCHING_LIST_FAILURE = "FETCHING_LIST_FAILURE";

export const getRecipe = (recipeId) => async dispatch => {
  dispatch({ type: FETCHING_RECIPE_START, payload: recipeId });
  console.log(`Fetching ${recipeId}`);
  // implement the code calling actions for .then and .catch
  axiosWithAuth
    .get(`/recipes/${recipeId}`)
    .then(res => {
      console.log(res);

      dispatch({ type: FETCHING_RECIPE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: FETCHING_RECIPE_FAILURE,
        payload: `${err.statusText} with response code ${err.status}`
      });
    });
};

export const getList = () => async dispatch => {
  dispatch({ type: FETCHING_LIST_START });
  console.log(`Fetching list`);
  axiosWithAuth
    .get(`/recipes`)
    .then(res => {
      console.log(res);

      dispatch({ type: FETCHING_LIST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: FETCHING_LIST_FAILURE,
        payload: `${err.statusText} with response code ${err.status}`
      });
    });
};
