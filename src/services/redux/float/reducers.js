import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  float_requests: [],
  my_float_requests: null,
  float_request: null,
  loading: false,
  submitting: false,
  submitSuccess: false,
};

//fetch
export const fetchMyFloatRequests = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null };
};

export const fetchMyFloatRequestsSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, my_float_requests: action.responseData, loading: false};
};

export const fetchMyFloatRequestsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, requests: []};
};

//fetch
export const fetchFloatRequests = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const fetchFloatRequestsSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, float_requests: action.responseData, loading: false};
};

export const fetchFloatRequestsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, requests: []};
};

//get
export const getFloatRequest = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const getFloatRequestSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, department: action.responseData, loading: false};
};

export const getFloatRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error};
};

//create
export const createFloatRequest = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submitSuccess: false };
};

export const createFloatRequestSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submitSuccess: true};
};

export const createFloatRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error};
};

//edit
export const updateFloatRequest = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submitSuccess: false };
};

export const updateFloatRequestSuccess = (state = INITIAL_STATE, action) => {
  return { 
    ...state,
    submitting: false,
    submitSuccess: true
  };
};

export const updateFloatRequestFailure = (state = INITIAL_STATE, action) => {
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


export const resetFloatRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    float_requests: [],
    my_float_requests: [],
    error: null,
    loading: false,
    submitting: false
  };
};

export const HANDLERS = {
  [Types.FETCH_FLOAT_REQUESTS]: fetchFloatRequests,
  [Types.FETCH_FLOAT_REQUESTS_SUCCESS]: fetchFloatRequestsSuccess,
  [Types.FETCH_FLOAT_REQUESTS_FAILURE]: fetchFloatRequestsFailure,

  [Types.FETCH_MY_FLOAT_REQUESTS]: fetchMyFloatRequests,
  [Types.FETCH_MY_FLOAT_REQUESTS_SUCCESS]: fetchMyFloatRequestsSuccess,
  [Types.FETCH_MY_FLOAT_REQUESTS_FAILURE]: fetchMyFloatRequestsFailure,

  [Types.CREATE_FLOAT_REQUEST]: createFloatRequest,
  [Types.CREATE_FLOAT_REQUEST_SUCCESS]: createFloatRequestSuccess,
  [Types.CREATE_FLOAT_REQUEST_FAILURE]: createFloatRequestFailure,

  [Types.UPDATE_FLOAT_REQUEST]: updateFloatRequest,
  [Types.UPDATE_FLOAT_REQUEST_SUCCESS]: updateFloatRequestSuccess,
  [Types.UPDATE_FLOAT_REQUEST_FAILURE]: updateFloatRequestFailure,

  [Types.DELETE_FLOAT_REQUEST]: deleteRequest,
  [Types.DELETE_FLOAT_REQUEST_SUCCESS]: deleteRequestSuccess,
  [Types.DELETE_FLOAT_REQUEST_FAILURE]: deleteRequestFailure,
  
  [Types.RESET_FLOAT_REQUEST]: resetFloatRequest
};

export default createReducer(INITIAL_STATE, HANDLERS);