import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  suppliers: [],
  supplier: {},
  loaidng: false,
  submitting: false,
  submit_success: false,
  selected_suppliers: [],
  filtered_suppliers: []
};


//fetch
export const fetchSuppliers = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null };
};

export const fetchSuppliersSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, suppliers: action.responseData, loading: false, filtered_suppliers: action.responseData};
};

export const fetchSuppliersFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, suppliers: [], filtered_suppliers: []};
};

//get
export const getSupplier = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null };
};

export const getSupplierSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, supplier: action.responseData, loading: false};
};

export const getSupplierFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error};
};


//create
export const createSupplier = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, error: null, submit_success: false};
};

export const createSupplierSuccess = (state = INITIAL_STATE, action) => {
  console.log('ADD SUPPLIER REDUCER', action)
  return { ...state, submitting: false, error: action.error, submit_success: true};
};

export const createSupplierFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
};


//edit
export const updateSupplier = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, error: null, submit_success: false};
};

export const updateSupplierSuccess = (state = INITIAL_STATE, action) => {
  console.log('action update success', action)
  const { responseData } = action
  return { 
    ...state, 
    submit_success: true,
    suppliers: state.suppliers.map(supplier=> {
      if(supplier.id === responseData.id) {
        return responseData
      } else {
        return supplier;
      }
    }), 
    filtered_suppliers: state.suppliers.map(supplier=> {
      if(supplier.id === responseData.id) {
        return responseData
      } else {
        return supplier;
      }
    }), 
    submitting: false, error: action.error
  };
};

export const updateSupplierFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
};

//delete
export const deleteSupplier = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, error: null, submit_success: false};
};

export const deleteSupplierSuccess = (state = INITIAL_STATE, action) => {
  console.log('------>id', state.suppliers.filter(item => item.id !== action.supplierId))
  return { 
    ...state, 
    suppliers: state.suppliers.filter(item => item.id !== action.supplierId),
    submitting: false,
    submit_success: true
  };
};

export const deleteSupplierFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submit_success: false};
};

export const setSelectedSuppliers = (state = INITIAL_STATE, action) => {
  return { ...state, selected_suppliers: action.suppliers }
}

export const filterSuppliers = (state = INITIAL_STATE, action) => {
  console.log('action serac', action)
  return {
    ...state,
    filtered_suppliers: state.suppliers.filter(it => it?.name?.toLowerCase().indexOf(action?.search?.toLowerCase()) !== -1)
  }
}

export const resetSuppliers = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    suppliers: [],
    error: null,
    loading: false,
    selected_suppliers: [],
    filtered_suppliers: []
  };
};


export const HANDLERS = {
  [Types.FETCH_SUPPLIERS]: fetchSuppliers,
  [Types.FETCH_SUPPLIERS_SUCCESS]: fetchSuppliersSuccess,
  [Types.FETCH_SUPPLIERS_FAILURE]: fetchSuppliersFailure,

  [Types.CREATE_SUPPLIER]: createSupplier,
  [Types.CREATE_SUPPLIER_SUCCESS]: createSupplierSuccess,
  [Types.CREATE_SUPPLIER_FAILURE]: createSupplierFailure,

  [Types.UPDATE_SUPPLIER]: updateSupplier,
  [Types.UPDATE_SUPPLIER_SUCCESS]: updateSupplierSuccess,
  [Types.UPDATE_SUPPLIER_FAILURE]: updateSupplierFailure,

  [Types.DELETE_SUPPLIER]: deleteSupplier,
  [Types.DELETE_SUPPLIER_SUCCESS]: deleteSupplierSuccess,
  [Types.DELETE_SUPPLIER_FAILURE]: deleteSupplierFailure,

  [Types.GET_SUPPLIER]: getSupplier,
  [Types.GET_SUPPLIER_SUCCESS]: getSupplierSuccess,
  [Types.GET_SUPPLIER_FAILURE]: getSupplierFailure,

  [Types.SET_SELECTED_SUPPLIERS]: setSelectedSuppliers,

  [Types.FILTER_SUPPLIERS]: filterSuppliers,

  [Types.RESET_SUPPLIERS]: resetSuppliers,
};

export default createReducer(INITIAL_STATE, HANDLERS);
