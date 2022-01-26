import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
  fetchDashboardData: null,
  fetchDashboardDataSuccess: ["responseData"],
  fetchDashboardDataFailure: ["error"]
})