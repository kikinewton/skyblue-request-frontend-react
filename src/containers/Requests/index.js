import React from 'react'
import { connect } from 'react-redux'
import { Switch, useRouteMatch } from 'react-router'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import { Creators as DepartmentCreators  } from '../../services/redux/department/actions'
import { Creators as RequestCreators } from '../../services/redux/request/actions'
import { Creators as SupplierCreators } from '../../services/redux/supplier/actions'
import AppLayout from '../AppLayout'
import Endorse from './components/Endorse'
import Approve from './components/ApproveRequest'
import AssignSupplier from '../Procurement/components/AssignSupplier'

const Request = (props)=> {
  const { path } = useRouteMatch()
  return (
    <React.Fragment>
      <AppLayout>
        <Switch>
          <AuthenticatedRoute path={`${path}/approve`} component={Approve} {...props} />
          <AuthenticatedRoute path={`${path}/endorse`} {...props} component={Endorse} />
          <AuthenticatedRoute path={`${path}/assign-supplier`} {...props} component={AssignSupplier} />
        </Switch>
      </AppLayout>
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  departments: store.department.departments,
  departmentsLoading: store.department.loading,
  currentUser: store.auth.user,
  requests: store.request.requests,
  requestLoading: store.request.loading,
  requestSubmitting: store.request.submitting,
  requestSubmitSuccess: store.request.submitSuccess,
  suppliers: store.supplier.suppliers
})

const mapActionsToProps = (dispatch) => {
  return {
    fetchDepartments: (query) => {
      dispatch(DepartmentCreators.fetchDepartments(query))
    },
    createRequest: (payload) => {
      dispatch(RequestCreators.createRequest(payload))
    },
    fetchRequests: (query) => {
      dispatch(RequestCreators.fetchRequests(query))
    },
    updateRequest: (options) => {
      dispatch(RequestCreators.updateRequest(options))
    },
    resetRequests: () => {
      dispatch(RequestCreators.resetRequest())
    },
    fetchSuppliers: (query)=> {
      dispatch(SupplierCreators.fetchSuppliers(query))
    } 
  }
}
export default connect(mapStateToProps, mapActionsToProps)(Request)