import { createActions} from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchRoles: ["query"],
    fetchRolesSuccess: ["responseData"],
    fetchRolesFailure: ["error"],

    resetRoles: []
  }
)