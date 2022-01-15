import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  requests: [],
  my_requests: [],
  filtered_requests: [],
  order: null,
  orders: [],
  request: null,
  selected_requests: [],
  loading: false,
  submitting: false,
  submit_success: false,
};

//fetch
export const fetchMyFloatRequests = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null };
};

export const fetchMyFloatRequestsSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, my_requests: action.responseData, loading: false, filtered_requests: action.responseData};
};

export const fetchMyFloatRequestsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, requests: []};
};

//fetch
export const fetchFloatRequests = (state = INITIAL_STATE, action) => {
  console.log('lets fetch float')
  return { ...state, loading: true, errors: null, submitting: false };
};

export const fetchFloatRequestsSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, requests: action.responseData, loading: false};
};

export const fetchFloatRequestsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, requests: []};
};

//fetch orders
export const fetchFloatOrders = (state = INITIAL_STATE, action) => {
  console.log('lets fetch float')
  return { ...state, loading: true, errors: null, submitting: false };
};

export const fetchFloatOrdersSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, orders: action.responseData, loading: false};
};

export const fetchFloatOrdersFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, orders: []};
};

//fetch order
export const fetchFloatOrder = (state = INITIAL_STATE, action) => {
  console.log('lets fetch float')
  return { ...state, loading: true, errors: null, submitting: false };
};

export const fetchFloatOrderSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, order: action.responseData, loading: false};
};

export const fetchFloatOrderFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, order: null};
};

//update float order status
export const updateFloatOrderStatus = (state = INITIAL_STATE, action) => {
  console.log('lets fetch float')
  return { ...state, submitting: true, errors: null, submit_success: false };
};

export const upadteFloatOrderStatusSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submit_success: true};
};

export const updateFloatOrderStatusFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
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
  return { ...state, submitting: true, errors: null, loading: false, submit_success: false };
};

export const createFloatRequestSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submit_success: true};
};

export const createFloatRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error};
};

//edit
export const updateFloatRequest = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submit_success: false };
};

export const updateFloatRequestSuccess = (state = INITIAL_STATE, action) => {
  return { 
    ...state,
    submitting: false,
    submit_success: true
  };
};

export const updateFloatRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
};

//edit single
export const updateSingleFloatRequest = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submit_success: false };
};

export const updateSingleFloatRequestSuccess = (state = INITIAL_STATE, action) => {
  return { 
    ...state,
    submitting: false,
    submit_success: true
  };
};

export const updateSingleFloatRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
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


export const setSelectedFloatRequests = (state = INITIAL_STATE, action) => {
  console.log('set seleted float requests', action.requests)
  return { ...state, selected_requests: action?.requests};
};

//allocate funds
export const allocateFundsToFloatRequest = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, submit_success: false };
};

export const allocateFundsToFloatRequestSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submit_success: true};
};

export const allocateFundsToFloatRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error};
};

//filter
export const filterFloatRequests = (state = INITIAL_STATE, action) => {
  const {filter} = action
  return{
    ...state,
    filtered_requests: state.requests.filter(rq => {
      return rq?.createdBy?.fullName === filter || rq?.floatRef === filter
    })
  }
}

export const resetFloatRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    requests: [],
    my_requests: [],
    error: null,
    loading: false,
    submitting: false,
    filtered_requests: [],
    orders: []
  };
};

export const HANDLERS = {
  [Types.FETCH_FLOAT_REQUESTS]: fetchFloatRequests,
  [Types.FETCH_FLOAT_REQUESTS_SUCCESS]: fetchFloatRequestsSuccess,
  [Types.FETCH_FLOAT_REQUESTS_FAILURE]: fetchFloatRequestsFailure,

  [Types.FETCH_FLOAT_ORDERS]: fetchFloatOrders,
  [Types.FETCH_FLOAT_ORDERS_SUCCESS]: fetchFloatOrdersSuccess,
  [Types.FETCH_FLOAT_ORDERS_FAILURE]: fetchFloatOrdersFailure,

  [Types.FETCH_FLOAT_ORDER]: fetchFloatOrder,
  [Types.FETCH_FLOAT_ORDER_SUCCESS]: fetchFloatOrderSuccess,
  [Types.FETCH_FLOAT_ORDER_FAILURE]: fetchFloatOrderFailure,

  [Types.UPDATE_FLOAT_ORDER_STATUS]: updateFloatOrderStatus,
  [Types.UPDATE_FLOAT_ORDER_STATUS_SUCCESS]: upadteFloatOrderStatusSuccess,
  [Types.UPDATE_FLOAT_ORDER_STATUS_FAILURE]: updateFloatOrderStatusFailure,

  [Types.FETCH_MY_FLOAT_REQUESTS]: fetchMyFloatRequests,
  [Types.FETCH_MY_FLOAT_REQUESTS_SUCCESS]: fetchMyFloatRequestsSuccess,
  [Types.FETCH_MY_FLOAT_REQUESTS_FAILURE]: fetchMyFloatRequestsFailure,

  [Types.CREATE_FLOAT_REQUEST]: createFloatRequest,
  [Types.CREATE_FLOAT_REQUEST_SUCCESS]: createFloatRequestSuccess,
  [Types.CREATE_FLOAT_REQUEST_FAILURE]: createFloatRequestFailure,

  [Types.UPDATE_FLOAT_REQUEST]: updateFloatRequest,
  [Types.UPDATE_FLOAT_REQUEST_SUCCESS]: updateFloatRequestSuccess,
  [Types.UPDATE_FLOAT_REQUEST_FAILURE]: updateFloatRequestFailure,

  [Types.UPDATE_SINGLE_FLOAT_REQUEST]: updateSingleFloatRequest,
  [Types.UPDATE_SINGLE_FLOAT_REQUEST_SUCCESS]: updateSingleFloatRequestSuccess,
  [Types.UPDATE_SINGLE_FLOAT_REQUEST_FAILURE]: updateSingleFloatRequestFailure,

  [Types.DELETE_FLOAT_REQUEST]: deleteRequest,
  [Types.DELETE_FLOAT_REQUEST_SUCCESS]: deleteRequestSuccess,
  [Types.DELETE_FLOAT_REQUEST_FAILURE]: deleteRequestFailure,

  [Types.ALLOCATE_FUNDS_TO_FLOAT_REQUEST]: allocateFundsToFloatRequest,
  [Types.ALLOCATE_FUNDS_TO_FLOAT_REQUEST_SUCCESS]: allocateFundsToFloatRequestSuccess,
  [Types.ALLOCATE_FUNDS_TO_FLOAT_REQUEST_FAILURE]: allocateFundsToFloatRequestFailure,

  [Types.SET_SELECTED_FLOAT_REQUESTS]: setSelectedFloatRequests,

  [Types.FILTER_FLOAT_REQUESTS]: filterFloatRequests,
  
  [Types.RESET_FLOAT_REQUEST]: resetFloatRequest
};

export default createReducer(INITIAL_STATE, HANDLERS);
