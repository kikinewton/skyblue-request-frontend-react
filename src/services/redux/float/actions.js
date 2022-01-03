import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchFloatRequests: ["query"],
    fetchFloatRequestsSuccess: ["responseData"],
    fetchFloatRequestsFailure: ["error"],

    fetchFloatOrders: ["query"],
    fetchFloatOrdersSuccess: ["responseData"],
    fetchFloatOrdersFailure: ["error"],

    fetchMyFloatRequests: ["query"],
    fetchMyFloatRequestsSuccess: ["responseData"],
    fetchMyFloatRequestsFailure: ["error"],

    getFloatRequest: ["requestId"],
    getFloatRequestSuccess: ["responseData"],
    getFloatRequestFailure: ["error"],

    createFloatRequest: ["payload"],
    createFloatRequestSuccess: ["responseData"],
    createFloatRequestFailure: ["error"],

    updateFloatRequest: ["payload"],
    updateFloatRequestSuccess: ["responseData"],
    updateFloatRequestFailure: ["error"],

    updateSingleFloatRequest: ["id","payload"],
    updateSingleFloatRequestSuccess: ["responseData"],
    updateSingleFloatRequestFailure: ["error"],

    deleteFloatRequest: ["requestId", "payload"],
    deleteFloatRequestSuccess: ["responseData"],
    deleteFloatRequestFailure: ["error"],

    allocateFundsToFloatRequest: ["payload"],
    allocateFundsToFloatRequestSuccess: ["responseData"],
    allocateFundsToFloatRequestFailure: ["error"],

    setSelectedFloatRequests: ["requests"],

    filterFloatRequests: ["filter"],

    resetFloatRequest: null
  }
)