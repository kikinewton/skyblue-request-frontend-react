import React from 'react'
import { connect } from 'react-redux'
import { Switch, useRouteMatch } from 'react-router'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import AppLayout from '../AppLayout'
import GrnList from './components/GrnList'
import NewPayment from './components/NewPayment'
import PaymentList from './components/PaymentList'
import PaymentSuccess from './components/PaymentSuccess'
import { Creators as SupplierCreator } from '../../services/redux/supplier/actions'
import { Creators as LpoCreators } from "../../services/redux/local-purchase-order/actions"
import { Creators as GrnCreators } from "../../services/redux/grn/actions"
import { Creators as PaymentCreators } from '../../services/redux/payment/actions'


const Account = (props) => {
  const { path } = useRouteMatch()
  return (
    <React.Fragment>
      <AppLayout
        title="Accounts"
      >
        <Switch>
          <AuthenticatedRoute path={`${path}/payment-success`} component={PaymentSuccess} {...props} />
          <AuthenticatedRoute path={`${path}/goods-receive-notes/:grnId/add-new-payment`} component={NewPayment} {...props} />
          <AuthenticatedRoute path={`${path}/goods-receive-notes`} component={GrnList} {...props} />
          <AuthenticatedRoute path={`${path}`} component={PaymentList} {...props} />
        </Switch>
      </AppLayout>
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.auth.user,
  suppliers: store.supplier.suppliers,
  suppliersLoading: store.supplier.loading,

  fetching_grns: store.grn.loading,
  submitting_grn: store.grn.submitting,
  submit_grn_success: store.grn.submit_success,
  grns: store.grn.grns,
  grn: store.grn.grn,

  local_purchase_orders: store.local_purchase_order.local_purchase_orders,
  local_purchase_order: store.local_purchase_order.local_purchase_order,
  fetching_local_purchase_orders: store.local_purchase_order.loading,

  payments: store.payment.payments,
  fetching_payments: store.payment.loading,
  payment_drafts: store.payment.payment_draft,
  submitting_payment: store.payment.submitting,
  submit_payment_success: store.payment.submit_success
})

const mapActionToProps = (dispatch) => {
  return {
    fetchSuppliers: (query) => {
      dispatch(SupplierCreator.fetchSuppliers(query))
    },
    fetchGrns: (query) => dispatch(GrnCreators.fetchGrns(query)),
    fetchGrn: (id) => dispatch(GrnCreators.fetchGrn(id)),
    createGrn: (payload) => dispatch(GrnCreators.createGrn(payload)),
    updateGrn: (id, payload) => dispatch(GrnCreators.updateGrn(id, payload)),
    resetGrn: () => dispatch(GrnCreators.resetGrn()),

    fetchLocalPurchaseOrders: (query) => dispatch(LpoCreators.fetchLocalPurchaseOrders(query)),
    fetchLocalPurchaseOrder: (id) => dispatch(LpoCreators.fetchLocalPurchaseOrder(id)),
    resetLocalPurchaseOrder: () => dispatch(LpoCreators.resetLocalPurchaseOrder()),
    resetLocalPurchaseOrder: () => dispatch(LpoCreators.resetLocalPurchaseOrder()),

    fetchPayments: query => dispatch(PaymentCreators.fetchPayments(query)),
    fetchPaymentDraft: (query) => dispatch(PaymentCreators.fetchPaymentDrafts(query)),
    createPayment: (payload) => dispatch(PaymentCreators.createPayment(payload))
  }
}

export default connect(mapStateToProps, mapActionToProps)(Account)