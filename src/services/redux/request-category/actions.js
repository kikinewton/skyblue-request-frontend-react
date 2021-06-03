import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchRequestCategories: ["query"],
    fetchRequestCategoriesSuccess: ["responseData"],
    fetchRequestCategoriesFailure: ["error"],

    createRequestCategory: ["payload"],
    createRequestCategorySuccess: ["responsedata"],
    createRequestCategoryFailure: ["error"],

    resetRequestCategory: null
  }
)