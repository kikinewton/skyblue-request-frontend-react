import React from 'react'
import { connect } from 'react-redux'
import { Switch, useRouteMatch, useHistory, Route } from 'react-router-dom'
import { Creators as DepartmentCreators  } from '../../services/redux/department/actions'
import { Creators as RequestCreators } from '../../services/redux/request/actions'
import { Creators as FloatCreators } from "../../services/redux/float/actions"
import { Creators as PettyCashCreators } from "../../services/redux/petty-cash/actions"
import AppLayout from '../AppLayout'
import MyRequestsIndex from './components'
import { Menu } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import ListLpos from "./components/Lpo/LpoList"
import AddLpo from "./components/Lpo/Add"
import ListPettyCash from "./components/PettyCash/List"
import AddPettyCash from "./components/PettyCash/Add"
import ListFloat from "./components/Float/List"
import AddFloat from "./components/Float/Add"
import RequestTracker from './components/Lpo/RequestTracker'
import AuthenticatedRoute from "../../presentation/AuthenticatedRoute"
import UploadDocuments from './components/Float/UploadDocuments'
import FloatsPendingUploadDocument from './components/Float/FloatsPendingUploadDocument'
import FloatRetire from "./components/Float/FloatRetire"
import EditFloatOrder from './components/Float/Edit'

const MyRequest = (props)=> {
  const [current, setCurrent] = React.useState("my-lpos")
  const { path } = useRouteMatch()
  const history = useHistory()

  React.useEffect(() => {
    const url = window.location.href
    let key = "my-lpos"
    if(url.indexOf("/lpos/add-new") !== -1) {
      key= "create-request"
    } else if(url.indexOf("/petty-cash-requests/add-new") !== -1) {
      key= "create-petty-cash"
    } else if(url.indexOf("/float-requests/add-new") !== -1) {
      key= "create-float"
    } else if(url.indexOf("/my-requests/lpos") !== -1) {
      key = "my-lpos"
    } else if(url.indexOf("/app/my-requests/float-request-pending-document") !== -1) {
      key = "float-request-pending-document"
    } else if(url.indexOf("/my-requests/petty-cash-requests") !== -1) {
      key = "my-petty-cash-requests"
    } else if(url.indexOf("/my-requests/float-requests") !== -1) {
      key = "my-float-requests"
    } else {
      key = "create-request"
    }
    setCurrent(key)
  }, [current])

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={`${path}`}>
          <MyRequestsIndex {...props} />
        </Route>
        <Route path={`${path}/lpos/add-new`}>
          <AddLpo {...props} />
        </Route>
        <Route path={`${path}/lpos/:request_id/details`}>
          <RequestTracker {...props} />
        </Route>
        <Route exact path={`${path}/lpos`}>
          <ListLpos {...props} />
        </Route>
        <Route path={`${path}/petty-cash-requests/add-new`}>
          <AddPettyCash {...props} />
        </Route>
        <Route path={`${path}/petty-cash-requests`}>
          <ListPettyCash {...props} />
        </Route>
        <Route path={`${path}/float-requests/add-new`}>
          <AddFloat {...props} />
        </Route>
        <Route path={`${path}/float-requests/:id/retire`}>
          <FloatRetire {...props} />
        </Route>
        <Route path={`${path}/float-requests/:id/edit`}>
          <EditFloatOrder {...props} />
        </Route>
        <Route exact path={`${path}/float-requests`}>
          <ListFloat {...props} />
        </Route>
        <AuthenticatedRoute path={`${path}/float-request-pending-document`} component={FloatsPendingUploadDocument} {...props} />
      </Switch>
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  departments: store.department.departments,
  departmentsLoading: store.department.loading,
  currentUser: store.auth.user,
  requests: store.request.requests,
  requestLoading: store.request.loading,
  requestSubmitting: store.request.submitting,
  my_requests: store.request.my_requests,
  submitSuccess: store.request.submitSuccess,
  update_request_success: store.request.update_success,
  updating_request: store.request.updating,
  request: store.request.request,

  my_petty_cash_requests: store.petty_cash.my_requests,
  fetching_petty_cash_requests: store.petty_cash.loading,
  submitting_petty_cash_request: store.petty_cash.submitting,
  submit_petty_cash_request_success: store.petty_cash.submit_success,

  my_float_requests: store.float.my_requests,
  float_requests: store.float.requests,
  fetching_float_requests: store.float.loading,
  submitting_float_request: store.float.submitting,
  submit_float_request_success: store.float.submit_success,
  float_orders: store.float.orders,
  float_order: store.float.order,
})

const mapActionsToProps = (dispatch) => {
  return {
    fetchDepartments: (query) => {
      dispatch(DepartmentCreators.fetchDepartments(query))
    },
    resetRequest: () => dispatch(RequestCreators.resetRequest()),
    createRequest: (payload) => {
      dispatch(RequestCreators.createRequest(payload))
    },
    fetchRequests: (query) => {
      dispatch(RequestCreators.fetchRequests(query))
    },
    getRequest: (id) => {
      dispatch(RequestCreators.getRequest(id))
    },
    setRequest: (request) => {
      dispatch(RequestCreators.setRequest(request))
    },
    updateRequest: (options) => {
      dispatch(RequestCreators.updateRequest(options))
    },
    updateSingleRequest: (id, payload) => {
      dispatch(RequestCreators.updateSingleRequest(id, payload))
    },
    fetchMyRequests: (query) => {
      dispatch(RequestCreators.fetchMyRequests(query))
    },

    fetchMyFloatRequests: (query) => {
      dispatch(FloatCreators.fetchMyFloatRequests(query))
    },
    fetchFloatRequests: (query) => {
      dispatch(FloatCreators.fetchFloatRequests(query))
    },
    addItemsToFloatOrder: (id, payload) => dispatch(FloatCreators.addItemsToFloatOrder(id, payload)),
    retireFloatOrder: (id, payload) => dispatch(FloatCreators.retireFloatOrder(id, payload)),
    fetchFloatOrders: query => dispatch(FloatCreators.fetchFloatOrders(query)),
    fetchFloatOrder: id => dispatch(FloatCreators.fetchFloatOrder(id)),
    createFloatRequest: (payload) => {
      dispatch(FloatCreators.createFloatRequest(payload))
    },
    updateSingleFloatRequest: (id, payload) => {
      dispatch(FloatCreators.updateSingleFloatRequest(id, payload))
    },
    resetFloatRequest: () => {
      dispatch(FloatCreators.resetFloatRequest())
    },
    fetchMyPettyCashRequests: (query) => {
      dispatch(PettyCashCreators.fetchMyPettyCashRequests(query))
    },
    createPettyCashRequest: (payload) => {
      dispatch(PettyCashCreators.createPettyCashRequest(payload))
    },
    updatePettyCashRequest: (id, payload) => {
      dispatch(PettyCashCreators.updatePettyCashRequest(id, payload))
    },
    resetPettyCashRequest: () => dispatch(PettyCashCreators.resetPettyCashRequest())
  }
}
export default connect(mapStateToProps, mapActionsToProps)(MyRequest)