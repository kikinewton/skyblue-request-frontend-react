import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchRequestCategories: ["query"],
    fetchRequestCategoriesSuccess: ["responseData"],
    fetchRequestCategoriesFailure: ["error"],

    createRequestCategory: ["payload"],
    createRequestCategorySuccess: ["responsedata"],
    createRequestCategoryFailure: ["error"],

    updateRequestCategory: ["id", "payload"],
    updateRequestCategorySuccess: ["responsedata"],
    updateRequestCategoryFailure: ["error"],

    deleteRequestCategory: ["id"],
    deleteRequestCategorySuccess: ["id"],
    deleteRequestCategoryFailure: ["error"],

    setRequestCategory: ["requestCategory"],

    resetRequestCategory: null
  }
)