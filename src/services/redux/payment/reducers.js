import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  payments: [],
  payment: null,
  payment_drafts: [],
  payment_draft: null,
  loading: false,
  submitting: false,
  submit_success: false,
  filtered_payments: [],
  filtered_payment_drafts: [],

  filtered_payment_drafts: [],

};

//fetch
export const fetchPayments = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const fetchPaymentsSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, payments: action.responseData, loading: false, filtered_payments: action.responseData};
};

export const fetchPaymentsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, payments: [], filtered_payments: []};
};

//edit
export const updatePayment = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submit_success: false };
};

export const updatePaymentSuccess = (state = INITIAL_STATE, action) => {
  const { paymentId, responseData } = action
  return { 
    ...state, 
    payments: state.payments.map(item=> {
      if(item.id === paymentId) {
        return responseData
      } else {
        return item
      }
    }),
    filtered_payments: state.payments.map(item=> {
      if(item.id === paymentId) {
        return responseData
      } else {
        return item
      }
    }),
    submitting: false,
    submit_success: true
  };
};

export const updatePaymentFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
};

export const createPayment = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, submit_success: false };
};

export const createPaymentSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submit_success: true };
};

export const createPaymentFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submit_success: false };
};

export const filterPayments = (state = INITIAL_STATE, action) => {
  const {filter} = action
  console.log('filter', filter)
  return {...state, 
    filtered_payments: state.payments.filter(it => it?.payment?.paymentRef?.toLowerCase().includes(filter) || 
    it?.payment?.supplier?.name?.toLowerCase().includes(filter))
  }
}

export const resetPayment = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    errors: null,
    payments: [],
    payment: null,
    loading: false,
    submitting: false,
    submit_success: false,
    filtered_payments: [],
  };
};


////////////////////DRAFTS/////////////////////////////
//fetch
export const fetchPaymentDrafts = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const fetchPaymentDraftsSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, payment_drafts: action.responseData, loading: false, filtered_payment_drafts: action.responseData};
};

export const fetchPaymentDraftsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, payments: [], filtered_payment_drafts: []};
};

//edit
export const updatePaymentDraft = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submit_success: false };
};

export const updatePaymentDraftSuccess = (state = INITIAL_STATE, action) => {
  const { paymentId, responseData } = action
  return {
    ...state, 
    payment_drafts: state.payments.map(item=> {
      if(item.id === paymentId) {
        return responseData
      } else {
        return item
      }
    }),
    filtered_payment_drafts: state.payments.map(item=> {
      if(item.id === paymentId) {
        return responseData
      } else {
        return item
      }
    }),
    submitting: false,
    submit_success: true
  };
};

export const updatePaymentDraftFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
};

export const createPaymentDraft = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, submit_success: false };
};

export const createPaymentDraftSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submit_success: true };
};

export const createPaymentDraftFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submit_success: false };
};

export const filterPaymentDrafts = (state = INITIAL_STATE, action) => {
  const {filter} = action
  console.log('filter', filter)
  return {...state, 
    filtered_payment_drafts: state.payments.filter(it => it?.payment?.paymentRef?.toLowerCase().includes(filter) || 
    it?.payment?.supplier?.name?.toLowerCase().includes(filter))
  }
}

export const resetPaymentDraft = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    payment_drafts: [],
    filtered_payment_drafts: [],
    error: null,
    loading: false,
    submitting: false
  };
};

export const HANDLERS = {
  [Types.FETCH_PAYMENTS]: fetchPayments,
  [Types.FETCH_PAYMENTS_SUCCESS]: fetchPaymentsSuccess,
  [Types.FETCH_PAYMENTS_FAILURE]: fetchPaymentsFailure,

  [Types.UPDATE_PAYMENT]: updatePayment,
  [Types.UPDATE_PAYMENT_SUCCESS]: updatePaymentSuccess,
  [Types.UPDATE_PAYMENT_FAILURE]: updatePaymentFailure,

  [Types.CREATE_PAYMENT]: createPayment,
  [Types.CREATE_PAYMENT_SUCCESS]: createPaymentSuccess,
  [Types.CREATE_PAYMENT_FAILURE]: createPaymentFailure,

  [Types.FILTER_PAYMENTS]: filterPayments,
  
  [Types.RESET_PAYMENT]: resetPayment,


  [Types.FETCH_PAYMENT_DRAFTS]: fetchPaymentDrafts,
  [Types.FETCH_PAYMENT_DRAFTS_SUCCESS]: fetchPaymentDraftsSuccess,
  [Types.FETCH_PAYMENT_DRAFTS_FAILURE]: fetchPaymentDraftsFailure,

  [Types.UPDATE_PAYMENT_DRAFT]: updatePaymentDraft,
  [Types.UPDATE_PAYMENT_DRAFT_SUCCESS]: updatePaymentSuccess,
  [Types.UPDATE_PAYMENT_DRAFT_FAILURE]: updatePaymentDraftFailure,

  [Types.CREATE_PAYMENT_DRAFT]: createPaymentDraft,
  [Types.CREATE_PAYMENT_DRAFT_SUCCESS]: createPaymentDraftSuccess,
  [Types.CREATE_PAYMENT_DRAFT_FAILURE]: createPaymentDraftFailure,

  [Types.FILTER_PAYMENT_DRAFTS]: filterPaymentDrafts,
  
  [Types.RESET_PAYMENT_DRAFT]: resetPaymentDraft,
};

export default createReducer(INITIAL_STATE, HANDLERS);
