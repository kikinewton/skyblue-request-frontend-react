import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  stores: [],
  filtered_stores: [],
  store: {},
  loading: false,
  submitting: false,
  submit_success: false,
};


//fetch
export const fetchStores = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null };
};

export const fetchStoresSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, stores: action.responseData, loading: false, filtered_stores: action.responseData }
};

export const fetchStoresFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, stores: [], filtered_stores: []};
};



//create
export const createStore = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, error: null, submit_success: false};
};

export const createStoreSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: true, store: action.responsedata};
};

export const createStoreFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
};

//update
export const updateStore = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, error: null, submit_success: false};
};

export const updateStoreSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: true, store: action.responsedata};
};

export const updateStoreFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
};

//update
export const deleteStore = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, error: null, submit_success: false};
};

export const deleteStoreSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: true, store: action.responsedata};
};

export const deleteStoreFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
};

export const filterStores = (state = INITIAL_STATE, action) => {
  const { filter } = action
  return {
    ...state,
    filtered_stores: state.stores.filter(it => it.name.toLowerCase() === filter.tolowerCase())
  }
}

export const resetStores = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    stores: [],
    error: null,
    loading: false,
    selected_stores: [],
    filtered_stores: []
  };
};


export const HANDLERS = {
  [Types.FETCH_STORES]: fetchStores,
  [Types.FETCH_STORES_SUCCESS]: fetchStoresSuccess,
  [Types.FETCH_STORES_FAILURE]: fetchStoresFailure,

  [Types.CREATE_STORE]: createStore,
  [Types.CREATE_STORE_SUCCESS]: createStoreSuccess,
  [Types.CREATE_STORE_FAILURE]: createStoreFailure,

  [Types.UPDATE_STORE]: updateStore,
  [Types.UPDATE_STORE_SUCCESS]: updateStoreSuccess,
  [Types.UPDATE_STORE_FAILURE]: updateStoreFailure,

  [Types.DELETE_STORE]: deleteStore,
  [Types.DELETE_STORE_SUCCESS]: deleteStoreSuccess,
  [Types.DELETE_STORE_FAILURE]: deleteStoreFailure,

  [Types.FILTER_STORES]: filterStores,

  [Types.RESET_STORES]: resetStores,
};

export default createReducer(INITIAL_STATE, HANDLERS);
