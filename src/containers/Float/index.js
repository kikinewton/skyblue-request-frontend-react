import React from 'react';
import { connect } from 'react-redux';
import { Menu } from "antd"
import { Switch, useRouteMatch, NavLink, Redirect } from 'react-router-dom';
import { Creators as DepartmentCreators  } from '../../services/redux/department/actions';
import { Creators as FloatCreators } from '../../services/redux/float/actions';
import { Creators as SupplierCreators } from '../../services/redux/supplier/actions';
import { Creators as CommentCreators } from '../../services/redux/comment/actions';
import AppLayout from '../AppLayout';
import AuthenticatedRoute from "../../presentation/AuthenticatedRoute";
import HodEndorsePendingList from "./components/HodEndorsePendingList";
import ApprovePendingList from './components/ApprovePendingList';
import { EMPLOYEE_ROLE } from '../../util/datas';
import { userHasAnyRole } from "../../services/api/auth";
import GmRetireFloat from './components/GmRetireFloat';
import AuditRetireFloat from './components/AuditRetireFloat';
import NotificationBadge from '../../shared/NotificationBadge';
import AllFloats from './components/AllFloats';

export const REQUEST_ITEMS = [
  {id: 1, name: "Coca cola", reason: "REPLACE", purpose: "refreshment", createdAt: "2021-12-18 14:00:50", status: "PENDING", quantity: 10},
  {id: 2, name: "Laptop charger", reason: "REPLACE", purpose: "Laptop not charging", createdAt: "2021-12-24 16:30:50", status: "PENDING", quantity: 1},
]

const FloatIndex = (props) => {
  const {
    currentUser,
    notifications
  } = props
  const [key, setKey] = React.useState([])
  const { path } = useRouteMatch()
  console.log('my request path', path)
  console.log('path', path)

  const handleNavClick = (value) => {
    setKey(value)
  }

  React.useEffect(() => {
    const url = window.location.href
    console.log("url", url)
    if(url.indexOf("/float/hod-pending-endorse") !== -1) {
      setKey("hod-pending-endorse")
    } else if(url.indexOf("/float/approve") !== -1) {
      setKey("/float/approve")
    } else if(url.indexOf("/gm-pending-retire") !== -1) {
      setKey("/float/gm-pending-retire")
    } else if(url.indexOf("/audit-pending-retire") !== -1) {
      setKey("/audit-pending-retire")
    } else if(url.indexOf('/float/all') !== -1) {
      setKey('/float-all')
    }
  }, [key])

  return (
    <>
      <AppLayout
        title="Float Requests Management"
        subNav={(
          <Menu
            selectedKeys={[key]}
            mode="horizontal"
            onClick={handleNavClick}
            forceSubMenuRender
          >
            {userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_HOD]) && (
              <Menu.Item key="hod-pending-endorse">
                <NavLink to="/app/float/hod-pending-endorse">
                  {notifications.floatPendingEndorsement ? (
                    <NotificationBadge count={notifications?.floatPendingEndorsement}>
                      <span>Floats Awaiting Endorsement</span>
                    </NotificationBadge>
                  ) : (<span>Floats Awaiting Endorsement</span>)}
                </NavLink>
              </Menu.Item>
            )}
            {userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER]) && (
              <>
                <Menu.Item key="/float/approve">
                  <NavLink to="/app/float/approve">
                  {notifications.floatPendingApprovalGM ? (
                    <NotificationBadge count={notifications?.floatPendingApprovalGM}>
                      <span>Floats Awaiting Approval</span>
                    </NotificationBadge>
                  ) : (<span>Floats Awaiting Approval</span>)}
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="/float/gm-pending-retire">
                  <NavLink to="/app/float/gm-pending-retire">
                    {notifications?.retireFloatPendingApprovalGM ? (
                      <NotificationBadge count={notifications?.retireFloatPendingApprovalGM}>
                        <span>Approve Floats Awaiting Retirement</span>
                      </NotificationBadge>
                    ): (<span>Approve Floats Awaiting Retirement</span>)}
                  </NavLink>
                </Menu.Item>
              </>
            )}
            {userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_AUDITOR]) && (
              <>
                <Menu.Item key="/audit-pending-retire">
                  <NavLink to="/app/float/audit-pending-retire">
                    {notifications?.retireFloatPendingAuditorCheck ? (
                      <NotificationBadge count={notifications?.retireFloatPendingAuditorCheck}>
                        <span>APPROVE FLOAT RETIREMENT</span>
                      </NotificationBadge>
                    ) : (<span>APPROVE FLOAT RETIREMENT</span>)}
                  </NavLink>
                </Menu.Item>
              </>
            )}
            {userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_ADMIN]) && (
              <>
                <Menu.Item key="/float-all">
                  <NavLink to="/app/float/all">
                    <span>ALL FLOATS</span>
                  </NavLink>
                </Menu.Item>
              </>
            )}
          </Menu>
        )}
      >
        <Switch>
          <AuthenticatedRoute
            exact
            path={`${path}`}
            {...props}
          >
            {currentUser.role === EMPLOYEE_ROLE.ROLE_HOD && <Redirect to="/app/float/hod-pending-endorse" />}
            {currentUser.role === EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER && <Redirect to="/app/float/approve" />}
            {currentUser.role === EMPLOYEE_ROLE.ROLE_AUDITOR && <Redirect to="/app/float/audit-pending-retire" />}
            {currentUser.role === EMPLOYEE_ROLE.ROLE_ADMIN && <Redirect to="/app/float/all" />}
          </AuthenticatedRoute>
          <AuthenticatedRoute
            path={`${path}/hod-pending-endorse`}
            component={HodEndorsePendingList}
            {...props}
            roles = {[EMPLOYEE_ROLE.ROLE_HOD]}
          />
          <AuthenticatedRoute 
            path={`${path}/gm-pending-retire`}
            component={GmRetireFloat}
            {...props}
            roles={[EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER]}
          />
          <AuthenticatedRoute 
            path={`${path}/audit-pending-retire`}
            component={AuditRetireFloat}
            {...props}
            roles={[EMPLOYEE_ROLE.ROLE_AUDITOR]}
          />
          <AuthenticatedRoute 
            path={`${path}/approve`}
            component={ApprovePendingList}
            {...props}
            roles={[EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER]}
          />
          <AuthenticatedRoute 
            path={`${path}/all`}
            component={AllFloats}
            {...props}
            roles={[EMPLOYEE_ROLE.ROLE_ADMIN]}
          />
        </Switch>
      </AppLayout>
    </>
  )
}


const mapStateToProps = (store) => ({
  departments: store.department.departments,
  fetching_departments: store.department.loading,

  currentUser: store.auth.user,

  float_requests: store.float.requests,
  fetching_float_requests: store.float.loading,
  float_submit_success: store.float.submit_success,
  float_submitting: store.float.submitting,
  selected_float_requests: store.float.selected_requests,

  suppliers: store.supplier.suppliers,
  authUser: store.auth,

  submitting_comment: store.comment.submitting,
  submit_comment_success: store.comment.submit_success,
  notifications: store.notification.notifications || {},

  comments: store.comment.comments,
  comment_loading: store.comment.loading,
  submitting_comment: store.comment.submitting,
  submit_comment_success: store.comment.submit_success,
  new_comment: store.comment.new_comment,
})

const mapActionsToProps = (dispatch) => {
  return {
    fetchDepartments: (query) => {
      dispatch(DepartmentCreators.fetchDepartments(query))
    },
    fetchFloatRequests: (query) => {
      dispatch(FloatCreators.fetchFloatRequests(query))
    },
    updateFloatRequest: (options) => {
      dispatch(FloatCreators.updateFloatRequest(options))
    },
    retireFloatOrder: payload => dispatch(FloatCreators.retireFloatOrder(payload)),
    updateFloatOrderStatus: (id, status) => dispatch(FloatCreators.updateFloatOrderStatus(id, status)),
    resetFloatRequests: (payload) => {
      dispatch(FloatCreators.resetRequest(payload))
    },
    fetchSuppliers: (query)=> {
      dispatch(SupplierCreators.fetchSuppliers(query))
    },
    updateFloatOrderStatus: (id, payload) => dispatch(FloatCreators.updateFloatOrderStatus(id, payload)),
    setSelectedFloatRequests: (requests) => {
      dispatch(FloatCreators.setSelectedFloatRequests(requests))
    },
    updateFloatOrderStatus: (id, status) => dispatch(FloatCreators.updateFloatOrderStatus(id, status)),
    resetFloatRequest: () => {
      dispatch(FloatCreators.resetFloatRequest())
    },
    createComment: (commentType, itemId, payload) => {
      dispatch(CommentCreators.createComment(commentType, itemId, payload))
    },
    setNewComment: (newComment) => {
      dispatch(CommentCreators.setNewComment(newComment))
    },
    resetComment: () => {
      dispatch(CommentCreators.resetComment())
    },
    fetchComments: (itemId, commentType) => {
      dispatch(CommentCreators.fetchComments(itemId, commentType))
    }
  }
}

export default connect(mapStateToProps, mapActionsToProps)(FloatIndex)