import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  quotations: [],
  loading: false,
  submitting: false,
  submitSuccess: false
};

//fetch
export const fetchQuotations = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const fetchQuotationsSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, quotations: action.responseData, loading: false};
};

export const fetchQuotationsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error};
};

//edit
export const updateQuotation = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submitSuccess: false };
};

export const updateQuotationSuccess = (state = INITIAL_STATE, action) => {
  const { quotationId, responseData } = action
  return { 
    ...state, 
    quotations: state.quotations.map(item=> {
      if(item.id === quotationId) {
        return responseData
      } else {
        return item
      }
    }),
    submitting: false,
    submitSuccess: true
  };
};

export const updateQuotationFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submitSuccess: false};
};


export const resetQuotation = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    quotations: [],
    error: null,
    loading: false,
    submitting: false
  };
};

export const HANDLERS = {
  [Types.FETCH_QUOTATIONS]: fetchQuotations,
  [Types.FETCH_QUOTATIONS_SUCCESS]: fetchQuotationsSuccess,
  [Types.FETCH_QUOTATIONS_FAILURE]: fetchQuotationsFailure,

  [Types.UPDATE_QUOTATION]: updateQuotation,
  [Types.UPDATE_QUOTATION_SUCCESS]: updateQuotationSuccess,
  [Types.UPDATE_QUOTATION_FAILURE]: updateQuotationFailure,
  
  [Types.RESET_QUOTATION]: resetQuotation
};

export default createReducer(INITIAL_STATE, HANDLERS);