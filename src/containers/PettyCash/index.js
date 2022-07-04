import React from 'react';
import { connect } from 'react-redux';
import { Switch, useRouteMatch, NavLink, Redirect, useLocation } from 'react-router-dom';
import { Creators as DepartmentCreators  } from '../../services/redux/department/actions'
import { Creators as PettyCashCreators } from '../../services/redux/petty-cash/actions';
import { Creators as SupplierCreators } from '../../services/redux/supplier/actions'
import { Creators as CommentCreators } from '../../services/redux/comment/actions';
import AppLayout from '../AppLayout';
import AuthenticatedRoute from "../../presentation/AuthenticatedRoute"
import HodReviewPendingList from './components/HodReviewPendingList';
import HodEndorsePendingList from "./components/HodEndorsePendingList"
import { Menu } from "antd"
import { EMPLOYEE_ROLE } from '../../util/datas';
import ApprovePendingList from './components/ApprovePendingList';
import { userHasAnyRole } from "../../services/api/auth"
import NotificationBadge from '../../shared/NotificationBadge';


export const REQUEST_ITEMS = [
  {id: 1, name: "Coca cola", reason: "REPLACE", purpose: "refreshment", createdAt: "2021-12-18 14:00:50", status: "PENDING", quantity: 10},
  {id: 2, name: "Laptop charger", reason: "REPLACE", purpose: "Laptop not charging", createdAt: "2021-12-24 16:30:50", status: "PENDING", quantity: 1},
]

const PettyCashIndex = (props) => {
  console.log('petty cash index')
  const {
    authUser,
    notifications
  } = props

  const [key, setKey] = React.useState([])
  const { path } = useRouteMatch()
  const location = useLocation()

  const handleNavClick = (value) => {
    setKey(value)
  }

  React.useEffect(() => {
    const { pathname } = location
    if(pathname.includes("/petty-cash/hod-pending-endorse")) {
      setKey("hod-pending-endorse")
    } else if(pathname.includes("/petty-cash/hod-pending-review")) {
      setKey("hod-pending-review")
    } else if(pathname.includes("/petty-cash/gm-approve-list")) {
      setKey("/petty-cash/gm-approve-list")
    }
  }, [key])

  const DefaultPage = () => {
    switch(authUser.role) {
      case EMPLOYEE_ROLE.ROLE_HOD:
        return <Redirect to="/app/petty-cash/hod-pending-endorse" />
      case EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER:
        return <Redirect to="/app/petty-cash/gm-approve-list" />
      default:
        return <Redirect to="/app" />
    }
  }

  return (
    <>
      <AppLayout 
        title="Petty cash requests"
        subNav={(
          <Menu
            selectedKeys={[key]}
            mode="horizontal"
            onClick={handleNavClick}
            forceSubMenuRender
          >
            {userHasAnyRole(authUser.role, [EMPLOYEE_ROLE.ROLE_HOD]) && (
              <Menu.Item key="hod-pending-endorse">
                <NavLink to="/app/petty-cash/hod-pending-endorse">
                  {notifications.pettyCashPendingEndorsement ? (
                    <NotificationBadge count={notifications?.pettyCashPendingEndorsement}>
                       <span>Awaiting Endorsement</span>
                    </NotificationBadge>
                  ) : (<span>Awaiting Endorsement</span>)}
                </NavLink>
              </Menu.Item>
            )}
            {userHasAnyRole(authUser.role, [EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER]) && (
              <Menu.Item key="/petty-cash/gm-approve-list">
                <NavLink to="/app/petty-cash/gm-approve-list">
                {notifications.pettyCashPendingApproval ? (
                    <NotificationBadge count={notifications?.pettyCashPendingApproval}>
                       <span>Awaiting Endorsement</span>
                    </NotificationBadge>
                  ) : (<span>Awaiting Endorsement</span>)}
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
            <DefaultPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute
            path={`${path}/hod-pending-endorse`}
            component={HodEndorsePendingList}
            {...props}
          />
          <AuthenticatedRoute
            exact
            path={`${path}/hod-pending-review`}
            component={HodReviewPendingList} 
            {...props}
          />
          <AuthenticatedRoute path={`${path}/gm-approve-list`} component={ApprovePendingList} {...props} />
        </Switch>
      </AppLayout>
    </>
  )
}


const mapStateToProps = (store) => ({
  departments: store.department.departments,
  fetching_departments: store.department.loading,
  currentUser: store.auth.user,
  petty_cash_requests: store.petty_cash.requests,
  fetching_petty_cash_requests: store.petty_cash.loading,
  petty_cash_submit_success: store.petty_cash.submit_success,
  petty_cash_submitting: store.petty_cash.submitting,
  suppliers: store.supplier.suppliers,
  selected_petty_cash_requests: store.petty_cash.selected_requests,
  authUser: store.auth.user,
  submitting_comment: store.comment.submitting,
  submit_comment_success: store.comment.submit_success,
  notifications: store?.notification?.notifications || {},

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
    fetchPettyCashRequests: (query) => {
      dispatch(PettyCashCreators.fetchPettyCashRequests(query))
    },
    updatePettyCashRequest: (options) => {
      dispatch(PettyCashCreators.updatePettyCashRequest(options))
    },
    updateBulkPettyCashRequest: (payload) => {
      dispatch(PettyCashCreators.updateBulkPettyCashRequest(payload))
    },
    resetRequests: () => {
      dispatch(PettyCashCreators.resetRequest())
    },
    fetchSuppliers: (query)=> {
      dispatch(SupplierCreators.fetchSuppliers(query))
    },
    setSelectedPettyCashRequests: (requests) => {
      dispatch(PettyCashCreators.setSelectedPettyCashRequests(requests))
    },
    resetPettyCashRequest: () => {
      dispatch(PettyCashCreators.resetPettyCashRequest())
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

export default connect(mapStateToProps, mapActionsToProps)(PettyCashIndex)