import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  requests: [],
  filtered_requests: [],
  my_requests: [],
  filtered_my_requests: [],
  selected_requests: [],
  request: null,
  loading: false,
  submitting: false,
  submitSuccess: false,
  updating: false,
  update_success: false,
  department: {},
  my_request_meta: {currentPage: 0, pageSize: 10, total: 0, totalPages: 0}
};

//fetch
export const fetchRequests = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const fetchRequestsSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, requests: action.responseData, loading: false, filtered_requests: action.responseData };
};

export const fetchRequestsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, requests: [], filterRequests: [] };
};

//fetch
export const fetchMyRequests = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false, my_requests: [] };
};

export const fetchMyRequestsSuccess = (state = INITIAL_STATE, action) => {
  console.log('response data', action.responseData)
  return { 
    ...state, 
    my_requests: action.responseData?.data, 
    filtered_my_requests: action.responseData?.data,
    loading: false,
    my_request_meta: {...action?.responseData?.meta, currentPage: action.responseData.meta.currentPage}
  };
};

export const fetchMyRequestsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, my_requests: [], filtered_my_requests: []};
};

//get
export const getRequest = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null };
};

export const getRequestSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, request: action.responseData, loading: false};
};

export const getRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, request: null};
};

//create
export const createRequest = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submitSuccess: false };
};

export const setRequest = (state = INITIAL_STATE, action) => {
  return { ...state, request: action.request }
}

export const createRequestSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, submitSuccess: true};
};

export const createRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error};
};

//edit
export const updateRequest = (state = INITIAL_STATE, action) => {
  return { ...state, updating: true, update_success: false, errors: null, loading: false };
};

export const updateRequestSuccess = (state = INITIAL_STATE, action) => {
  return { 
    ...state,
    updating: false,
    update_success: true
  };
};

export const updateRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, updating: false, update_success: false, error: action.error };
};

//edit single
export const updateSingleRequest = (state = INITIAL_STATE, action) => {
  return { ...state, updating: true, update_success: false, errors: null, loading: false };
};

export const updateSingleRequestSuccess = (state = INITIAL_STATE, action) => {
  return { 
    ...state,
    updating: false,
    update_success: true
  };
};

export const updateSingleRequestFailure = (state = INITIAL_STATE, action) => {
  return { ...state, updating: false, update_success: false, error: action.error };
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

export const setSelectedRequests = (state = INITIAL_STATE, action) => {
  return { ...state, selected_requests: action.requests }
}


export const filterMyRequests = (state = INITIAL_STATE, action) => {
  const {filter} = action
  const filtered = state.my_requests.filter(item => {
    return item.name.toLowerCase().includes(filter.toLowerCase()) || 
      item.requestItemRef.toLowerCase().includes(filter.toLowerCase())
  })
  return { ...state, filtered_my_requests: filtered }
}

export const filterRequests = (state = INITIAL_STATE, action) => {
  const {filter} = action
  const filtered = state.requests.filter(item => {
    return item.name.toLowerCase().includes(filter.toLowerCase()) || 
      item.requestItemRef.toLowerCase().includes(filter.toLowerCase())
  })
  return { ...state, filtered_requests: filtered }
}

export const filterRequestsByDepartment = (state = INITIAL_STATE, action) => {
  const {departmentId} = action
  let filtered = state.requests
  
  if(departmentId) {
    filtered = state.requests.filter(item => {
        return item?.userDepartment?.id === departmentId
    })
  }

  return { ...state, filtered_requests: filtered}
}

export const setMyRequestMeta = (state = INITIAL_STATE, action) => {
  const {meta} = action
  return { ...state, my_request_meta: meta}
}

export const resetRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    requests: [],
    request: null,
    my_requests: [],
    my_request_meta: {currentPage: 0, pageSize: 2, total: 0, totalPages: 0},
    selected_requests: [],
    error: null,
    loading: false,
    submitting: false
  };
};

export const HANDLERS = {
  [Types.FETCH_REQUESTS]: fetchRequests,
  [Types.FETCH_REQUESTS_SUCCESS]: fetchRequestsSuccess,
  [Types.FETCH_REQUESTS_FAILURE]: fetchRequestsFailure,

  [Types.GET_REQUEST]: getRequest,
  [Types.GET_REQUEST_SUCCESS]: getRequestSuccess,
  [Types.GET_REQUEST_FAILURE]: getRequestFailure,

  [Types.FETCH_MY_REQUESTS]: fetchMyRequests,
  [Types.FETCH_MY_REQUESTS_SUCCESS]: fetchMyRequestsSuccess,
  [Types.FETCH_MY_REQUESTS_FAILURE]: fetchMyRequestsFailure,
  [Types.FILTER_MY_REQUESTS]: filterMyRequests,

  [Types.CREATE_REQUEST]: createRequest,
  [Types.CREATE_REQUEST_SUCCESS]: createRequestSuccess,
  [Types.CREATE_REQUEST_FAILURE]: createRequestFailure,

  [Types.UPDATE_REQUEST]: updateRequest,
  [Types.UPDATE_REQUEST_SUCCESS]: updateRequestSuccess,
  [Types.UPDATE_REQUEST_FAILURE]: updateRequestFailure,

  [Types.UPDATE_SINGLE_REQUEST]: updateSingleRequest,
  [Types.UPDATE_SINGLE_REQUEST_SUCCESS]: updateSingleRequestSuccess,
  [Types.UPDATE_SINGLE_REQUEST_FAILURE]: updateSingleRequestFailure,

  [Types.DELETE_REQUEST]: deleteRequest,
  [Types.DELETE_REQUEST_SUCCESS]: deleteRequestSuccess,
  [Types.DELETE_REQUEST_FAILURE]: deleteRequestFailure,

  [Types.SET_REQUEST]: setRequest,
  [Types.SET_SELECTED_REQUESTS]: setSelectedRequests,

  [Types.FILTER_REQUESTS]: filterRequests,

  [Types.FILTER_REQUESTS_BY_DEPARTMENT]: filterRequestsByDepartment,


  [Types.SET_MY_REQUEST_META]: setMyRequestMeta,
  [Types.RESET_REQUEST]: resetRequest
};

export default createReducer(INITIAL_STATE, HANDLERS);
