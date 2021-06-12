import React from 'react'
import { Switch, useRouteMatch } from 'react-router'
import AppLayout from '../AppLayout'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import Approve from './components/Approve'
import List from './components/PaymentList'
import { Creators as SupplierCreators } from '../../services/redux/supplier/actions'
import { connect } from 'react-redux'

const Audit = (props) => {
  const { path } = useRouteMatch()
  return (
    <React.Fragment>
      <AppLayout>
        <Switch>
          <AuthenticatedRoute path={`${path}/approve-payment`} component={Approve} {...props} />
          <AuthenticatedRoute path={`${path}/payments`} component={List} {...props} />
        </Switch>
      </AppLayout>
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  suppliers: store.supplier.suppliers,
  suppliersLoading: store.supplier.loading,
})

const mapActionsToProps = (dispatch) => ({
  fetchSuppliers: (query) => {
    dispatch(SupplierCreators.fetchSuppliers(query))
  }
})
export default connect(mapStateToProps, mapActionsToProps)(Audit)