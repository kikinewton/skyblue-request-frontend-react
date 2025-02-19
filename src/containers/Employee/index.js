import React from 'react'
import { connect } from 'react-redux'
import { Switch, useRouteMatch } from 'react-router-dom'
import AppLayout from '../AppLayout'
import List from './components/List'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import { Creators } from '../../services/redux/employee/actions'
import { Creators as DepartmentCreators } from '../../services/redux/department/actions'
import { Creators as RoleCreators } from "../../services/redux/role/actions"

const Employee = (props) => {
  const { path } = useRouteMatch()
  return (
    <>
      <AppLayout>
        <Switch>
          <AuthenticatedRoute
            exact
            path={`${path}`}
            {...props} 
            component={List}
          />
        </Switch>
      </AppLayout>
    </>
  )
}

const mapStateToProps = (store) => ({
  authUser: store.auth.user,
  employees: store.employee.employees,
  submitting: store.employee.submitting,
  submitSuccess: store.employee.submitSuccess,
  loading: store.employee.loading,
  employee: store.employee.employee,
  departments: store.department.departments,
  departmentLoading: store.department.loading,
  user_roles: store.role.roles,
  fetching_roles: store.role.loading,
  filtered_employees: store.employee.filtered_employees,
  resetting_employee_password: store.employee.resetting_password,
  reset_employee_password_success: store.employee.reset_password_success,
})

const mapActionsToProps = (dispatch) => {
  return {
    fetchEmployees: (query) => {
      dispatch(Creators.fetchEmployees(query))
    },
    createEmployee: (payload) => {
      dispatch(Creators.createEmployee(payload))
    },
    updateEmployee: (employeeId, payload) => {
      dispatch(Creators.updateEmployee(employeeId, payload))
    },
    deleteEmployee: (employeeId) => {
      dispatch(Creators.deleteEmployee(employeeId))
    },
    getEmployee: (employeeId) => {
      dispatch(Creators.getEmployee(employeeId))
    },
    fetchDepartments: (query) => {
      dispatch(DepartmentCreators.fetchDepartments(query))
    },
    fetchRoles: (query) => {
      dispatch(RoleCreators.fetchRoles(query))
    },
    filterEmployees: (filter) => {
      dispatch(Creators.filterEmployees(filter))
    },
    resetEmployee: () => dispatch(Creators.resetEmployee()),
    enableEmployee: (id) => dispatch(Creators.enableEmployee(id)),
    disableEmployee: id => dispatch(Creators.disableEmployee(id)),
    resetEmployeePassword: id => dispatch(Creators.resetEmployeePassword(id))
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Employee)

//ada