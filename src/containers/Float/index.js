import React from 'react';
import { connect } from 'react-redux';
import { Switch, useRouteMatch, NavLink, Redirect } from 'react-router-dom';
import { Creators as DepartmentCreators  } from '../../services/redux/department/actions'
import { Creators as FloatCreators } from '../../services/redux/float/actions';
import { Creators as SupplierCreators } from '../../services/redux/supplier/actions'
import AppLayout from '../AppLayout';
import AuthenticatedRoute from "../../presentation/AuthenticatedRoute"
import HodEndorsePendingList from "./components/HodEndorsePendingList"
import { Menu, Row, Col } from "antd"


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
  const displayPage = (props) => {

  }

  const handleNavClick = (value) => {
    console.log('menus', value)
  }

  React.useEffect(() => {
    const url = window.location.href
    console.log("url", url)
    if(url.indexOf("/hod-pending-endorse") !== -1) {
      setKey("hod-pending-endorse")
    } else if(url.indexOf("/hod-pending-approve") !== -1) {
      setKey("hod-pending-approve")
    } else if(url.indexOf("gm-pending-approve") !== -1) {
      setKey("gm-pending-approve")
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
            <Menu.Item key="hod-pending-endorse">
              <NavLink to="/app/float/hod-pending-endorse">
                <span>Pending Endorsement</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="gm-pending-approve">
              <NavLink to="/app/float/gm-approve-list">
                <span>GM Awaiting Approval Requests</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        )}
      >
        <Switch>
          <AuthenticatedRoute
            exact
            path={`${path}`}
            {...props}
          >
            <Redirect to="/app/float/hod-pending-endorse" />
          </AuthenticatedRoute>
          <AuthenticatedRoute
            path={`${path}/hod-pending-endorse`}
            component={HodEndorsePendingList}
            {...props}
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
  authUser: store.auth
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
    }
  }
}

export default connect(mapStateToProps, mapActionsToProps)(FloatIndex)