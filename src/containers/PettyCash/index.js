import React from 'react';
import { connect } from 'react-redux';
import { Switch, useRouteMatch, NavLink, Redirect } from 'react-router-dom';
import { Creators as DepartmentCreators  } from '../../services/redux/department/actions'
import { Creators as PettyCashCreators } from '../../services/redux/petty-cash/actions';
import { Creators as SupplierCreators } from '../../services/redux/supplier/actions'
import AppLayout from '../AppLayout';
import AuthenticatedRoute from "../../presentation/AuthenticatedRoute"
import HodApprovePendingList from './components/HodApprovePendingList';
import HodEndorsePendingList from "./components/HodEndorsePendingList"
import { Menu, Row, Col } from "antd"


export const REQUEST_ITEMS = [
  {id: 1, name: "Coca cola", reason: "REPLACE", purpose: "refreshment", createdAt: "2021-12-18 14:00:50", status: "PENDING", quantity: 10},
  {id: 2, name: "Laptop charger", reason: "REPLACE", purpose: "Laptop not charging", createdAt: "2021-12-24 16:30:50", status: "PENDING", quantity: 1},
]

const PettyCashIndex = (props) => {
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

  React.useEffect(() => {
    if(path.indexOf("/hod-pending-endorse")) {
      setKey("hod-pending")
    } else if(path.indexOf("/hod-pending-approve")) {
      setKey("hod-approve")
    }
  }, [key])

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
            mode="horizontal"
          >
            <Menu.Item key="hod-">
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
        )}
      >
        <Switch>
          <AuthenticatedRoute
            exact
            path={`${path}`}
            {...props}
          >
            <Redirect to="/app/petty-cash/hod-endorse" />
          </AuthenticatedRoute>
          <AuthenticatedRoute
            path={`${path}/hod-endorse`}
            component={HodEndorsePendingList}
            {...props}
          />
          <AuthenticatedRoute
            exact
            path={`${path}/hod-approve`}
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
  fetching_departments: store.department.loading,
  currentUser: store.auth.user,
  petty_cash_requests: store.petty_cash.petty_cash_requests,
  fetching_petty_cash_requests: store.petty_cash.loading,
  petty_cash_submit_success: store.request.submit_success,
  petty_cash_submitting: store.petty_cash.submitting,
  suppliers: store.supplier.suppliers,
  selected_petty_cash_requests: store.request.selected_requests,
  authUser: store.auth
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
    resetRequests: () => {
      dispatch(PettyCashCreators.resetRequest())
    },
    fetchSuppliers: (query)=> {
      dispatch(SupplierCreators.fetchSuppliers(query))
    },
    setSelectedRequests: (requests) => {
      dispatch(PettyCashCreators.setSelectedRequests(requests))
    },
    resetPettyCashRequest: () => {
      dispatch(PettyCashCreators.resetPettyCashRequest())
    }
  }
}

export default connect(mapStateToProps, mapActionsToProps)(PettyCashIndex)