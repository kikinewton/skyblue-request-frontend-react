import { getLocalState, getLocalStateObject } from '../../app-storage'
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '../../app-storage/key-values'
import Types from './actionTypes'

import { createReducer } from 'reduxsauce'

const LOCAL_STORE_USER = getLocalStateObject(AUTH_USER_KEY)
const LOCAL_STORE_TOKEN = getLocalState(AUTH_TOKEN_KEY)

console.log('YES TOKEN', LOCAL_STORE_TOKEN, 'TOKEN KEY', AUTH_TOKEN_KEY)

console.log('INIT USER', LOCAL_STORE_USER)

const INITIAL_USER = {
  id: undefined,
  firstName: "",
  lastName: "",
  fullName: "",
  email: "",
  phoneNo: "",
  department: {id: undefined, name: "", description: ""},
  enabled: false,
  role: "",
}

const INITIAL_STATE = {
  user: LOCAL_STORE_USER ? LOCAL_STORE_USER : INITIAL_USER,
  token: LOCAL_STORE_TOKEN ? LOCAL_STORE_TOKEN : null,
  loading: false
}



export const login = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    error: null,
    loading: true,
    token: null
  };
};

export const loginSuccess = (state = INITIAL_STATE, action) => {
  const { employee, token, roles } = action.responseData
  console.log('user', employee)
  return {
    ...state,
    loading: false,
    user: { ...employee, role: roles[0] },
    token: token
  };
};

export const loginFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    user: {},
    error: action.error,
    token: null,
    loading: false
  };
};

export const logout = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    user: {},
    token: null,
    loading: false
  };
};


export const resetAuth = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    user: {},
    token: null,
    loading: false
  };
};


export const HANDLERS = {
  [Types.LOGIN]: login,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,

  [Types.LOGOUT]: logout,
  

  [Types.RESET_AUTH]: resetAuth,
};

export default createReducer(INITIAL_STATE, HANDLERS);
