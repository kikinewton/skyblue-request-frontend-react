import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  comments: [],
  loading: false,
  submitting: false,
  submit_success: false,
};

//fetch
export const fetchComments = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const fetchCommentsSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, comments: action.responseData, loading: false };
};

export const fetchCommentsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, comments: [] };
};

//create
export const createComment = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submit_success: false };
};

export const createCommentSuccess = (state = INITIAL_STATE, action) => {
  console.log('resposeData', action.responseData)
  return {
    ...state,
    submitting: false, 
    submit_success: true
  };
};

export const createCommentFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
};

export const resetComment = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    comments: [],
    error: null,
    loading: false,
    submitting: false
  };
};

export const HANDLERS = {
  [Types.FETCH_COMMENTS]: fetchComments,
  [Types.FETCH_COMMENTS_SUCCESS]: fetchCommentsSuccess,
  [Types.FETCH_COMMENTS_FAILURE]: fetchCommentsFailure,

  [Types.CREATE_COMMENT]: createComment,
  [Types.CREATE_COMMENT_SUCCESS]: createCommentSuccess,
  [Types.CREATE_COMMENT_FAILURE]: createCommentFailure,
  
  [Types.RESET_COMMENT]: resetComment
};

export default createReducer(INITIAL_STATE, HANDLERS);