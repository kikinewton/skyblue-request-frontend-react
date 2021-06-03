import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  departments: [],
  loading: false,
  submitting: false,
  department: {},
  submitSuccess: false
};

//fetch
export const fetchDepartments = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false, submitSuccess: false };
};

export const fetchDepartmentsSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, departments: action.responseData, loading: false};
};

export const fetchDepartmentsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error};
};

//get
export const getDepartment = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const getDepartmentSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, department: action.responseData, loading: false};
};

export const getDepartmentFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error};
};

//create
export const createDepartment = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submitSuccess: false };
};

export const createDepartmentSuccess = (state = INITIAL_STATE, action) => {
  console.log('REDUCER', action)
  return { ...state, departments: state.departments.concat([action.responseData]), submitting: false, submitSuccess: true};
};

export const createDepartmentFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submitSucces: false};
};

//edit
export const updateDepartment = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submitSuccess: false };
};

export const updateDepartmentSuccess = (state = INITIAL_STATE, action) => {
  console.log('lets update dept reducer', action)
  const { responseData } = action
  return { 
    ...state, 
    departments: state.departments.map(item=> {
      if(item.id === responseData.id) {
        return responseData
      } else {
        return item
      }
    }),
    submitting: false,
    submitSuccess: true
  };
};

export const updateDepartmentFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submitSuccess: false};
};


//delete
export const deleteDepartment = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submitSuccess: false };
};

export const deleteDepartmentSuccess = (state = INITIAL_STATE, action) => {
  const { departmentId } = action
  return { 
    ...state, 
    departments: state.departments.filter(item=> item.id !== departmentId),
    submitting: false,
    submitSuccess: true
  };
};

export const deleteDepartmentFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submitSuccess: false};
};


export const resetDepartment = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    departments: [],
    error: null,
    loading: false,
    submitting: false,
    submitSucces: false
  };
};

export const HANDLERS = {
  [Types.FETCH_DEPARTMENTS]: fetchDepartments,
  [Types.FETCH_DEPARTMENTS_SUCCESS]: fetchDepartmentsSuccess,
  [Types.FETCH_DEPARTMENTS_FAILURE]: fetchDepartmentsFailure,

  [Types.CREATE_DEPARTMENT]: createDepartment,
  [Types.CREATE_DEPARTMENT_SUCCESS]: createDepartmentSuccess,
  [Types.CREATE_DEPARTMENT_FAILURE]: createDepartmentFailure,

  [Types.UPDATE_DEPARTMENT]: updateDepartment,
  [Types.UPDATE_DEPARTMENT_SUCCESS]: updateDepartmentSuccess,
  [Types.UPDATE_DEPARTMENT_FAILURE]: updateDepartmentFailure,

  [Types.DELETE_DEPARTMENT]: deleteDepartment,
  [Types.DELETE_DEPARTMENT_SUCCESS]: deleteDepartmentSuccess,
  [Types.DELETE_DEPARTMENT_FAILURE]: deleteDepartmentFailure,
  
  [Types.RESET_DEPARTMENT]: resetDepartment
};

export default createReducer(INITIAL_STATE, HANDLERS);
