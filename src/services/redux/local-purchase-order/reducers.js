import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  local_purchase_orders: [],
  local_purchase_order: null,
  local_purchase_order_drafts: [],
  filtered_local_purchase_orders: [],
  loading: false,
  submitting: false,
  submit_success: false,
  meta: {currentPage: 0, pageSize: 20, total: 0, totalPages: 0},
};

//fetch
export const fetchLocalPurchaseOrders = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false, local_purchase_orders: [] };
};

export const fetchLocalPurchaseOrdersSuccess = (state = INITIAL_STATE, action) => {
  const { responseData } = action
  if(responseData?.meta) {
    return {
      ...state, 
      local_purchase_orders: action.responseData.data, 
      loading: false, 
      filtered_local_purchase_orders: action.responseData,
      meta: {
        ...action?.responseData?.meta, 
        currentPage: action.responseData.meta.currentPage, 
        pageSize: action.responseData.meta.pageSize,
        total: action.responseData.meta.total,
        totalPages: action.responseData.meta.totalPages
      }
    };
  } else {
    return {
      ...state, 
      local_purchase_orders: action.responseData, 
      loading: false, 
      filtered_local_purchase_orders: action.responseData,
    };
  }

};

export const fetchLocalPurchaseOrdersFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, local_purchase_orders: [], filtered_local_purchase_orders: []};
};

//fetch by id
export const fetchLocalPurchaseOrder = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false, local_purchase_order: null };
};

export const fetchLocalPurchaseOrderSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, local_purchase_order: action.responseData, loading: false};
};

export const fetchLocalPurchaseOrderFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, local_purchase_order: action.responseData};
};


//fetch drafts
export const fetchLocalPurchaseOrderDrafts = (state = INITIAL_STATE, action) => {
  console.log('fetcing lpo drafts reducer')
  return { ...state, loading: true, errors: null, local_purchase_order_drafts: [] };
};

export const fetchLocalPurchaseOrderDraftsSuccess = (state = INITIAL_STATE, action) => {
  console.log('actions succes fetch dafts', action)
  const { responseData } = action
  if(responseData?.meta) {
    return { 
      ...state, 
      local_purchase_order_drafts: responseData?.data, 
      loading: false,
      meta: {
        ...state.meta,
        currentPage: responseData.meta.currentPage, 
        pageSize: responseData.meta.pageSize,
        total: responseData.meta.total,
        totalPages: responseData.meta.totalPages
      }
    };
  } else {
    return {
      ...state, 
      local_purchase_order_drafts: action.responseData?.data, 
      loading: false
    };
  }
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

//create draft
export const createLocalPurchaseOrderDraft = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, submit_success: false };
};

export const createLocalPurchaseOrderDraftSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submit_success: true};
};

export const createLocalPurchaseOrderDraftFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error};
};

export const filterLocalPurchaseOrders = (state = INITIAL_STATE, action) => {
  const {filter} = action
  const filteredResult = state.local_purchase_orders.filter(lpo => {
    const supplier = lpo?.quotation?.supplier?.name.toLowerCase()
      return lpo?.referenceNumber?.toLowerCase().includes(filter.toLowerCase()) || supplier.includes(filter.toLowerCase()) 
    }
    ) || []
  return { ...state, filtered_local_purchase_orders:  filteredResult}
}


export const resetLocalPurchaseOrder = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    local_purchase_orders: [],
    local_purchase_order: null,
    local_purchase_order_drafts: [],
    error: null,
    loading: false,
    submitting: false,
    meta: {currentPage: 0, pageSize: 10, total: 0, totalPages: 0},
  };
};

export const HANDLERS = {
  [Types.FETCH_LOCAL_PURCHASE_ORDERS]: fetchLocalPurchaseOrders,
  [Types.FETCH_LOCAL_PURCHASE_ORDERS_SUCCESS]: fetchLocalPurchaseOrdersSuccess,
  [Types.FETCH_LOCAL_PURCHASE_ORDERS_FAILURE]: fetchLocalPurchaseOrdersFailure,

  [Types.FETCH_LOCAL_PURCHASE_ORDER]: fetchLocalPurchaseOrder,
  [Types.FETCH_LOCAL_PURCHASE_ORDER_SUCCESS]: fetchLocalPurchaseOrderSuccess,
  [Types.FETCH_LOCAL_PURCHASE_ORDER_FAILURE]: fetchLocalPurchaseOrderFailure,

  [Types.FETCH_LOCAL_PURCHASE_ORDER_DRAFTS]: fetchLocalPurchaseOrderDrafts,
  [Types.FETCH_LOCAL_PURCHASE_ORDER_DRAFTS_SUCCESS]: fetchLocalPurchaseOrderDraftsSuccess,
  [Types.FETCH_LOCAL_PURCHASE_ORDER_DRAFTS_FAILURE]: fetchLocalPurchaseOrderDraftsFailure,

  [Types.CREATE_LOCAL_PURCHASE_ORDER]: createLocalPurchaseOrder,
  [Types.CREATE_LOCAL_PURCHASE_ORDER_SUCCESS]: createLocalPurchaseOrderSuccess,
  [Types.CREATE_LOCAL_PURCHASE_ORDER_FAILURE]: createLocalPurchaseOrderFailure,

  [Types.CREATE_LOCAL_PURCHASE_ORDER_DRAFT]: createLocalPurchaseOrderDraft,
  [Types.CREATE_LOCAL_PURCHASE_ORDER_DRAFT_SUCCESS]: createLocalPurchaseOrderDraftSuccess,
  [Types.CREATE_LOCAL_PURCHASE_ORDER_DRAFT_FAILURE]: createLocalPurchaseOrderDraftFailure,

  [Types.FILTER_LOCAL_PURCHASE_ORDERS]: filterLocalPurchaseOrders,
  
  [Types.RESET_LOCAL_PURCHASE_ORDER]: resetLocalPurchaseOrder
};

export default createReducer(INITIAL_STATE, HANDLERS);
