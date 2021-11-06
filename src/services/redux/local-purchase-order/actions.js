import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchLocalPurchaseOrders: ["query"],
    fetchLocalPurchaseOrdersSuccess: ["responseData"],
    fetchLocalPurchaseOrdersFailure: ["error"],

    createLocalPurchaseOrder: ["payload"],
    createLocalPurchaseOrderSuccess: ["responseData"],
    createLocalPurchaseOrderFailure: ["error"],

    resetLocalPurchaseOrder: null
  }
)