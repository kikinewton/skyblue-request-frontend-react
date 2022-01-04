import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchPayments: ["query"],
    fetchPaymentsSuccess: ["responseData"],
    fetchPaymentsFailure: ["error"],

    fetchPayment: ["id"],
    fetchPaymentSuccess: ["responseData"],
    fetchPaymentFailure: ["error"],

    updatePayment: ["id","payload"],
    updatePaymentSuccess: ["responseData"],
    updatePaymentFailure: ["error"],

    createPayment: ["payload"],
    createPaymentSuccess: ["responseData"],
    createPaymentFailure: ["error"],

    filterPayments: ["filter"],

    resetPayment: null,


    fetchPaymentDrafts: ["query"],
    fetchPaymentDraftsSuccess: ["responseData"],
    fetchPaymentDraftsFailure: ["error"],

    fetchPaymentDraft: ["id"],
    fetchPaymentDraftSuccess: ["responseData"],
    fetchPaymentDraftFailure: ["error"],

    updatePaymentDraft: ["id","payload"],
    updatePaymentDraftSuccess: ["responseData"],
    updatePaymentDraftFailure: ["error"],

    createPaymentDraft: ["payload"],
    createPaymentDraftSuccess: ["responseData"],
    createPaymentDraftFailure: ["error"],

    filterPaymentDrafts: ["filter"],

    resetPaymentDraft: null
  }
)