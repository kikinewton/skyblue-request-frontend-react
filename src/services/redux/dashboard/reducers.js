import { createReducer } from "reduxsauce"
import Types from "./actionTypes" 

export const INITIAL_STATE = {
  errors: null,
  data: [],
  loading: false,
};

export const fetchDashboardData = (state = INITIAL_STATE, actions) => {
  return {state, loading: true, data: null}
}


export const fetchDashboardDataSuccess = (state = INITIAL_STATE, actions) => {
  const {responseData} = actions
  return {state, loading: false, data: responseData}
}

export const fetchDashboardDataFailure = (state = INITIAL_STATE, actions) => {
  const {error} = actions
  return {state, loading: false, errors: error, data: null}
}

export const HANDLERS = {
  [Types.FETCH_DASHBOARD_DATA]: fetchDashboardData,
  [Types.FETCH_DASHBOARD_DATA_SUCCESS]: fetchDashboardDataSuccess,
  [Types.FETCH_DASHBOARD_DATA_FAILURE]: fetchDashboardDataFailure,
}

export default createReducer(INITIAL_STATE, HANDLERS)