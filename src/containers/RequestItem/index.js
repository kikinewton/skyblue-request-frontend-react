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
import { Menu } from "antd"
import { EMPLOYEE_ROLE } from '../../util/datas';


export const REQUEST_ITEMS = [
  {id: 1, name: "Coca cola", reason: "REPLACE", purpose: "refreshment", createdAt: "2021-12-18 14:00:50", status: "PENDING", quantity: 10},
  {id: 2, name: "Laptop charger", reason: "REPLACE", purpose: "Laptop not charging", createdAt: "2021-12-24 16:30:50", status: "PENDING", quantity: 1},
]

const RequestItemIndex = (props) => {
  const {
    currentUser
  } = props
  console.log('curentUser', currentUser)

  const [key, setKey] = React.useState([])
  const { path } = useRouteMatch()
  

  const handleNavClick = (value) => {
    console.log('menus', value)
    setKey(value)
  }

  React.useEffect(() => {
    console.log('init')
  }, [])

  React.useEffect(() => {
    const url = window.location.href
    if(url.indexOf("/hod-pending-endorse") !== -1) {
      setKey("hod-pending-endorse")
    } else if(url.indexOf("/hod-pending-approve") !== -1) {
      setKey("hod-pending-approve")
    } else if(url.indexOf("gm-pending-approve") !== -1) {
      setKey("gm-pending-approve")
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
                    <span>Pending Endorsement</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="hod-pending-approve">
                  <NavLink to="/app/request-items/hod-pending-approve">
                    <span>Pending Review</span>
                  </NavLink>
                </Menu.Item>
              </>
            )}
            {currentUser.role === EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER && (
              <>
                <Menu.Item key="gm-pending-approve">
                  <NavLink to="/app/request-items/gm-pending-approve">
                    <span>Pending Approval</span>
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
  submit_comment_success: store.comment.submit_success
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