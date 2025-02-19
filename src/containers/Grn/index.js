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
import { Creators as EmployeeCreators } from "../../services/redux/employee/actions"
import { Creators as FloatCreators } from '../../services/redux/float/actions' 
import {Menu} from "antd"
import { EMPLOYEE_ROLE } from '../../util/datas'
import { formatCurrency, prettifyDateTime } from '../../util/common-helper'
import CreateFloatGrn from './components/CreateFloatGrn'
import AllGrns from './components/AllGrns'
import NotificationBadge from '../../shared/NotificationBadge'
import { Creators as CommentCreators } from '../../services/redux/comment/actions'
import GrnAwaitingPaymentList from './components/GrnAwaitingPaymentList'
import FloatsAwaitingGrn from './components/FloatsAwaitingGrn'
import FloatGrnsList from './components/FloatGrnsList'
import { userHasAnyRole } from '../../services/api/auth'
import FloatGrnHistory from './components/FloatGrnHistory'

export const GRN_COLUMNS = [
  {
    title: "REFERENCE",
    dataIndex: "grnRef",
    key: "grnRef"
  },
  {
    title: "INVOICE NUMBER",
    dataIndex: "invoice",
    key: "invoice",
    render: (text, row) => row?.invoice?.invoiceNumber
  },
  {
    title: "SUPPLIER",
    dataIndex: "finalSupplier",
    key: "finalSupplier",
    render: (text, row) => row?.finalSupplier?.name
  },
  {
    title: "INVOICE AMOUNT",
    dataIndex: "invoiceAmountPayable",
    key: "invoiceAmountPayable",
    render: (text, row) => formatCurrency(text, (row?.receivedItems || [])[0]?.currency || "GHS")
  },
  {
    title: "PAY BY",
    dataIndex: "paymentDate",
    key: "paymentDate",
    render: (text) => prettifyDateTime(text)
  },
]

export const FLOAT_GRN_COLUMNS = [
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
    render: (text, row) => row?.createdBy?.firstName + " " + row?.createdBy?.lastName
  },
  {
    title: "DATE CREATED",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text, row) => prettifyDateTime(text)
  },
  // {
  //   title: "INVOICE AMOUNT",
  //   dataIndex: "invoiceAmountPayable",
  //   key: "invoiceAmountPayable",
  //   render: (text, row) => formatCurrency(text, row?.receivedItems[0]?.currency || "GHS")
  // },
]


const GrnIndex = (props) => {
  const [key, setKey] = useState("/app/store/lpo")
  const {
    currentUser,
    notifications
  } = props
  const { path } = useRouteMatch()
  const location = useLocation()

  const DefaultRedirect = () => {
    const role = currentUser.role
    if(role === EMPLOYEE_ROLE.ROLE_STORE_OFFICER) {
      return <Redirect to="/app/grn/lpos-pending-grn" />
    } else if(role === EMPLOYEE_ROLE.ROLE_HOD) {
      return <Redirect to="/app/grn/pending-endorsement" />
    } else if(role === EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER) {
      return <Redirect to="/app/grn/pending-payment-advice" />
    } else if(role === EMPLOYEE_ROLE.ROLE_ADMIN) {
      return <Redirect to="/app/grn/all" />
    } else if(role === EMPLOYEE_ROLE.ROLE_STORE_MANAGER) {
      return <Redirect to="/app/grn/all-float-grn" />
    }
  }

  React.useEffect(() => {
    const url = window.location.href
    if(url.includes("/app/grn/lpos-pending-grn")) {
      setKey("/app/grn/lpos-pending-grn")
    } else if(url.includes("/app/grn/float-awaiting-grn")) {
      setKey("/app/grn/float-awaiting-grn")
    } else if(url.includes("/app/grn/pending-endorsement")) {
      setKey("/app/grn/pending-endorsement")
    }  else if(url.includes("/app/grn/pending-approval")) {
      setKey("/app/grn/pending-approval")
    } else if(url.includes("/app/grn/pending-payment-advice")) {
      setKey("/app/grn/pending-payment-advice")
    } else if(url.includes("/app/grn/pending-payment")) {
      setKey("/app/grn/pending-payment")
    } else if(url.includes("/app/grn/float-grn-history")) {
      setKey("/app/grn/float-grn-history")
    } else if(url.includes("all-float-grn")) {
        setKey("/app/grn/all-float-grn")
    } else if(url.includes("/app/grn/all")) {
      setKey("/app/grn/all")
    } else if(url.includes("/app/grn/new-float-grn")) {
      setKey("/app/grn/new-float-grn")
    }
  }, [key])

  const floatGrnsTabName = () => {
    const userRole = currentUser.role;
    switch(userRole) {
      case EMPLOYEE_ROLE.ROLE_STORE_MANAGER:
        return "APPROVE FLOAT GRN"
        break;
      case EMPLOYEE_ROLE.ROLE_AUDITOR:
        return "AUDIT FLOAT GRN"
        break;
      case EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER:
        return "APPROVE FLOAT GRN"
        break;
      default:
        return "ALL FLOAT GRNS"
    }
  }

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
          >
            {userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_STORE_OFFICER, EMPLOYEE_ROLE.ROLE_STORE_MANAGER])  && (
              <>
                <Menu.Item key="/app/grn/lpos-pending-grn">
                  <NavLink to="/app/grn/lpos-pending-grn">
                    {notifications.lpoWithoutGRN ? (
                      <NotificationBadge count={notifications.lpoWithoutGRN}>
                        <span>lpos awaiting grn</span>
                      </NotificationBadge>
                    ) : (<span>lpos awaiting grn</span>)}
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="/app/grn/float-awaiting-grn">
                  <NavLink to="/app/grn/float-awaiting-grn">
                    FLOATS AWAITING GRN
                  </NavLink>
                </Menu.Item>
              </>
            )}
            {userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_STORE_OFFICER, EMPLOYEE_ROLE.ROLE_STORE_MANAGER, 
              EMPLOYEE_ROLE.ROLE_ADMIN])  && (
                <Menu.Item key="/app/grn/all">
                  <NavLink to="/app/grn/all">
                    All LPO grns
                  </NavLink>
                </Menu.Item>
            )}
            {currentUser.role === EMPLOYEE_ROLE.ROLE_HOD && (
            <Menu.Item key="/app/grn/pending-endorsement">
              <NavLink to="/app/grn/pending-endorsement">
                {notifications.grnPendingEndorsement ? (
                  <NotificationBadge count={notifications.grnsPendingEndorsement || 0}>
                    GRNs Awaiting Endorsement
                  </NotificationBadge>
                ) : (<span>GRNs Awaiting Endorsement</span>)}
              </NavLink>
            </Menu.Item>
            )}
            {currentUser.role === EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER && (
            <Menu.Item key="/app/grn/pending-payment">
              <NavLink to="/app/grn/pending-payment">
                <span>GRNs Awaiting payment</span>
              </NavLink>
            </Menu.Item>
            )}
            {/* {currentUser.role === EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER && (
              <Menu.Item key="/app/grn/pending-approval">
                <NavLink to="/app/grn/pending-approval">
                  {notifications.grnPendingApprovalGM ? (
                    <NotificationBadge count={notifications.grnPendingApproval}>
                      <span>GRNs Awaiting Approval</span>
                    </NotificationBadge>
                  ) : <span>GRNs Awaiting Approval</span>}
                  
                </NavLink>
              </Menu.Item>
            )} */}
            {currentUser.role === EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER && (
              <Menu.Item key="/app/grn/pending-payment-advice">
                <NavLink to="/app/grn/pending-payment-advice">
                  {notifications.grnAwaitingPaymentAdvice ? (
                    <NotificationBadge count={notifications?.grnAwaitingPaymentAdvice}>
                      <span>GRNs Awaiting Payment Advice</span>
                    </NotificationBadge>
                  ) : (<span>GRNs Awaiting Payment Advice</span>)}
                </NavLink>
              </Menu.Item>
            )}
            {userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_STORE_MANAGER]) && (  
              <>
                <Menu.Item key="/app/grn/all-float-grn">
                  <NavLink to="/app/grn/all-float-grn">
                    FLOAT GRN AWAITING APPROVAL
                  </NavLink>
                </Menu.Item>
              </>
            )}
            {userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_STORE_MANAGER, EMPLOYEE_ROLE.ROLE_STORE_OFFICER, EMPLOYEE_ROLE.ROLE_ADMIN]) && (
              <Menu.Item key="/app/grn/float-grn-history">
                <NavLink to="/app/grn/float-grn-history">
                  ALL FLOAT GRNS
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
          <AuthenticatedRoute path={`${path}/pending-payment`} {...props} component={GrnAwaitingPaymentList} />
          {/* <AuthenticatedRoute path={`${path}/pending-approval`} {...props} component={GrnPendingApproval} /> */}
          <AuthenticatedRoute path={`${path}/add-new`} {...props} component={CreateGrn} />
          <AuthenticatedRoute path={`${path}/grn-success`} {...props} component={GrnSuccessPage} />
          <AuthenticatedRoute path={`${path}/lpos/:lpoId/create-goods-receive-note`} component={ReceiveItems} {...props} />
          <AuthenticatedRoute path={`${path}/lpos-pending-grn`} component={LocalPurchaseOrders} {...props} />
          <AuthenticatedRoute path={`${path}/new-float-grn`} component={CreateFloatGrn} {...props} />
          <AuthenticatedRoute path={`${path}/pending-payment-advice`} component={GrnPendingPaymentAdvice} {...props} />
          <AuthenticatedRoute path={`${path}/float-awaiting-grn`} component={FloatsAwaitingGrn} {...props}  />
          <AuthenticatedRoute path={`${path}/float-grn-history`} component={FloatGrnHistory} {...props} />
          <AuthenticatedRoute path={`${path}/all-float-grn`} component={FloatGrnsList} {...props}  />
          <AuthenticatedRoute path={`${path}/all`} component={AllGrns} {...props}  />
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
  float_grns: store.grn.float_grns,

  local_purchase_orders: store.local_purchase_order.local_purchase_orders,
  local_purchase_order: store.local_purchase_order.local_purchase_order,
  fetching_local_purchase_orders: store.local_purchase_order.loading,
  filtered_local_purchase_orders: store.local_purchase_order.filtered_local_purchase_orders,

  float_requests: store.float.requests,
  fetching_float_requests: store.float.loading,
  filtered_float_requests: store.float.filtered_requests,

  employees: store.employee.employees,
  fetching_employees: store.employee.loading,
  notifications: store.notification.notifications || {},

  comments: store.comment.comments,
  comments_loading: store.comment.loading,
  submitting_comment: store.comment.submitting,
  submit_comment_success: store.comment.submit_success,
  new_comment: store.comment.new_comment,

})

const mapActionsToProps = dispatch => ({
  fetchGrns: (query) => dispatch(GrnCreators.fetchGrns(query)),
  fetchGrn: (id) => dispatch(GrnCreators.fetchGrn(id)),
  createGrn: (payload) => dispatch(GrnCreators.createGrn(payload)),
  updateGrn: (id, payload) => dispatch(GrnCreators.updateGrn(id, payload)),
  resetGrn: () => dispatch(GrnCreators.resetGrn()),
  createFloatGrn: (payload) => dispatch(GrnCreators.createFloatGrn(payload)),
  updateFloatGrn: (id, payload) => dispatch(GrnCreators.updateFloatGrn(id, payload)),
  fetchFloatGrns: query => dispatch(GrnCreators.fetchFloatGrns(query)),

  fetchLocalPurchaseOrders: (query) => dispatch(LpoCreators.fetchLocalPurchaseOrders(query)),
  fetchLocalPurchaseOrder: (id) => dispatch(LpoCreators.fetchLocalPurchaseOrder(id)),
  resetLocalPurchaseOrder: () => dispatch(LpoCreators.resetLocalPurchaseOrder()),
  filterLocalPurchaseOrders: filter => dispatch(LpoCreators.filterLocalPurchaseOrders(filter)),

  fetchFloatRequests: query => dispatch(FloatCreators.fetchFloatRequests(query)),
  filterFloatRequests: filter => dispatch(FloatCreators.filterFloatRequests(filter)),
  resetFloatRequest: () => dispatch(FloatCreators.resetFloatRequest()),

  fetchEmployees: query => dispatch(EmployeeCreators.fetchEmployees(query)),
  resetEmployee: () => dispatch(EmployeeCreators.resetEmployee()),

  createComment: (commentType, itemId, payload) => {
    dispatch(CommentCreators.createComment(commentType, itemId, payload))
  },
  createCommentWithCancel: (procurementType, payload) => dispatch(CommentCreators.createCommentWithCancel(procurementType, payload)),
  fetchComments: (itemId, commentType) => {
    dispatch(CommentCreators.fetchComments(itemId, commentType))
  },
  setNewComment: (newComment) => {
    dispatch(CommentCreators.setNewComment(newComment))
  },
  resetComment: () => {
    dispatch(CommentCreators.resetComment())
  }
})


export default connect(mapStateToProps, mapActionsToProps)(GrnIndex)