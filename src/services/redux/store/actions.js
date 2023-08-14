import { createActions} from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchStores: ["query"],
    fetchStoresSuccess: ["responseData"],
    fetchStoresFailure: ["error"],

    createStore: ["payload"],
    createStoreSuccess: ["responsedata"],
    createStoreFailure: ["error"],

    updateStore: ["id","payload"],
    updateStoreSuccess: ["responsedata"],
    updateStoreFailure: ["error"],

    deleteStore: ["id"],
    deleteStoreSuccess: ["responsedata"],
    deleteStoreFailure: ["error"],

    filterStores: ["filter"],

    resetStores: null
  }
)