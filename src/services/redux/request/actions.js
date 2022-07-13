import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchRequests: ["query"],
    fetchRequestsSuccess: ["responseData"],
    fetchRequestsFailure: ["error"],

    fetchMyRequests: ["query"],
    fetchMyRequestsSuccess: ["responseData"],
    fetchMyRequestsFailure: ["error"],

    getRequest: ["id"],
    getRequestSuccess: ["responseData"],
    getRequestFailure: ["error"],

    createRequest: ["payload"],
    createRequestSuccess: ["responsedata"],
    createRequestFailure: ["error"],

    updateRequest: ["payload"],
    updateRequestSuccess: ["requestId", "responseData"],
    updateRequestFailure: ["error"],

    updateSingleRequest: ["id", "payload"],
    updateSingleRequestSuccess: ["responseData"],
    updateSingleRequestFailure: ["error"],

    deleteRequest: ["requestId", "payload"],
    deleteRequestSuccess: ["responseData"],
    deleteRequestFailure: ["error"],

    setRequest: ["request"],

    setSelectedRequests: ["requests"],

    filterMyRequests: ["filter"],

    filterRequests: ['filter'],

    resetRequest: null
  }
)