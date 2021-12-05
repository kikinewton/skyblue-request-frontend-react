import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchGrns: ["query"],
    fetchGrnsSuccess: ["responseData"],
    fetchGrnsFailure: ["error"],

    fetchGrn: ["id"],
    fetchGrnSuccess: ["responseData"],
    fetchGrnFailure: ["error"],

    createGrn: ["payload"],
    createGrnSuccess: ["responseData"],
    createGrnFailure: ["error"],

    updateGrn: ["id", "payload"],
    updateGrnSuccess: ["responseData"],
    updateGrnFailure: ["error"],

    setSelectedGrn: ["grns"],

    resetGrn: null
  }
)