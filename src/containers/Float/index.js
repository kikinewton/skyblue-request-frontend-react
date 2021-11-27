import React from 'react';
import { connect } from 'react-redux';
import { Switch, useRouteMatch, NavLink, Redirect } from 'react-router-dom';
import { Creators as DepartmentCreators  } from '../../services/redux/department/actions'
import { Creators as FloatCreators } from '../../services/redux/float/actions';
import { Creators as SupplierCreators } from '../../services/redux/supplier/actions'
import { Creators as CommentCreators } from '../../services/redux/comment/actions';
import AppLayout from '../AppLayout';
import AuthenticatedRoute from "../../presentation/AuthenticatedRoute"
import HodEndorsePendingList from "./components/HodEndorsePendingList"
import ApprovePendingList from './components/ApprovePendingList';
import { Menu} from "antd"
import { EMPLOYEE_ROLE } from '../../util/datas';
import { userHasAnyRole } from "../../services/api/auth"

export const REQUEST_ITEMS = [
  {id: 1, name: "Coca cola", reason: "REPLACE", purpose: "refreshment", createdAt: "2021-12-18 14:00:50", status: "PENDING", quantity: 10},
  {id: 2, name: "Laptop charger", reason: "REPLACE", purpose: "Laptop not charging", createdAt: "2021-12-24 16:30:50", status: "PENDING", quantity: 1},
]

const FloatIndex = (props) => {
  const {
    currentUser
  } = props
  const [key, setKey] = React.useState([])
  const { path } = useRouteMatch()
  console.log('my request path', path)
  console.log('path', path)

  const handleNavClick = (value) => {
    console.log('menus', value)
  }

  React.useEffect(() => {
    const url = window.location.href
    console.log("url", url)
    if(url.indexOf("/float/hod-pending-endorse") !== -1) {
      setKey("hod-pending-endorse")
    } else if(url.indexOf("/float/approve") !== -1) {
      setKey("/float/approve")
    }
  }, [key])

  return (
    <>
      <AppLayout
        title="Float Requests Manegement"
        subNav={(
          <Menu
            selectedKeys={[key]}
            mode="horizontal"
            onClick={handleNavClick}
            forceSubMenuRender
            mode="horizontal"
          >
            {userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_HOD]) && (
              <Menu.Item key="hod-pending-endorse">
                <NavLink to="/app/float/hod-pending-endorse">
                  <span>Floats Awaiting Endorsement</span>
                </NavLink>
              </Menu.Item>
            )}
            {userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER]) && (
              <Menu.Item key="/float/approve">
                <NavLink to="/app/float/approve">
                  <span>Floats Awaiting Approval</span>
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
            {currentUser.role === EMPLOYEE_ROLE.ROLE_HOD ? <Redirect to="/app/float/hod-pending-endorse" /> :
             <Redirect to="/app/float/approve" />
             }
          </AuthenticatedRoute>
          <AuthenticatedRoute
            path={`${path}/hod-pending-endorse`}
            component={HodEndorsePendingList}
            {...props}
            roles = {[EMPLOYEE_ROLE.ROLE_HOD]}
          />
          <AuthenticatedRoute 
            path={`${path}/approve`}
            component={ApprovePendingList}
            {...props}
            roles={[EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER]}
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
  submit_comment_success: store.comment.submit_success
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
    resetFloatRequests: (payload) => {
      dispatch(FloatCreators.resetRequest(payload))
    },
    fetchSuppliers: (query)=> {
      dispatch(SupplierCreators.fetchSuppliers(query))
    },
    setSelectedFloatRequests: (requests) => {
      dispatch(FloatCreators.setSelectedFloatRequests(requests))
    },
    resetFloatRequest: () => {
      dispatch(FloatCreators.resetFloatRequest())
    },
    createComment: (pT, comment) => {
      dispatch(CommentCreators.createComment(pT,comment))
    }
  }
}

export default connect(mapStateToProps, mapActionsToProps)(FloatIndex)