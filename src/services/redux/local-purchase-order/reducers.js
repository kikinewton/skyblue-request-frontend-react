import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  local_purchase_orders: [],
  local_purchase_order: null,
  local_purchase_order_drafts: [],
  loading: false,
  submitting: false,
  submit_success: false,
};

//fetch
export const fetchLocalPurchaseOrders = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false, local_purchase_orders: [] };
};

export const fetchLocalPurchaseOrdersSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, local_purchase_orders: action.responseData, loading: false};
};

export const fetchLocalPurchaseOrdersFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, local_purchase_orders: []};
};


//fetch drafts
export const fetchLocalPurchaseOrderDrafts = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false, local_purchase_orders: [] };
};

export const fetchLocalPurchaseOrderDraftsSuccess = (state = INITIAL_STATE, action) => {
  console.log('actions succes fetch dafts', action)
  return { ...state, local_purchase_order_drafts: action.responseData, loading: false};
};

export const fetchLocalPurchaseOrderDraftsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, local_purchase_orders: []};
};

//create
export const createLocalPurchaseOrder = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, submit_success: false };
};

export const createLocalPurchaseOrderSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submit_success: true, local_purchase_order: action.responseData};
};

export const createLocalPurchaseOrderFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, local_purchase_order: null};
};


export const resetLocalPurchaseOrder = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    local_purchase_orders: [],
    local_purchase_order: null,
    local_purchase_order_drafts: [],
    error: null,
    loading: false,
    submitting: false
  };
};

export const HANDLERS = {
  [Types.FETCH_LOCAL_PURCHASE_ORDERS]: fetchLocalPurchaseOrders,
  [Types.FETCH_LOCAL_PURCHASE_ORDERS_SUCCESS]: fetchLocalPurchaseOrdersSuccess,
  [Types.FETCH_LOCAL_PURCHASE_ORDERS_FAILURE]: fetchLocalPurchaseOrdersFailure,

  [Types.FETCH_LOCAL_PURCHASE_ORDERS]: fetchLocalPurchaseOrderDrafts,
  [Types.FETCH_LOCAL_PURCHASE_ORDER_DRAFTS_SUCCESS]: fetchLocalPurchaseOrderDraftsSuccess,
  [Types.FETCH_LOCAL_PURCHASE_ORDER_DRAFTS_FAILURE]: fetchLocalPurchaseOrderDraftsFailure,

  [Types.CREATE_LOCAL_PURCHASE_ORDER]: createLocalPurchaseOrder,
  [Types.CREATE_LOCAL_PURCHASE_ORDER_SUCCESS]: createLocalPurchaseOrderSuccess,
  [Types.CREATE_LOCAL_PURCHASE_ORDER_FAILURE]: createLocalPurchaseOrderFailure,
  
  [Types.RESET_LOCAL_PURCHASE_ORDER]: resetLocalPurchaseOrder
};

export default createReducer(INITIAL_STATE, HANDLERS);
