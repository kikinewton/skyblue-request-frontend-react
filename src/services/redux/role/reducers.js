import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  errors: null,
  roles: [],
};


//fetch
export const fetchRoles = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null, roles: [] };
};

export const fetchRolesSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, roles: action.responseData, loading: false};
};

export const fetchRolesFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error, roles: []};
};



export const resetRoles = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    roles: [],
    error: null,
    loading: false
  };
};

export const HANDLERS = {
  [Types.FETCH_ROLES]: fetchRoles,
  [Types.FETCH_ROLES_SUCCESS]: fetchRolesSuccess,
  [Types.FETCH_ROLES_FAILURE]: fetchRolesFailure,

  [Types.RESET_ROLES]: resetRoles,
};

export default createReducer(INITIAL_STATE, HANDLERS);
