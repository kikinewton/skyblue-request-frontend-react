import React from 'react'
import {Creators as PaymentCreators} from "../../services/redux/payment/actions"
import { Creators as GrnCreators } from '../../services/redux/grn/actions'
import { connect } from 'react-redux'
import { formatCurrency, prettifyDateTime } from '../../util/common-helper'
import AppLayout from '../AppLayout'
import { Switch, useRouteMatch } from "react-router-dom"
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import GrnPendingList from './component/GrnPendingPaymentList'
import NewPayment from './component/NewPayment'
import PaymentSuccess from './component/PaymentSuccess'
import ApprovePaymentList from './component/ApprovePaymentsList'
import PaymentList from './component/PaymentList'



export const PAYMENT_COLUMNS = [
  {
    title: "Purchase Number",
    dataIndex: "purchaseNumber",
    key: "purchaseNumber"
  },
  {
    title: "Payment Channel",
    dataIndex: "paymentMethod",
    key: "paymentMethod"
  },
  {
    title: "Amount",
    dataIndex: "paymentAmount",
    key: "paymentAmount",
    render: text => formatCurrency(text)
  },
  {
    title: "Payment Type",
    dataIndex: "paymentStatus",
    key: "paymentStatus",
  },
  {
    title: "Payment Date",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => prettifyDateTime(text)
  },
]

const PaymentModule = (props) => {
  const { path } = useRouteMatch()
  return (
    <>
      <AppLayout
        title="Payments"
      >
        <Switch>
          <AuthenticatedRoute path={`${path}/payment-success`} component={PaymentSuccess} {...props} />
          <AuthenticatedRoute path={`${path}/pending-approval`} component={ApprovePaymentList} {...props} />
          <AuthenticatedRoute path={`${path}/goods-receive-notes/:grnId/add-new-payment`} component={NewPayment} {...props} />
          <AuthenticatedRoute path={`${path}/goods-receive-notes`} component={GrnPendingList} {...props} />
          <AuthenticatedRoute path={`${path}`} component={PaymentList} {...props} />
        </Switch>
      </AppLayout>
    </>
  )
}

const mapStateToProps = store => ({
  current_user: store.auth.user,
  payments: store.payment.payments,
  payment: store.payment.payment,
  fetching_payments: store.payment.loading,
  submitting_payment: store.payment.submitting,
  submit_payment_success: store.payment.submit_success,

  payment_drafts: store.payment.payment_drafts,
  payment_draft: store.payment.payment_draft,

  grns: store.grn.grns,
  fetching_grns: store.grn.loading,
  grn: store.grn.grn
})

const mapActionToProps = dispatch => ({
  fetchPayments: query => dispatch(PaymentCreators.fetchPayments(query)),
  fetchPayment: id => dispatch(PaymentCreators.fetchPayment(id)),
  createPayment: payload => dispatch(PaymentCreators.createPayment(payload)),
  updatePayment: (id, payload) => dispatch(PaymentCreators.updatePayment(id, payload)),
  resetPayment: () => dispatch(PaymentCreators.resetPayment()),

  fetchPaymentDrafts: query => dispatch(PaymentCreators.fetchPaymentDrafts(query)),
  fetchPaymentDraft: id => dispatch(PaymentCreators.fetchPaymentDraft(id)),
  createPaymentDraft: payload => dispatch(PaymentCreators.createPaymentDraft(payload)),
  updatePaymentDraft: (id, payload) => dispatch(PaymentCreators.updatePaymentDraft(id, payload)),
  resetPaymentDraft: () => dispatch(PaymentCreators.resetPaymentDraft()),

  fetchGrns: query => dispatch(GrnCreators.fetchGrns(query)),
  fetchGrn: id => dispatch(GrnCreators.fetchGrn(id))

})

export default connect(mapStateToProps, mapActionToProps)(PaymentModule)