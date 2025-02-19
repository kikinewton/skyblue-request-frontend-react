import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  requests: [],
  request: null,
  my_requests: [],
  loading: false,
  submitting: false,
  submit_success: false,
  selected_requests: []
};

//fetch
export const fetchMyPettyCashRequests = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null };
};

export const fetchMyPettyCashRequestsSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, my_requests: action.responseData, loading: false};
};

export const fetchMyPettyCashRequestsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error };
};

//fetch
export const fetchPettyCashRequests = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const fetchPettyCashRequestsSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, requests: action.responseData, loading: false};
};

export const fetchPettyCashRequestsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, requests: []};
};

//get
export const getPettyCashRequest = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const getPettyCashRequestSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, request: action.responseData, loading: false};
};

export const getPettyCashRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error};
};

//create
export const createPettyCashRequest = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submit_success: false };
};

export const createPettyCashRequestSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submit_success: true};
};

export const createPettyCashRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error};
};

//edit
export const updatePettyCashRequest = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submit_success: false };
};

export const updatePettyCashRequestSuccess = (state = INITIAL_STATE, action) => {
  return { 
    ...state,
    submitting: false,
    submit_success: true
  };
};

export const updatePettyCashRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
};

//edit bulk
export const updateBulkPettyCashRequest = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, submit_success: false };
};

export const updateBulkPettyCashRequestSuccess = (state = INITIAL_STATE, action) => {
  return { 
    ...state,
    submitting: false,
    submit_success: true
  };
};

export const updateBulkPettyCashRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
};


//delete
export const deletePettyCashRequest = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false };
};

export const deletePettyCashRequestSuccess = (state = INITIAL_STATE, action) => {
  const { departmentId } = action
  return { 
    ...state, 
    requests: state.requests.filter(item=> item.id !== departmentId),
    submitting: false
  };
};

export const deletePettyCashRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error};
};

export const setSelectedPettyCashRequests = (state = INITIAL_STATE, action) => {
  return {...state, selected_requests: action.requests}
}


//allocate funds
export const allocateFundsToPettyCashRequest = (state = INITIAL_STATE, action) => {
  console.log('hey in reducer')
  return { ...state, submitting: true, errors: null, submit_success: false };
};

export const allocateFundsToPettyCashRequestSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submit_success: true};
};

export const allocateFundsToPettyCashRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error};
};


export const resetPettyCashRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    requests: [],
    selected_requests: [],
    my_requests: [],
    error: null,
    loading: false,
    submitting: false,
    submit_success: false,
  };
};

export const HANDLERS = {
  [Types.FETCH_PETTY_CASH_REQUESTS]: fetchPettyCashRequests,
  [Types.FETCH_PETTY_CASH_REQUESTS_SUCCESS]: fetchPettyCashRequestsSuccess,
  [Types.FETCH_PETTY_CASH_REQUESTS_FAILURE]: fetchPettyCashRequestsFailure,

  [Types.FETCH_MY_PETTY_CASH_REQUESTS]: fetchMyPettyCashRequests,
  [Types.FETCH_MY_PETTY_CASH_REQUESTS_SUCCESS]: fetchMyPettyCashRequestsSuccess,
  [Types.FETCH_MY_PETTY_CASH_REQUESTS_FAILURE]: fetchMyPettyCashRequestsFailure,

  [Types.CREATE_PETTY_CASH_REQUEST]: createPettyCashRequest,
  [Types.CREATE_PETTY_CASH_REQUEST_SUCCESS]: createPettyCashRequestSuccess,
  [Types.CREATE_PETTY_CASH_REQUEST_FAILURE]: createPettyCashRequestFailure,

  [Types.UPDATE_PETTY_CASH_REQUEST]: updatePettyCashRequest,
  [Types.UPDATE_PETTY_CASH_REQUEST_SUCCESS]: updatePettyCashRequestSuccess,
  [Types.UPDATE_PETTY_CASH_REQUEST_FAILURE]: updatePettyCashRequestFailure,

  [Types.UPDATE_BULK_PETTY_CASH_REQUEST]: updateBulkPettyCashRequest,
  [Types.UPDATE_BULK_PETTY_CASH_REQUEST_SUCCESS]: updateBulkPettyCashRequestSuccess,
  [Types.UPDATE_BULK_PETTY_CASH_REQUEST_FAILURE]: updateBulkPettyCashRequestFailure,

  [Types.DELETE_PETTY_CASH_REQUEST]: deletePettyCashRequest,
  [Types.DELETE_PETTY_CASH_REQUEST_SUCCESS]: deletePettyCashRequestSuccess,
  [Types.DELETE_PETTY_CASH_REQUEST_FAILURE]: deletePettyCashRequestFailure,

  [Types.ALLOCATE_FUNDS_TO_PETTY_CASH_REQUEST]: allocateFundsToPettyCashRequest,
  [Types.ALLOCATE_FUNDS_TO_PETTY_CASH_REQUEST_SUCCESS]: allocateFundsToPettyCashRequestSuccess,
  [Types.ALLOCATE_FUNDS_TO_PETTY_CASH_REQUEST_FAILURE]: allocateFundsToPettyCashRequestFailure,

  [Types.SET_SELECTED_PETTY_CASH_REQUESTS]: setSelectedPettyCashRequests,
  
  [Types.RESET_PETTY_CASH_REQUEST]: resetPettyCashRequest
};

export default createReducer(INITIAL_STATE, HANDLERS);
