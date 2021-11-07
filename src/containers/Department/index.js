import React from 'react'
import { connect } from 'react-redux'
import { Switch, useRouteMatch } from 'react-router-dom'
import AppLayout from '../AppLayout'
import List from './components/List'
import Add from './components/Add'
import Edit from './components/Edit'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import { Creators } from '../../services/redux/department/actions'

const Department = (props) => {
  console.log('MA PROPS', props)
  const { path } = useRouteMatch()
  console.log('path', path)
  return (
    <>
      <AppLayout>
        <Switch>
          <AuthenticatedRoute exact path={`${path}`} {...props} component={List} />
          <AuthenticatedRoute exact path={`${path}/add-new`} {...props} component={Add} />
          <AuthenticatedRoute exatc path={`${path}/:departmentId/edit`} {...props} component={Edit} />
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