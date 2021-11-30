import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchLocalPurchaseOrders: ["query"],
    fetchLocalPurchaseOrdersSuccess: ["responseData"],
    fetchLocalPurchaseOrdersFailure: ["error"],

    fetchLocalPurchaseOrderDrafts: ["query"],
    fetchLocalPurchaseOrderDraftsSuccess: ["responseData"],
    fetchLocalPurchaseOrderDraftsFailure: ["error"],

    createLocalPurchaseOrder: ["payload"],
    createLocalPurchaseOrderSuccess: ["responseData"],
    createLocalPurchaseOrderFailure: ["error"],

    createLocalPurchaseOrderDraft: ["payload"],
    createLocalPurchaseOrderDraftSuccess: ["responseData"],
    createLocalPurchaseOrderDraftFailure: ["error"],

    resetLocalPurchaseOrder: null
  }
)