import axios from "axios";
import {axiosWithAuth} from "../utils/axiosWithAuth";

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

export const getRecipe = (recipeId) => async dispatch => {
  dispatch({ type: FETCHING_RECIPE_START, payload: recipeId });
  console.log(`Fetching ${recipeId}`);
  // implement the code calling actions for .then and .catch
  axiosWithAuth()
    .get(`api/recipes/${recipeId}`)
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
  axiosWithAuh()
    .get(`api/recipes`)
    .then(res => {
      console.log(res);
      const modifiedList = res.data.map(r=>{
        if (r.id>1) {
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
      })
      dispatch({ type: FETCHING_LIST_SUCCESS, payload: modifiedList });
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: FETCHING_LIST_FAILURE,
        payload: `${err.statusText} with response code ${err.status}`
      });
    });
};

export const postRecipe = (recipe) => async dispatch => {
  dispatch({ type: POSTING_RECIPE_START, payload: recipe });
  const modifiedRecipe = {title: recipe.title, source: recipe.source,
    ingredients: recipe.ingredients.join(';'), instructions: recipe.steps.join(';'),
    category: recipe.tags.join(';')}
  axiosWithAuth()
    .post(`api/recipes`, recipe)
    .then(res => {
      console.log(res);

      dispatch({ type: POSTING_RECIPE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      console.log(err.json);

      dispatch({
        type: POSTING_RECIPE_FAILURE,
        payload: `${err.statusText} with response code ${err.status}, ${err}`
      });
    });
};

export const updateRecipe = (recipe) => async dispatch => {
  dispatch({ type: UPDATING_RECIPE_START, payload: recipe });

  axiosWithAuth()
    .put(`api/recipes/${recipe.id}`, recipe)
    .then(res => {
      console.log(res);

      dispatch({ type: UPDATING_RECIPE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      console.log(err.json);

      dispatch({
        type: UPDATING_RECIPE_FAILURE,
        payload: `${err.statusText} with response code ${err.status}, ${err}`
      });
    });
}

export const deleteRecipe = (recipe) => async dispatch => {
  dispatch({ type: DELETING_RECIPE_START, payload: recipe });

  axiosWithAuth()
    .delete(`api/recipes/${recipe.id}`)
    .then(res => {
      console.log(res);

      dispatch({ type: DELETING_RECIPE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      console.log(err.json);

      dispatch({
        type: DELETING_RECIPE_FAILURE,
        payload: `${err.statusText} with response code ${err.status}, ${err}`
      });
    });
}
