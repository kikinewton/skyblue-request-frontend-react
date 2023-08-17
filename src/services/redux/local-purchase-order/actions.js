import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchLocalPurchaseOrders: ["query"],
    fetchLocalPurchaseOrdersSuccess: ["responseData"],
    fetchLocalPurchaseOrdersFailure: ["error"],

    fetchLocalPurchaseOrder: ["id"],
    fetchLocalPurchaseOrderSuccess: ["responseData"],
    fetchLocalPurchaseOrderFailure: ["error"],

    fetchLocalPurchaseOrderDrafts: ["query"],
    fetchLocalPurchaseOrderDraftsSuccess: ["responseData"],
    fetchLocalPurchaseOrderDraftsFailure: ["error"],

    createLocalPurchaseOrder: ["payload"],
    createLocalPurchaseOrderSuccess: ["responseData"],
    createLocalPurchaseOrderFailure: ["error"],

    createLocalPurchaseOrderDraft: ["payload"],
    createLocalPurchaseOrderDraftSuccess: ["responseData"],
    createLocalPurchaseOrderDraftFailure: ["error"],

    filterLocalPurchaseOrders: ["filter"],

    filterLocalPurchaseOrderDrafts: ['filter'],

    resetLocalPurchaseOrder: null
  }
)