import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchEmployees: ["query"],
    fetchEmployeesSuccess: ["responseData"],
    fetchEmployeesFailure: ["error"],

    getEmployee: ["employeeId"],
    getEmployeeSuccess: ["responseData"],
    getEmployeeFailure: ["error"],

    createEmployee: ["payload"],
    createEmployeeSuccess: ["responseData"],
    createEmployeeFailure: ["error"],

    updateEmployee: ["employeeId", "payload"],
    updateEmployeeSuccess: ["responseData"],
    updateEmployeeFailure: ["error"],

    deleteEmployee: ["employeeId"],
    deleteEmployeeSuccess: ["responseData"],
    deleteEmployeeFailure: ["error"],

    resetEmployee: null
  }
)