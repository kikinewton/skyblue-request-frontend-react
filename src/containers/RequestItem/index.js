import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, useRouteMatch, NavLink, Redirect } from 'react-router-dom';
import { Creators as DepartmentCreators  } from '../../services/redux/department/actions'
import { Creators as RequestCreators } from '../../services/redux/request/actions'
import { Creators as SupplierCreators } from '../../services/redux/supplier/actions'
import AppLayout from '../AppLayout';
import AuthenticatedRoute from "../../presentation/AuthenticatedRoute"
import HodApprovePendingList from './components/HodApprovePendingList';
import HodEndorsePendingList from "./components/HodEndorsePendingList"
import { Menu } from "antd"
import PrivateRoute from '../../presentation/PrivateRoute';


export const REQUEST_ITEMS = [
  {id: 1, name: "Coca cola", reason: "REPLACE", purpose: "refreshment", createdAt: "2021-12-18 14:00:50", status: "PENDING", quantity: 10},
  {id: 2, name: "Laptop charger", reason: "REPLACE", purpose: "Laptop not charging", createdAt: "2021-12-24 16:30:50", status: "PENDING", quantity: 1},
]

const RequestItemIndex = (props) => {
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
    console.log('init')
  }, [])

  return (
    <>
      <AppLayout>
        <Menu
          selectedKeys={[key]}
          mode="horizontal"
          onClick={handleNavClick}
          forceSubMenuRender
          mode="horizontal"
        >
          <Menu.Item key="hod-pending-endorse">
            <NavLink to="/app/request-items/hod-pending-endorse">
              <span>Pending Endorsement</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="hod-pending-approve">
            <NavLink to="/app/request-items/hod-pending-approve">
              <span>Pending Approval</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="gm-pending-approve">
            <NavLink to="/app/request-items/gm-approve-list">
              <span>GM Awaiting Approval Requests</span>
            </NavLink>
          </Menu.Item>
        </Menu>
        
        <Switch>
          <AuthenticatedRoute
            exact
            path={`${path}`}
            {...props}
          >
            <Redirect to="/app/request-items/hod-pending-endorse" />
          </AuthenticatedRoute>
          <AuthenticatedRoute
            path={`${path}/hod-pending-approve`}
            component={HodEndorsePendingList}
            {...props}
          />
          <AuthenticatedRoute
            exact
            path={`${path}/hod-approve-endorse`}
            component={HodApprovePendingList} 
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
  authUser: store.auth
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
    }
  }
}

export default connect(mapStateToProps, mapActionsToProps)(RequestItemIndex)