import {axiosWithAuth, isDev, modifyRecipe, filterRecipeListByUserId } from "../utils";
import axios from "axios";
import { testList } from "../tests/TestData";
import * as t from "./types";

export const getRecipe = (recipeId) => async dispatch => {
  dispatch({ type: t.FETCHING_RECIPE_START, payload: recipeId });
  console.log(`Fetching ${recipeId}`);
  // implement the code calling actions for .then and .catch
  if (isDev()) {
    const testListF = filterRecipeListByUserId(testList);
    const filteredList = testListF.filter(r=>r.id===recipeId);
    if (filteredList.length>=1) {
      const selectedRecipe = filteredList[0];
      dispatch({ type: t.FETCHING_RECIPE_SUCCESS, payload: {resStatus: '200', recipe: selectedRecipe}})
    } else {
      dispatch({
        type: t.FETCHING_RECIPE_FAILURE,
        payload: `Recipe ${recipeId} not found or not accessible for user.`
      });
    }
  } else {
    axiosWithAuth()
      .get(`api/recipes`)
      .then(res => {
        console.log(res.data);
        const listF = filterRecipeListByUserId(res.data);
        const filteredList = listF.filter(r=>r.id===recipeId);
        if (filteredList.length>=1) {
          const selectedRecipe = modifyRecipe(filteredList[0]);
          dispatch({ type: t.FETCHING_RECIPE_SUCCESS, payload: {resStatus: res.status, recipe: selectedRecipe }});
        } else {
          dispatch({
            type: t.FETCHING_RECIPE_FAILURE,
            payload: `Recipe ${recipeId} not found or not accessible for user.`
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: t.FETCHING_RECIPE_FAILURE,
          payload: `${err.statusText} with response code ${err.status}`
        });
      });
  }
};

export const getList = () => async dispatch => {
  dispatch({ type: t.FETCHING_LIST_START });
  console.log(`Fetching list`);
  if (isDev()) {
    const testListF = filterRecipeListByUserId(testList);
    dispatch({ type: t.FETCHING_LIST_SUCCESS, payload: {resStatus: '200', list: testListF }});
  } else {
    axiosWithAuth()
      .get(`api/recipes`)
      .then(res => {
        console.log(res.data);
        const listF = filterRecipeListByUserId(res.data);
        const modifiedList = listF.map(r=>modifyRecipe(r));
        dispatch({ type: t.FETCHING_LIST_SUCCESS, payload: {resStatus: res.status, list: modifiedList }});
      })
      .catch(err => {
        dispatch({
          type: t.FETCHING_LIST_FAILURE,
          payload: `${err.statusText} with response code ${err.status}`
        });
      });
  }
};

export const postRecipe = (recipe) => async dispatch => {
  dispatch({ type: t.POSTING_RECIPE_START, payload: recipe });
  if (isDev()) {
    dispatch({ type: t.POSTING_RECIPE_SUCCESS, payload: {resStatus: '201', data: {message: 'New Recipe Added.', id: 4} }})
  } else {
    const userId = sessionStorage.getItem("userId");
    const modifiedRecipe = {title: recipe.title, user_id: userId, source: recipe.source,
      ingredients: recipe.ingredients.join(';'), instructions: recipe.steps.join(';'),
      category: recipe.tags.join(';')}
    axiosWithAuth()
      .post(`/api/recipes`, modifiedRecipe)
      .then(res => {
        console.log(res);
        dispatch({ type: t.POSTING_RECIPE_SUCCESS, payload: {resStatus: res.status, data: res.data }});
      })
      .catch(err => {
        console.log(err);
        console.log(err.json);
        dispatch({
          type: t.POSTING_RECIPE_FAILURE,
          payload: `${err.statusText} with response code ${err.status}, ${err}`
        });
      });
    }
};

export const deleteRecipe = (recipeId) => async dispatch => {
  dispatch({ type: t.DELETING_RECIPE_START, payload: recipeId });
  if (isDev()) {
    dispatch({ type: t.DELETING_RECIPE_SUCCESS, payload: {resStatus: '200', data: {message: 'deleted', id: recipeId}} });
  } else {
    axiosWithAuth()
      .delete(`api/recipes/${recipeId}`)
      .then(res => {
        console.log(res);
        dispatch({ type: t.DELETING_RECIPE_SUCCESS, payload: {resStatus: res.status, data: res.data} });
      })
      .catch(err => {
        dispatch({
          type: t.DELETING_RECIPE_FAILURE,
          payload: `${err.statusText} with response code ${err.status}, ${err}`
        });
      });
    }
}

export const updateRecipe = (recipe) => async dispatch => {
  dispatch({ type: t.UPDATING_RECIPE_START, payload: recipe });
  if (isDev()) {
    dispatch({ type: t.UPDATING_RECIPE_SUCCESS, payload: {resStatus: '200', data: {message: 'updated', id: recipe.id} }});
  } else {
    const userId = sessionStorage.getItem("userId");
    const modifiedRecipe = {id: recipe.id, title: recipe.title, user_id: userId, source: recipe.source,
      ingredients: recipe.ingredients.join(';'), instructions: recipe.steps.join(';'),
      category: recipe.tags.join(';')}
    axiosWithAuth()
      .delete(`api/recipes/${recipe.id}`)
      .then(res => {
        dispatch({ type: t.DELETING_RECIPE_SUCCESS, payload: {resStatus: res.status, data: res.data} });
        console.log(res);
        axiosWithAuth()
          .post(`api/recipes`, modifiedRecipe)
          .then(res => {
            console.log(res);
            dispatch({ type: t.UPDATING_RECIPE_SUCCESS, payload: {resStatus: res.status, data: res.data }});
          })
          .catch(err => {
            dispatch({
              type: t.UPDATING_RECIPE_FAILURE,
              payload: `${err.statusText} with response code ${err.status}, ${err}`
            });
          });
        })
      .catch(err => {
        dispatch({
          type: t.UPDATING_RECIPE_FAILURE,
          payload: `${err.statusText} with response code ${err.status}, ${err}`
        });
      });
    }
}
