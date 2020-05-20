import {
  FETCHING_RECIPE_START,
  FETCHING_RECIPE_SUCCESS,
  FETCHING_RECIPE_FAILURE,
  FETCHING_LIST_START,
  FETCHING_LIST_SUCCESS,
  FETCHING_LIST_FAILURE,
} from "../actions";

const initialState = {
  recipe_id: null,
  recipe: {title: '', ingredients: [], steps: [], tags: []},
  isFetching: false,
  error: "",
  list: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_RECIPE_START:
      return {
        ...state,
        recipe_id: action.payload,
        isFetching: true
      };
    case FETCHING_RECIPE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        recipe: action.payload
      };
    case FETCHING_RECIPE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case FETCHING_LIST_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    case FETCHING_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};
