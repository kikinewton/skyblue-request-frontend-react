import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchGrns: ["query"],
    fetchGrnsSuccess: ["responseData"],
    fetchGrnsFailure: ["error"],

    getGrn: ["requestId"],
    getGrnSuccess: ["responseData"],
    getGrnFailure: ["error"],

    createGrn: ["payload"],
    createGrnSuccess: ["responseData"],
    createGrnFailure: ["error"],

    updateGrn: ["payload"],
    updateGrnSuccess: ["responseData"],
    updateGrnFailure: ["error"],

    setSelectedGrn: ["grns"],

    resetGrn: null
  }
)