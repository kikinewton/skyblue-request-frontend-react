import React from 'react'
import {Creators as PaymentCreators} from "../../services/redux/payment/actions"
import { Creators as GrnCreators } from '../../services/redux/grn/actions'
import { Creators as PettyCashCreators } from '../../services/redux/petty-cash/actions'
import { Creators as FloatCreators } from '../../services/redux/float/actions'
import { Redirect} from "react-router-dom"
import { connect } from 'react-redux'
import { formatCurrency, prettifyDateTime } from '../../util/common-helper'
import { Switch, useRouteMatch } from "react-router-dom"
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import GrnPendingPaymentList from './component/GrnPendingPaymentList'
import NewPayment from './component/NewPayment'
import PaymentSuccess from './component/PaymentSuccess'
import ApprovePaymentList from './component/ApprovePaymentsList'
import { EMPLOYEE_ROLE } from '../../util/datas'
import PettyCashAllocateFunds from './component/PettyCashAllocateFunds'
import FloatAllocateFunds from './component/FloatAllocateFunds'



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
  const {
    current_user
  } = props

  const { path } = useRouteMatch()
  console.log('path', path)

  const DefaultPage = () => {
    console.log('hey')
    switch(current_user.role) {
      case EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER:
        return <Redirect to="/app/payments/goods-receive-notes"/>
      default:
        return <Redirect to="/app/payments/pending-approval" />
    }
  }

  return (
    <>
      <Switch>
        <AuthenticatedRoute path={`${path}/payment-success`} component={PaymentSuccess} {...props} />
        <AuthenticatedRoute path={`${path}/pending-approval`} component={ApprovePaymentList} {...props} />
        <AuthenticatedRoute path={`${path}/goods-receive-notes/:grnId/add-new-payment`} component={NewPayment} {...props} />
        <AuthenticatedRoute path={`${path}/goods-receive-notes`} component={GrnPendingPaymentList} {...props} />
        <AuthenticatedRoute path={`${path}/petty-cash/allocate-funds`} component={PettyCashAllocateFunds} {...props} />
        <AuthenticatedRoute path={`${path}/float/allocate-funds`} component={FloatAllocateFunds} {...props} />
        <AuthenticatedRoute path={`${path}`} component={DefaultPage} exact {...props} />
      </Switch>
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
  grn: store.grn.grn,

  petty_cash_requests: store.petty_cash.requests,
  fetching_petty_cash_requests: store.petty_cash.loading,
  submit_petty_cash_request_success: store.petty_cash.submit_success,
  submitting_petty_cash_request: store.petty_cash.submitting,

  float_requests: store.float.requests,
  fetching_float_requests: store.float.loading,
  submit_float_request_success: store.float.submit_success,
  submitting_float_request: store.float.submitting
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
  fetchGrn: id => dispatch(GrnCreators.fetchGrn(id)),
  resetGrn: () => dispatch(GrnCreators.resetGrn()),

  fetchPettyCashRequests: query => dispatch(PettyCashCreators.fetchPettyCashRequests(query)),
  resetPettyCashRequest: () => dispatch(PettyCashCreators.resetPettyCashRequest()),
  allocateFundsToPettyCashRequest: (payload) => dispatch(PettyCashCreators.allocateFundsToPettyCashRequest(payload)),

  fetchFloatRequests: query => dispatch(FloatCreators.fetchFloatRequests(query)),
  resetFloatRequest: () => dispatch(FloatCreators.resetFloatRequest()),
  allocateFundsToFloatRequest: (payload) => dispatch(FloatCreators.allocateFundsToFloatRequest(payload)),

  

})

export default connect(mapStateToProps, mapActionToProps)(PaymentModule)