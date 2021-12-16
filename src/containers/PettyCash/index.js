import React from 'react';
import { connect } from 'react-redux';
import { Switch, useRouteMatch, NavLink, Redirect, useLocation } from 'react-router-dom';
import { Creators as DepartmentCreators  } from '../../services/redux/department/actions'
import { Creators as PettyCashCreators } from '../../services/redux/petty-cash/actions';
import { Creators as SupplierCreators } from '../../services/redux/supplier/actions'
import { Creators as CommentCreatores } from '../../services/redux/comment/actions';
import AppLayout from '../AppLayout';
import AuthenticatedRoute from "../../presentation/AuthenticatedRoute"
import HodReviewPendingList from './components/HodReviewPendingList';
import HodEndorsePendingList from "./components/HodEndorsePendingList"
import { Menu } from "antd"


export const REQUEST_ITEMS = [
  {id: 1, name: "Coca cola", reason: "REPLACE", purpose: "refreshment", createdAt: "2021-12-18 14:00:50", status: "PENDING", quantity: 10},
  {id: 2, name: "Laptop charger", reason: "REPLACE", purpose: "Laptop not charging", createdAt: "2021-12-24 16:30:50", status: "PENDING", quantity: 1},
]

const PettyCashIndex = (props) => {
  console.log('petty cash index')
  const {
    currentUser
  } = props
  const [key, setKey] = React.useState([])
  const { path } = useRouteMatch()
  const location = useLocation()

  console.log('my request path', path)
  console.log('path', path)
  const displayPage = (props) => {

  }

  const handleNavClick = (value) => {
    console.log('menus', value)
  }

  React.useEffect(() => {
    const { pathname } = location
    if(pathname.includes("/petty-cash/hod-pending-endorse")) {
      setKey("hod-pending-endorse")
    } else if(pathname.includes("/petty-cash/hod-pending-review")) {
      setKey("hod-pending-review")
    } else if(pathname.includes("/petty-cash/gm-pending-approve")) {
      setKey("gm-pending-approve")
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
            <Menu.Item key="hod-pending-endorse">
              <NavLink to="/app/petty-cash/hod-pending-endorse">
                <span>Pending Endorsement</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="hod-pending-review">
              <NavLink to="/app/petty-cash/hod-pending-review">
                <span>Pending Review</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="gm-pending-approve">
              <NavLink to="/app/petty-cash/gm-approve-list">
                <span>Awaiting Approval</span>
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
            <Redirect to="/app/petty-cash/hod-pending-endorse" />
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
  petty_cash_submit_success: store.request.submit_success,
  petty_cash_submitting: store.petty_cash.submitting,
  suppliers: store.supplier.suppliers,
  selected_petty_cash_requests: store.petty_cash.selected_requests,
  authUser: store.auth,
  submitting_comment: store.comment.submitting,
  submit_comment_success: store.comment.submit_success
})

const mapActionsToProps = (dispatch) => {
  return {
    fetchDepartments: (query) => {
      dispatch(DepartmentCreators.fetchDepartments(query))
    },
    fetchPettyCashRequests: (query) => {
      console.log('lets fetch from index')
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
    createComment: (type, payload) => dispatch(CommentCreatores.createComment(type, payload)),
  }
}

export default connect(mapStateToProps, mapActionsToProps)(PettyCashIndex)