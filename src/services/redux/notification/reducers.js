import { createReducer } from "reduxsauce";
import Types from "./actionTypes";

export const INITIAL_STATE = {
  notifications: localStorage.getItem("app-notifications") ? JSON.parse(localStorage.getItem("app-notifications")) : null,
  loading: false,
  error: null
};

//fetch
export const fetchNotifications = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errors: null };
};

export const fetchNotificationsSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, notifications: action.responseData, loading: false, error: null};
};

export const fetchNotificationsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, loading: false, error: action.error};
};

export const resetNotifications = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    notifications: [],
    loading: false,
    error: null
  };
};

export const HANDLERS = {
  [Types.FETCH_NOTIFICATIONS]: fetchNotifications,
  [Types.FETCH_NOTIFICATIONS_SUCCESS]: fetchNotificationsSuccess,
  [Types.FETCH_NOTIFICATIONS_FAILURE]: fetchNotificationsFailure,
  
  [Types.RESET_NOTIFICATIONS]: resetNotifications
};

export default createReducer(INITIAL_STATE, HANDLERS);
