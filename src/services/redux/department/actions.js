import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchDepartments: ["query"],
    fetchDepartmentsSuccess: ["responseData"],
    fetchDepartmentsFailure: ["error"],

    getDepartment: ["departmentId"],
    getDepartmentSuccess: ["responseData"],
    getDepartmentFailure: ["error"],

    createDepartment: ["payload"],
    createDepartmentSuccess: ["responseData"],
    createDepartmentFailure: ["error"],

    updateDepartment: ["departmentId", "payload"],
    updateDepartmentSuccess: ["responseData"],
    updateDepartmentFailure: ["error"],

    deleteDepartment: ["departmentId"],
    deleteDepartmentSuccess: ["departmentId"],
    deleteDepartmentFailure: ["error"],

    resetDepartment: null
  }
)