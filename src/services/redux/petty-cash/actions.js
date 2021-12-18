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

    updatePettyCashRequest: ["id","payload"],
    updatePettyCashRequestSuccess: ["responseData"],
    updatePettyCashRequestFailure: ["error"],

    updateBulkPettyCashRequest: ["payload"],
    updateBulkPettyCashRequestSuccess: ["responseData"],
    updateBulkPettyCashRequestFailure: ["error"],

    deletePettyCashRequest: ["requestId", "payload"],
    deletePettyCashRequestSuccess: ["responseData"],
    deletePettyCashRequestFailure: ["error"],

    allocateFundsToPettyCashRequest: ["payload"],
    allocateFundsToPettyCashRequestSuccess: ["responseData"],
    allocateFundsToPettyCashRequestFailure: ["error"],

    setSelectedPettyCashRequests: ["requests"],

    resetPettyCashRequest: null
  }
)