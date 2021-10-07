import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchPettyCashRequests: ["query"],
    fetchPettyCashRequestsSuccess: ["responseData"],
    fetchPettyCashRequestsFailure: ["error"],

    fetchMyPettyCashRequests: ["query"],
    fetchMyPettyCashRequestsSuccess: ["responseData"],
    fetchMyPettyCashRequestsFailure: ["error"],

    getPettyCashRequest: ["requestId"],
    getPettyCashRequestSuccess: ["responseData"],
    getPettyCashRequestFailure: ["error"],

    createPettyCashRequest: ["payload"],
    createPettyCashRequestSuccess: ["responseData"],
    createPettyCashRequestFailure: ["error"],

    updatePettyCashRequest: ["payload"],
    updatePettyCashRequestSuccess: ["id", "responseData"],
    updatePettyCashRequestFailure: ["error"],

    deletePettyCashRequest: ["requestId", "payload"],
    deletePettyCashRequestSuccess: ["responseData"],
    deletePettyCashRequestFailure: ["error"],

    resetPettyCashRequest: null
  }
)