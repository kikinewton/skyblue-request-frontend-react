import React from 'react'
import { Switch, useRouteMatch } from 'react-router'
import AppLayout from '../AppLayout'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import Approve from './components/Approve'
import List from './components/PaymentList'
import { Creators as SupplierCreators } from '../../services/redux/supplier/actions'
import { Creators as PaymentCreators } from '../../services/redux/payment/actions'
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
  payment_drafts: store.payment.payment_drafts,
  fetching_payments: store.payment.loading,
})

const mapActionsToProps = (dispatch) => ({
  fetchSuppliers: (query) => {
    dispatch(SupplierCreators.fetchSuppliers(query))
  },

  fetchPayments: query => dispatch(PaymentCreators.fetchPayments(query)),
  fetchPaymentDraft: (query) => dispatch(PaymentCreators.fetchPaymentDrafts)
})
export default connect(mapStateToProps, mapActionsToProps)(Audit)