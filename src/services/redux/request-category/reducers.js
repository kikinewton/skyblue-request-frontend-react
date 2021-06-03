import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  requestCategories: [],
  loading: false,
  submitting: false,
  submitSuccess: false,
};

//fetch
export const fetchRequestCategories = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const fetchRequestCategoriesSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, requestCategories: action.responseData, loading: false};
};

export const fetchRequestCategoriesFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error};
};


//create
export const createRequestCategory = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submitSuccess: false };
};

export const createRequestCategorySuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submitSuccess: true};
};

export const createRequestCategoryFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error};
};


export const resetRequestCategory = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    requestCategories: [],
    error: null,
    loading: false,
    submitting: false,
    submitSuccess: false
  };
};

export const HANDLERS = {
  [Types.FETCH_REQUEST_CATEGORIES]: fetchRequestCategories,
  [Types.FETCH_REQUEST_CATEGORIES_SUCCESS]: fetchRequestCategoriesSuccess,
  [Types.FETCH_REQUEST_CATEGORIES_FAILURE]: fetchRequestCategoriesFailure,

  [Types.CREATE_REQUEST_CATEGORY]: createRequestCategory,
  [Types.CREATE_REQUEST_CATEGORY_SUCCESS]: createRequestCategorySuccess,
  [Types.CREATE_REQUEST_CATEGORY_FAILURE]: createRequestCategoryFailure,
  
  [Types.RESET_REQUEST_CATEGORY]: resetRequestCategory
};

export default createReducer(INITIAL_STATE, HANDLERS);
