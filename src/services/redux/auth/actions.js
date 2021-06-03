import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    login: ["payload"],
    loginSuccess: ["responseData"],
    loginFailure: ["error"],

    logout: null,

    resetAuth: null
  }
)