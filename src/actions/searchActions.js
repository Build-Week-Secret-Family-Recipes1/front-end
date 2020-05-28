import {axiosWithAuth, isDev, modifyRecipe, filterRecipeListByUserId } from "../utils";
import axios from "axios";
import { testList } from "../tests/TestData";
import * as t from "./types";

export const getListByTitleSearch = (searchFilter) => async dispatch => {
  dispatch({ type: t.FETCHING_LIST_START });
  console.log(`Fetching list`);
  if (isDev()) {
    const testListF = filterRecipeListByUserId(testList);
    const testListF2 = testListF.filter(r=>r.title.toLowerCase().includes(searchFilter.toLowerCase()));
    dispatch({ type: t.FETCHING_LIST_SUCCESS, payload: {resStatus: '200', list: testListF2 }});
  } else {
    axiosWithAuth()
      .get(`api/recipes`)
      .then(res => {
        const listF = filterRecipeListByUserId(res.data);
        const listF2 = listF.filter(r=>r.title.toLowerCase().includes(searchFilter.toLowerCase()));
        const modifiedList = listF2.map(r=>modifyRecipe(r));
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

const tagsInclude = (tag, searchFilter) => {
  return tag.toLowerCase().includes(searchFilter.toLowerCase());
}

export const getListByTagSearch = (searchFilter) => async dispatch => {
  dispatch({ type: t.FETCHING_LIST_START });
  console.log(`Fetching list`);
  if (isDev()) {
    const testListF = filterRecipeListByUserId(testList);
    const testListF2 = testListF.filter(r=>{
      return (r.tags.filter(tag=>tagsInclude(tag,searchFilter)));
    });
    dispatch({ type: t.FETCHING_LIST_SUCCESS, payload: {resStatus: '200', list: testListF2 }});
  } else {
    axiosWithAuth()
      .get(`api/recipes`)
      .then(res => {
        const listF = filterRecipeListByUserId(res.data);
        const modifiedList = listF.map(r=>modifyRecipe(r));
        const listF2 = modifiedList.filter(r=>{
          return (r.tags.filter(tag=>tagsInclude(tag,searchFilter)));
        });
        dispatch({ type: t.FETCHING_LIST_SUCCESS, payload: {resStatus: res.status, list: listF2 }});
      })
      .catch(err => {
        dispatch({
          type: t.FETCHING_LIST_FAILURE,
          payload: `${err.statusText} with response code ${err.status}`
        });
      });
  }
};
