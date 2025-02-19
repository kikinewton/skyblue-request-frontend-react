import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  employees: [],
  loading: false,
  submitting: false,
  employee: {},
  submitSuccess: false,
  filtered_employees: [],
  resetting_password: false,
  reset_password_success: false,
};

//fetch
export const fetchEmployees = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const fetchEmployeesSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, employees: action.responseData, loading: false, filtered_employees: action.responseData};
};

export const fetchEmployeesFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, employees: [], filtered_employees: []};
};

//get
export const getEmployee = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, submitting: false };
};

export const getEmployeeSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, employee: action.responseData, loading: false};
};

export const getEmployeeFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error};
};

//create
export const createEmployee = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submitSuccess: false };
};

export const createEmployeeSuccess = (state = INITIAL_STATE, action) => {
  console.log('resposeData', action.responseData)
  return { 
    ...state,
    submitting: false, 
    submitSuccess: true
  };
};

export const createEmployeeFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submitSuccess: false};
};

//edit
export const updateEmployee = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submitSuccess: false };
};

export const updateEmployeeSuccess = (state = INITIAL_STATE, action) => {
  const { responseData } = action
  return { 
    ...state, 
    employees: state.employees.map(item=> {
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

export const updateEmployeeFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submitSuccess: false};
};

//enable
export const enableEmployee = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submitSuccess: false };
};

export const enableEmployeeSuccess = (state = INITIAL_STATE, action) => {
  return { 
    ...state,
    submitting: false,
    submitSuccess: true
  };
};

export const enableEmployeeFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submitSuccess: false};
};

//reset password
export const resetEmployeePassword = (state = INITIAL_STATE, action) => {
  return { ...state, resetting_password: true, errors: null, loading: false, reset_password_success: false };
};

export const resetEmployeePasswordSuccess = (state = INITIAL_STATE, action) => {
  return { 
    ...state,
    resetting_password: false,
    reset_password_success: true
  };
};

export const resetEmployeePasswordFailure = (state = INITIAL_STATE, action) => {
  return { ...state, resetting_password: false, error: action.error, reset_password_success: false};
};

//disable
export const disableEmployee = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: false, submitSuccess: false };
};

export const disableEmployeeSuccess = (state = INITIAL_STATE, action) => {
  return { 
    ...state,
    submitting: false,
    submitSuccess: true
  };
};

export const disableEmployeeFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, submitSuccess: false};
};


//delete
export const deleteEmployee = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: true, errors: null, loading: true };
};

export const deleteEmployeeSuccess = (state = INITIAL_STATE, action) => {
  console.log('delete action', action)
  const { employeeId } = action.responseData
  return { 
    ...state, 
    employees: state.employees.filter(item=> item.id !== employeeId),
    submitting: false,
    loading: false
  };
};

export const deleteEmployeeFailure = (state = INITIAL_STATE, action) => {
  return { ...state, submitting: false, error: action.error, loading: false};
};


export const filterEmployees = (state = INITIAL_STATE, action) => {
  const { filter } = action
  return { ...state, filtered_employees: state.employees.filter(it => 
    it?.fullName?.toLowerCase().indexOf(filter?.toLowerCase()) !== -1)};
};

export const resetEmployee = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    employees: [],
    filtered_employees: [],
    employee: {},
    error: null,
    loading: false,
    submitting: false
  };
};

export const HANDLERS = {
  [Types.FETCH_EMPLOYEES]: fetchEmployees,
  [Types.FETCH_EMPLOYEES_SUCCESS]: fetchEmployeesSuccess,
  [Types.FETCH_EMPLOYEES_FAILURE]: fetchEmployeesFailure,

  [Types.CREATE_EMPLOYEE]: createEmployee,
  [Types.CREATE_EMPLOYEE_SUCCESS]: createEmployeeSuccess,
  [Types.CREATE_EMPLOYEE_FAILURE]: createEmployeeFailure,

  [Types.UPDATE_EMPLOYEE]: updateEmployee,
  [Types.UPDATE_EMPLOYEE_SUCCESS]: updateEmployeeSuccess,
  [Types.UPDATE_EMPLOYEE_FAILURE]: updateEmployeeFailure,

  [Types.ENABLE_EMPLOYEE]: enableEmployee,
  [Types.ENABLE_EMPLOYEE_SUCCESS]: enableEmployeeSuccess,
  [Types.ENABLE_EMPLOYEE_FAILURE]: enableEmployeeFailure,

  [Types.DISABLE_EMPLOYEE]: disableEmployee,
  [Types.DISABLE_EMPLOYEE_SUCCESS]: disableEmployeeSuccess,
  [Types.DISABLE_EMPLOYEE_FAILURE]: disableEmployeeFailure,

  [Types.DELETE_EMPLOYEE]: deleteEmployee,
  [Types.DELETE_EMPLOYEE_SUCCESS]: deleteEmployeeSuccess,
  [Types.DELETE_EMPLOYEE_FAILURE]: deleteEmployeeFailure,

  [Types.RESET_EMPLOYEE_PASSWORD]: resetEmployeePassword,
  [Types.RESET_EMPLOYEE_PASSWORD_SUCCESS]: resetEmployeePasswordSuccess,
  [Types.RESET_EMPLOYEE_PASSWORD_FAILURE]: resetEmployeePasswordFailure,

  [Types.FILTER_EMPLOYEES]: filterEmployees,
  
  [Types.RESET_EMPLOYEE]: resetEmployee
};

export default createReducer(INITIAL_STATE, HANDLERS);
