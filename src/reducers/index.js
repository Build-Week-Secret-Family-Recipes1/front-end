import {
  POSTING_RECIPE_START,
  POSTING_RECIPE_SUCCESS,
  POSTING_RECIPE_FAILURE,
  FETCHING_RECIPE_START,
  FETCHING_RECIPE_SUCCESS,
  FETCHING_RECIPE_FAILURE,
  FETCHING_LIST_START,
  FETCHING_LIST_SUCCESS,
  FETCHING_LIST_FAILURE,
  UPDATING_RECIPE_START,
  UPDATING_RECIPE_SUCCESS,
  UPDATING_RECIPE_FAILURE,
  DELETING_RECIPE_START,
  DELETING_RECIPE_SUCCESS,
  DELETING_RECIPE_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "../actions";

const initialState = {
  user: null,
  recipe_id: null,
  recipe: {title: '', source: '', ingredients: [], steps: [], tags: []},
  isFetching: false,
  isPosting: false,
  error: "",
  list: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTING_RECIPE_START:
      return {
        ...state,
        recipe: action.payload,
        isPosting: true
      };
    case POSTING_RECIPE_SUCCESS:
      return {
        ...state,
        isPosting: false,
        error: "",
        recipe: action.payload
      };
    case POSTING_RECIPE_FAILURE:
      return {
        ...state,
        isPosting: false,
        error: action.payload
      };
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
    case UPDATING_RECIPE_START:
      return {
        ...state,
        isPosting: true,
        recipe: action.payload
      };
    case UPDATING_RECIPE_SUCCESS:
      return {
        ...state,
        isPosting: false,
        error: "",
        list: action.payload
      };
    case UPDATING_RECIPE_FAILURE:
      return {
        ...state,
        isPosting: false,
        error: action.payload
        };
    case DELETING_RECIPE_START:
      return {
        ...state,
        recipe: action.payload,
        isPosting: true
      };
    case DELETING_RECIPE_SUCCESS:
      return {
        ...state,
        isPosting: false,
        error: "",
        list: action.payload
      };
    case DELETING_RECIPE_FAILURE:
      return {
        ...state,
        isPosting: false,
        error: action.payload
        };
    case LOGIN_START:
      return {
        ...state,
        isFetching: true,
        user: action.payload
      }
    case LOGIN_SUCCESS:
        return {
          ...state,
          isFetching: false,
          user: action.payload
        }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
      case REGISTER_START:
        return {
          ...state,
          isPosting: true,
          user: action.payload
        }
      case REGISTER_SUCCESS:
          return {
            ...state,
            isPosting: false,
            user: action.payload
          }
      case REGISTER_FAILURE:
        return {
          ...state,
          isPosting: false,
          error: action.payload
        }
        case LOGOUT_START:
          return {
            ...state,
            isFetching: true,
            user: action.payload
          }
        case LOGOUT_SUCCESS:
            return {
              ...state,
              isFetching: false,
              user: action.payload
            }
        case LOGOUT_FAILURE:
          return {
            ...state,
            isFetching: false,
            error: action.payload
          }
    default:
      return state;
  }
};
