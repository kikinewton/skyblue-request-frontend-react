import { createActions } from "reduxsauce"

export const { Types, Creators } = createActions({
  fetchRequestItemsReport: ["query"],
  fetchPaymentsReport: ["query"],
  
})