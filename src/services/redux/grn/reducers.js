import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  grns: [],
  grn: null,
  selected_grns: [],
  loading: false,
  submitting: false,
  submit_success: false,
};

//fetch
export const fetchGrns = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const fetchGrnsSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, grns: action.responseData, loading: false};
};

export const fetchGrnsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, grns: []};
};

//get
export const fetchGrn = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const fetchGrnSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, department: action.responseData, loading: false};
};

export const fetchGrnFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error};
};

//create
export const createGrn = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, submit_success: false };
};

export const createGrnSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submit_success: true};
};

export const createGrnFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error};
};

//edit
export const updateGrn = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submit_success: false };
};

export const updateGrnSuccess = (state = INITIAL_STATE, action) => {
  return { 
    ...state,
    submitting: false,
    submit_success: true
  };
};

export const updateGrnFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
};


export const deleteGrnFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error};
};


export const setSelectedGrns = (state = INITIAL_STATE, action) => {
  console.log('set seleted float grns', action.grns)
  return { ...state, selected_grns: action?.grns};
};

export const resetGrn = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    grns: [],
    grn: null,
    error: null,
    loading: false,
    submitting: false
  };
};

export const HANDLERS = {
  [Types.FETCH_GRNS]: fetchGrns,
  [Types.FETCH_GRNS_SUCCESS]: fetchGrnsSuccess,
  [Types.FETCH_GRNS_FAILURE]: fetchGrnsFailure,

  [Types.FETCH_GRN]: fetchGrn,
  [Types.FETCH_GRN_SUCCESS]: fetchGrnSuccess,
  [Types.FETCH_GRN_FAILURE]: fetchGrnFailure,

  [Types.CREATE_GRN]: createGrn,
  [Types.CREATE_GRN_SUCCESS]: createGrnSuccess,
  [Types.CREATE_GRN_FAILURE]: createGrnFailure,

  [Types.UPDATE_GRN]: updateGrn,
  [Types.UPDATE_GRN_SUCCESS]: updateGrnSuccess,
  [Types.UPDATE_GRN_FAILURE]: updateGrnFailure,

  [Types.SET_SELECTED_GRNS]: setSelectedGrns,
  
  [Types.RESET_GRN]: resetGrn
};

export default createReducer(INITIAL_STATE, HANDLERS);
