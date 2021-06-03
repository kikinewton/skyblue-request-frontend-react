import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchQuotations: ["query"],
    fetchQuotationsSuccess: ["responseData"],
    fetchQuotationsFailure: ["error"],

    updateQuotation: ["quotationId","payload"],
    updateQuotationSuccess: ["quotationId", "responseData"],
    updateQuotationFailure: ["error"],

    resetQuotation: null
  }
)