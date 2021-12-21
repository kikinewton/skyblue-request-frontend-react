import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Switch, useRouteMatch, Redirect, NavLink, useLocation } from 'react-router-dom'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import AppLayout from '../AppLayout'
import LocalPurchaseOrders from './components/LocalPurchaseOrders'
import GrnSuccessPage from './components/GrnSuccessPage'
import ReceiveItems from './components/ReceiveItems'
import GrnPendingEndorsement from './components/GrnPendingEndorsement'
import GrnPendingApproval from './components/GrnPendingApproval'
import GrnPendingPaymentAdvice from './components/GrnPendingPaymentAdvice'
import CreateGrn from './components/CreateGrn'
import { Creators as LpoCreators } from "../../services/redux/local-purchase-order/actions"
import { Creators as GrnCreators } from "../../services/redux/grn/actions"
import {Menu} from "antd"
import { EMPLOYEE_ROLE } from '../../util/datas'
import { formatCurrency } from '../../util/common-helper'
import CreateFloatGrn from './components/CreateFloatGrn'

export const GRN_COLUMNS = [
  {
    title: "Reference",
    dataIndex: "grnRef",
    key: "grnRef"
  },
  {
    title: "Invoice Number",
    dataIndex: "invoice",
    key: "invoice",
    render: (text, row) => row?.invoice?.invoiceNumber
  },
  {
    title: "Supplier",
    dataIndex: "finalSupplier",
    key: "finalSupplier",
    render: (text, row) => row?.finalSupplier?.name
  },
  {
    title: "Amount",
    dataIndex: "invoiceAmountPayable",
    key: "invoiceAmountPayable",
    render: (text) => formatCurrency(text)
  },
  {
    title: "Number of items",
    dataIndex: "receivedItems",
    key: "receivedItems",
    render: (text, row) => row?.receivedItems.length
  },
]


const GrnIndex = (props) => {
  const [key, setKey] = useState("/app/store/lpo")
  const {
    currentUser
  } = props
  const { path } = useRouteMatch()
  const location = useLocation()

  const DefaultRedirect = () => {
    const role = currentUser.role
    if(role === EMPLOYEE_ROLE.ROLE_STORE_OFFICER) {
      return <Redirect to="/app/grn/list" />
    } else if(role === EMPLOYEE_ROLE.ROLE_HOD) {
      return <Redirect to="/app/grn/pending-endorsement" />
    } else if(role === EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER) {
      return <Redirect to="/app/grn/pending-approval" />
    } else if(role === EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER) {
      return <Redirect to="/app/grn/pending-payment-advice" />
    }
  }

  React.useEffect(() => {
    const { pathname } = location
    if(pathname.includes("/app/grn/add-new")) {
      setKey("/app/grn/add-new")
    } else if(pathname.includes("/app/grn/pending-endorsement")) {
      setKey("/app/grn/pending-endorsement")
    } else if(pathname.includes("/app/grn/pending-approval")) {
      setKey("/app/grn/pending-approval")
    } else if(pathname.includes("/app/grn/list")) {
      setKey("/app/grn/list")
    } else if(pathname.includes("/app/grn/pending-payment-advice")) {
      setKey("/app/grn/pending-payment-advice")
    } else if(pathname.includes("/app/grn/new-float-grn")) {
      setKey("/app/grn/new-float-grn")
    }
  }, [key])

  return (
    <React.Fragment>
      <AppLayout
        title="GRN MANAGEMENT"
        subNav={(
          <Menu
            selectedKeys={[key]}
            mode="horizontal"
            onClick={value => setKey(value)}
            forceSubMenuRender
            mode="horizontal"
          >
            {currentUser.role === EMPLOYEE_ROLE.ROLE_STORE_OFFICER && (
              <>
                <Menu.Item key="/app/grn/add-new">
                  <NavLink to="/app/grn/add-new">
                    Create Goods Receive Note
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="/app/grn/list">
                  <NavLink to="/app/grn/list">
                    GRNs
                  </NavLink>
                </Menu.Item>
              </>
            )}
            {currentUser.role === EMPLOYEE_ROLE.ROLE_HOD && (
            <Menu.Item key="/app/grn/pending-endorsement">
              <NavLink to="/app/grn/pending-endorsement">
                GRNs Awaiting Endorsement
              </NavLink>
            </Menu.Item>
            )}
            {currentUser.role === EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER && (
              <Menu.Item key="/app/grn/pending-approval">
                <NavLink to="/app/grn/pending-approval">
                  GRNs Awaiting Approval
                </NavLink>
              </Menu.Item>
            )}
            {currentUser.role === EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER && (
              <Menu.Item key="/app/grn/pending-payment-advice">
                <NavLink to="/app/grn/pending-payment-advice">
                  GRNs Awaiting Payment Advice
                </NavLink>
              </Menu.Item>
            )}
            {currentUser.role === EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER && (
              <Menu.Item key="/app/grn/new-float-grn">
                <NavLink to="/app/grn/new-float-grn">
                  Create GRN for Float
                </NavLink>
              </Menu.Item>
            )}
          </Menu>
        )}
      >
        <Switch>
          <AuthenticatedRoute exact path={`${path}`}>
            {DefaultRedirect}
          </AuthenticatedRoute>
          <AuthenticatedRoute path={`${path}/pending-endorsement`} {...props} component={GrnPendingEndorsement} />
          <AuthenticatedRoute path={`${path}/pending-approval`} {...props} component={GrnPendingApproval} />
          <AuthenticatedRoute path={`${path}/add-new`} {...props} component={CreateGrn} />
          <AuthenticatedRoute path={`${path}/grn-success`} {...props} component={GrnSuccessPage} />
          <AuthenticatedRoute path={`${path}/lpos/:lpoId/create-goods-receive-note`} component={ReceiveItems} {...props} />
          <AuthenticatedRoute path={`${path}/lpos`} component={LocalPurchaseOrders} {...props} />
          <AuthenticatedRoute path={`${path}/list`} {...props} component={LocalPurchaseOrders} />
          <AuthenticatedRoute path={`${path}/new-float-grn`} component={CreateFloatGrn} {...props} />
          <AuthenticatedRoute path={`${path}/pending-payment-advice`} component={GrnPendingPaymentAdvice} {...props} />
        </Switch>
      </AppLayout>
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.auth.user,

  fetching_grns: store.grn.loading,
  submitting_grn: store.grn.submitting,
  submit_grn_success: store.grn.submit_success,
  grns: store.grn.grns,
  grn: store.grn.grn,

  local_purchase_orders: store.local_purchase_order.local_purchase_orders,
  local_purchase_order: store.local_purchase_order.local_purchase_order,
  fetching_local_purchase_orders: store.local_purchase_order.loading,
  filtered_local_purchase_orders: store.local_purchase_order.filtered_local_purchase_orders,

})

const mapActionsToProps = dispatch => ({
  fetchGrns: (query) => dispatch(GrnCreators.fetchGrns(query)),
  fetchGrn: (id) => dispatch(GrnCreators.fetchGrn(id)),
  createGrn: (payload) => dispatch(GrnCreators.createGrn(payload)),
  updateGrn: (id, payload) => dispatch(GrnCreators.updateGrn(id, payload)),
  resetGrn: () => dispatch(GrnCreators.resetGrn()),

  fetchLocalPurchaseOrders: (query) => dispatch(LpoCreators.fetchLocalPurchaseOrders(query)),
  fetchLocalPurchaseOrder: (id) => dispatch(LpoCreators.fetchLocalPurchaseOrder(id)),
  resetLocalPurchaseOrder: () => dispatch(LpoCreators.resetLocalPurchaseOrder()),
  filterLocalPurchaseOrders: filter => dispatch(LpoCreators.filterLocalPurchaseOrders(filter))
})


export default connect(mapStateToProps, mapActionsToProps)(GrnIndex)