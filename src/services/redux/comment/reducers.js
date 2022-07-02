import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  comments: [],
  loading: false,
  submitting: false,
  submit_success: false,
  new_comment: '',
  itemId: null
};

//fetch
export const fetchComments = (state = INITIAL_STATE, action) => {
  const {itemId} = action
  return { ...state, loading: true, errors: null, submitting: false, itemId: itemId };
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
  const { responseData } = action
  const comments = state.comments.concat(responseData)
  return {
    ...state,
    submitting: false, 
    submit_success: true,
    new_comment: '',
    comments
  };
};

export const createCommentFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
};

//create
export const createCommentWithCancel = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submit_success: false };
};

export const createCommentWithCancelSuccess = (state = INITIAL_STATE, action) => {
  console.log('resposeData', action.responseData)
  return {
    ...state,
    submitting: false, 
    submit_success: true,
    new_comment: ''
  };
};

export const createCommentWithCancelFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
};

export const setNewComment = (state = INITIAL_STATE, action) => {
  const {newComment} = action
  return {
    ...state,
    new_comment: newComment
  }
}

export const resetComment = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    comments: [],
    error: null,
    loading: false,
    submitting: false,
    new_comment: '',
    itemId: null
  };
};

export const HANDLERS = {
  [Types.FETCH_COMMENTS]: fetchComments,
  [Types.FETCH_COMMENTS_SUCCESS]: fetchCommentsSuccess,
  [Types.FETCH_COMMENTS_FAILURE]: fetchCommentsFailure,

  [Types.CREATE_COMMENT]: createComment,
  [Types.CREATE_COMMENT_SUCCESS]: createCommentSuccess,
  [Types.CREATE_COMMENT_FAILURE]: createCommentFailure,

  [Types.CREATE_COMMENT_WITH_CANCEL]: createCommentWithCancel,
  [Types.CREATE_COMMENT_WITH_CANCEL_SUCCESS]: createCommentWithCancelSuccess,
  [Types.CREATE_COMMENT_WITH_CANCEL_FAILURE]: createCommentWithCancelFailure,
  
  [Types.RESET_COMMENT]: resetComment,
  [Types.SET_NEW_COMMENT]: setNewComment
};

export default createReducer(INITIAL_STATE, HANDLERS);
