import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchFloatRequests: ["query"],
    fetchFloatRequestsSuccess: ["responseData"],
    fetchFloatRequestsFailure: ["error"],

    fetchFloatOrders: ["query"],
    fetchFloatOrdersSuccess: ["responseData"],
    fetchFloatOrdersFailure: ["error"],

    fetchFloatOrder: ["id"],
    fetchFloatOrderSuccess: ["responseData"],
    fetchFloatOrderFailure: ["error"],

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

    updateFloatOrderStatus: ["id", "status"],
    updateFloatOrderStatusSuccess: ["responseData"],
    updateFloatOrderStatusFailure: ["error"],

    allocateFundsToFloatRequest: ["id","payload"],
    allocateFundsToFloatRequestSuccess: ["responseData"],
    allocateFundsToFloatRequestFailure: ["error"],

    addItemsToFloatOrder: ["id", "payload"],
    addItemsToFloatOrderSuccess: ["responseData"],
    addItemsToFloatOrderFailure: ["error"],

    retireFloatOrder: ["id", "payload"],
    retireFloatOrderSuccess: ["responseData"],
    retireFloatOrderFailure: ["error"],

    closeFloatOrder: ["id", "payload"],
    closeFloatOrderSuccess: ["responseData"],
    closeFloatOrderFailure: ["error"],

    setSelectedFloatRequests: ["requests"],

    filterFloatRequests: ["filter"],

    resetFloatRequest: null
  }
)