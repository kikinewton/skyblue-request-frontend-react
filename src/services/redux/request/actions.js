import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchRequests: ["query"],
    fetchRequestsSuccess: ["responseData"],
    fetchRequestsFailure: ["error"],

    getRequest: ["requestId"],
    getRequestSuccess: ["responseData"],
    getRequestFailure: ["error"],

    createRequest: ["payload"],
    createRequestSuccess: ["responsedata"],
    createRequestFailure: ["error"],

    updateRequest: ["payload"],
    updateRequestSuccess: ["requestId", "responseData"],
    updateRequestFailure: ["error"],

    deleteRequest: ["requestId", "payload"],
    deleteRequestSuccess: ["responseData"],
    deleteRequestFailure: ["error"],

    resetRequest: null
  }
)