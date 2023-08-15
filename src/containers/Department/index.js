import React from 'react'
import { connect } from 'react-redux'
import { Switch, useRouteMatch } from 'react-router-dom'
import AppLayout from '../AppLayout'
import List from './components/List'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import { Creators } from '../../services/redux/department/actions'

const Department = (props) => {
  const { path } = useRouteMatch()
  return (
    <>
      <AppLayout>
        <Switch>
          <AuthenticatedRoute exact path={`${path}`} {...props} component={List} />
        </Switch>
      </AppLayout>
    </>
  )
}

const mapStateToProps = (store) => ({
  authUser: store.auth.user,
  departmentLoading: store.department.loading,
  departments: store.department.departments,
  submitting: store.department.submitting,
  loading: store.department.loading,
  department: store.department.department,
  submitSuccess: store.department.submitSuccess
})

const mapActionsToProps = (dispatch) => {
  return {
    fetchDepartments: (query) => {
      dispatch(Creators.fetchDepartments(query))
    },
    createDepartment: (payload) => {
      dispatch(Creators.createDepartment(payload))
    },
    updateDepartment: (departmentId, payload) => {
      dispatch(Creators.updateDepartment(departmentId, payload))
    },
    deleteDepartment: (departmentId) => {
      dispatch(Creators.deleteDepartment(departmentId))
    },
    getDepartment: (departmentId) => {
      dispatch(Creators.getDepartment(departmentId))
    },
    resetDepartment: () => {
      dispatch(Creators.resetDepartment())
    }
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Department)