import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  request_categories: [],
  loading: false,
  submitting: false,
  submit_success: false,
  request_category: null
};

//fetch
export const fetchRequestCategories = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const fetchRequestCategoriesSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, request_categories: action.responseData, loading: false};
};

export const fetchRequestCategoriesFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error};
};


//create
export const createRequestCategory = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submit_success: false };
};

export const createRequestCategorySuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submit_success: true};
};

export const createRequestCategoryFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error};
};


//update
export const updateRequestCategory = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, submit_success: false };
};

export const updateRequestCategorySuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submit_success: true};
};

export const updateRequestCategoryFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error};
};


//delete
export const deleteRequestCategory = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, submit_success: false };
};

export const deleteRequestCategorySuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submit_success: true, request_categories: state.request_categories.filter(it => it.id !== action?.id)};
};

export const deleteRequestCategoryFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error};
};

export const setRequestCategory = (state = INITIAL_STATE, action) => {
  return { ...state, request_category: action.requestCategory }
}


export const resetRequestCategory = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    request_categories: [],
    error: null,
    loading: false,
    submitting: false,
    submit_success: false,
    request_category: null
  };
};

export const HANDLERS = {
  [Types.FETCH_REQUEST_CATEGORIES]: fetchRequestCategories,
  [Types.FETCH_REQUEST_CATEGORIES_SUCCESS]: fetchRequestCategoriesSuccess,
  [Types.FETCH_REQUEST_CATEGORIES_FAILURE]: fetchRequestCategoriesFailure,

  [Types.CREATE_REQUEST_CATEGORY]: createRequestCategory,
  [Types.CREATE_REQUEST_CATEGORY_SUCCESS]: createRequestCategorySuccess,
  [Types.CREATE_REQUEST_CATEGORY_FAILURE]: createRequestCategoryFailure,

  [Types.UPDATE_REQUEST_CATEGORY]: updateRequestCategory,
  [Types.UPDATE_REQUEST_CATEGORY_SUCCESS]: updateRequestCategorySuccess,
  [Types.UPDATE_REQUEST_CATEGORY_FAILURE]: updateRequestCategoryFailure,

  [Types.SET_REQUEST_CATEGORY]: setRequestCategory,

  [Types.DELETE_REQUEST_CATEGORY]: deleteRequestCategory,
  [Types.DELETE_REQUEST_CATEGORY_SUCCESS]: deleteRequestCategorySuccess,
  [Types.DELETE_REQUEST_CATEGORY_FAILURE]: deleteRequestCategoryFailure,
  
  [Types.RESET_REQUEST_CATEGORY]: resetRequestCategory
};

export default createReducer(INITIAL_STATE, HANDLERS);
