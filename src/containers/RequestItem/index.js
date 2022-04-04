import React from 'react';
import { connect } from 'react-redux';
import { Switch, useRouteMatch, NavLink, Redirect } from 'react-router-dom';
import { Creators as DepartmentCreators  } from '../../services/redux/department/actions'
import { Creators as RequestCreators } from '../../services/redux/request/actions'
import { Creators as SupplierCreators } from '../../services/redux/supplier/actions'
import { Creators as CommentCreators } from "../../services/redux/comment/actions"
import AppLayout from '../AppLayout';
import AuthenticatedRoute from "../../presentation/AuthenticatedRoute"
import HodReviewPendingList from './components/HodReviewPendingList';
import HodEndorsePendingList from "./components/HodEndorsePendingList"
import ApprovePendingList from './components/ApprovePendingList';
import { Badge, Menu, notification } from "antd"
import { EMPLOYEE_ROLE } from '../../util/datas';
import ApprovedItemRequest from './components/ApprovedItemRequests';
import EndorsedItemRequest from './components/EndorsedItemRequest';
import RequestItemHistory from './components/RequestItemHistory';
import NotificationBadge from '../../shared/NotificationBadge';


export const REQUEST_ITEMS = [
  {id: 1, name: "Coca cola", reason: "REPLACE", purpose: "refreshment", createdAt: "2021-12-18 14:00:50", status: "PENDING", quantity: 10},
  {id: 2, name: "Laptop charger", reason: "REPLACE", purpose: "Laptop not charging", createdAt: "2021-12-24 16:30:50", status: "PENDING", quantity: 1},
]

const RequestItemIndex = (props) => {
  const {
    currentUser,
    notifications,
  } = props
  console.log('request item props', props)

  const [key, setKey] = React.useState([])
  const { path } = useRouteMatch()
  

  const handleNavClick = (value) => {
    console.log('menus', value)
    setKey(value)
  }


  React.useEffect(() => {
    const url = window.location.href
    if(url.indexOf("/hod-pending-endorse") !== -1) {
      setKey("hod-pending-endorse")
    } else if(url.indexOf("/hod-pending-approve") !== -1) {
      setKey("hod-pending-approve")
    } else if(url.indexOf("gm-pending-approve") !== -1) {
      setKey("gm-pending-approve")
    } else if(url.includes("/hod-all-requests")) {
      setKey("/hod-all-requests")
    } else if(url.includes("/app/request-items/all-approved")) {
      setKey("all-approved-requests")
    } else if(url.includes("/app/request-items/all-endorsed")) {
      setKey("all-endorsed-requests")
    } else if(url.includes("/app/request-items/all")) {
      setKey("/app/request-items/all")
    }
  }, [key])

  const DefaultPage = () => {
    console.log('currentUserRole', currentUser.role, "ROLE ID", EMPLOYEE_ROLE.ROLE_HOD)
    const userRole = currentUser.role
    switch(userRole) {
      case EMPLOYEE_ROLE.ROLE_HOD:
        return <Redirect to="/app/request-items/hod-pending-endorse" />
      case EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER:
        return <Redirect to="/app/request-items/gm-pending-approve" />
      case EMPLOYEE_ROLE.ROLE_ADMIN:
        return <Redirect to="/app/request-items/all" />
      default:
        return <Redirect to="/app" />
    }
  }

  return (
    <>
      <AppLayout
        title="LPO Requests Management"
        subNav={(
          <Menu
            selectedKeys={[key]}
            mode="horizontal"
            onClick={handleNavClick}
            forceSubMenuRender
          >
            {currentUser.role === EMPLOYEE_ROLE.ROLE_HOD && (
              <>
                <Menu.Item key="hod-pending-endorse">
                  <NavLink to="/app/request-items/hod-pending-endorse">
                    {notifications.requestPendingEndorsementHOD ? (
                      <NotificationBadge count={notifications.requestPendingEndorsementHOD}>
                        <span>Requests Awaiting Endorsement</span>
                      </NotificationBadge>
                    ) : (<span>Requests Awaiting Endorsement</span>)}
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="hod-pending-approve">
                  <NavLink to="/app/request-items/hod-pending-approve">
                    {notifications.quotationPendingReviewHOD ? (
                      <NotificationBadge count={notifications.quotationPendingReviewHOD}>
                        <span>Requests Awaiting Review</span>
                      </NotificationBadge>
                    ) : (<span>Requests Awaiting Review</span>)}
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="all-endorsed-requests">
                  <NavLink to="/app/request-items/all-endorsed">
                    <span> Endorsed Request Items</span>
                  </NavLink>    
                </Menu.Item>
              </>
            )}
            {currentUser.role === EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER && (
              <>
                <Menu.Item key="gm-pending-approve">
                  <NavLink to="/app/request-items/gm-pending-approve">
                    {notifications.requestPendingApprovalGM ? (
                      <NotificationBadge count={notifications.requestPendingApprovalGM}>
                        <span>Requests Awaiting Approval</span>
                      </NotificationBadge>
                    ) : (<span>Requests Awaiting Approval</span>)}
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="all-approved-requests">
                  <NavLink to="/app/request-items/all-approved">
                    <span> Approved Request Items</span>
                  </NavLink>    
                </Menu.Item>
              </>
            )}
            {[EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER, EMPLOYEE_ROLE.ROLE_ADMIN].includes(currentUser.role) && (
              <Menu.Item key="/app/request-items/all">
                <NavLink to="/app/request-items/all">
                  <span>Request Items</span>
                </NavLink>
              </Menu.Item> 
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
            {DefaultPage}
          </AuthenticatedRoute>
          <AuthenticatedRoute
            roles={[EMPLOYEE_ROLE.ROLE_HOD]}
            path={`/app/request-items/hod-pending-endorse`}
            component={HodEndorsePendingList}
            {...props}
          />
          <AuthenticatedRoute
            roles={[EMPLOYEE_ROLE.ROLE_HOD]}
            exact
            path={`/app/request-items/hod-pending-approve`}
            component={HodReviewPendingList}
            {...props}
          />
          <AuthenticatedRoute 
            roles={[EMPLOYEE_ROLE.ROLE_ADMIN, EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER, EMPLOYEE_ROLE.ROLE_HOD]}
            exact
            path="/app/request-items/all"
            component={RequestItemHistory}
            {...props}
          />
          <AuthenticatedRoute 
            roles={[EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER]}
            exact
            path={`/app/request-items/all-approved`}
            component={ApprovedItemRequest}
            {...props}
          />
          <AuthenticatedRoute 
            roles={[EMPLOYEE_ROLE.ROLE_HOD]}
            exact
            path={`/app/request-items/all-endorsed`}
            component={EndorsedItemRequest}
            {...props}
          />
          <AuthenticatedRoute 
            roles={[EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER]}
            exact
            path={`/app/request-items/gm-pending-approve`}
            component={ApprovePendingList}
            {...props}
          />
        </Switch>
      </AppLayout>
    </>
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
  suppliers: store.supplier.suppliers,
  selected_requests: store.request.selected_requests,
  fetching_requests: store.request.loading,
  updating_request: store.request.updating,
  update_request_success: store.request.update_success, 
  authUser: store.auth,

  submitting_comment: store.comment.submitting,
  submit_comment_success: store.comment.submit_success,
  notifications: store.notification.notifications || {}
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
    },
    setSelectedRequests: (requests) => {
      dispatch(RequestCreators.setSelectedRequests(requests))
    },
    resetRequest: () => {
      dispatch(RequestCreators.resetRequest())
    },
    createComment: (procurementType, payload) => {
      dispatch(CommentCreators.createComment(procurementType, payload))
    }
  }
}

export default connect(mapStateToProps, mapActionsToProps)(RequestItemIndex)