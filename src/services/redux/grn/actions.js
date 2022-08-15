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

    updateFloatGrn: ["id", "payload"],
    updateFloatGrnSuccess: ["responseData"],
    updateFloatGrnFailure: ["error"],

    fetchFloatGrns: ["query"],
    fetchFloatGrnsSuccess: ["responseData"],
    fetchFloatGrnsFailure: ["error"],

    createFloatGrn: ["payload"],
    createFloatGrnSuccess: ["responseData"],
    createFloatGrnFailure: ["error"],

    setSelectedGrn: ["grns"],

    resetGrn: null
  }
)