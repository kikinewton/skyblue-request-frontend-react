import React from 'react'
import { connect } from 'react-redux'
import { Switch, useRouteMatch } from 'react-router-dom'
import AppLayout from '../AppLayout'
import List from './components/List'
import Add from './components/Add'
import Edit from './components/Edit'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import { Creators } from '../../services/redux/employee/actions'
import { Creators as DepartmentCreators } from '../../services/redux/department/actions'

const Employee = (props) => {
  const { path } = useRouteMatch()
  console.log('path', `${path}/add-new`)
  return (
    <>
      <AppLayout>
        <Switch>
          <AuthenticatedRoute exact exact path={`${path}`} {...props} component={List} />
          <AuthenticatedRoute path={`${path}/:employeeId/edit`} {...props} component={Edit} />
          <AuthenticatedRoute exact path={`${path}/add-new`} {...props} component={Add} />
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
  departmentLoading: store.department.loading
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
    }
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Employee)