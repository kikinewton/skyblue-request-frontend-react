import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  requests: [],
  loading: false,
  submitting: false,
  submitSuccess: false,
  department: {}
};

//fetch
export const fetchRequests = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const fetchRequestsSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, requests: action.responseData, loading: false};
};

export const fetchRequestsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, requests: []};
};

//get
export const getRequest = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const getRequestSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, department: action.responseData, loading: false};
};

export const getRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error};
};

//create
export const createRequest = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submitSuccess: false };
};

export const createRequestSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submitSuccess: true};
};

export const createRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error};
};

//edit
export const updateRequest = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submitSuccess: false };
};

export const updateRequestSuccess = (state = INITIAL_STATE, action) => {
  return { 
    ...state,
    submitting: false,
    submitSuccess: true
  };
};

export const updateRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submitSuccess: false};
};


//delete
export const deleteRequest = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false };
};

export const deleteRequestSuccess = (state = INITIAL_STATE, action) => {
  const { departmentId } = action
  return { 
    ...state, 
    requests: state.requests.filter(item=> item.id !== departmentId),
    submitting: false
  };
};

export const deleteRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error};
};


export const resetRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    requests: [],
    error: null,
    loading: false,
    submitting: false
  };
};

export const HANDLERS = {
  [Types.FETCH_REQUESTS]: fetchRequests,
  [Types.FETCH_REQUESTS_SUCCESS]: fetchRequestsSuccess,
  [Types.FETCH_REQUESTS_FAILURE]: fetchRequestsFailure,

  [Types.CREATE_REQUEST]: createRequest,
  [Types.CREATE_REQUEST_SUCCESS]: createRequestSuccess,
  [Types.CREATE_REQUEST_FAILURE]: createRequestFailure,

  [Types.UPDATE_REQUEST]: updateRequest,
  [Types.UPDATE_REQUEST_SUCCESS]: updateRequestSuccess,
  [Types.UPDATE_REQUEST_FAILURE]: updateRequestFailure,

  [Types.DELETE_REQUEST]: deleteRequest,
  [Types.DELETE_REQUEST_SUCCESS]: deleteRequestSuccess,
  [Types.DELETE_REQUEST_FAILURE]: deleteRequestFailure,
  
  [Types.RESET_REQUEST]: resetRequest
};

export default createReducer(INITIAL_STATE, HANDLERS);
