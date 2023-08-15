import "antd/dist/antd.less";
//import "./App.less"
import { Switch, Route, Redirect } from 'react-router-dom'
import React, { useEffect } from "react";
import { Spin } from "antd";
import { DEPARTMENTS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, EMPLOYEE_ROUTE, MY_REQUESTS_ROUTE, PROCUREMENT_ROUTE, DASHBOARD_ROUTE } from "./util/routes";
import './styles/app.less'
import AuthenticatedRoute from './presentation/AuthenticatedRoute'
import { connect } from 'react-redux'
import { EMPLOYEE_ROLE } from "./util/datas";
import { Creators as NotificationCreators } from "./services/redux/notification/actions";
const Login = React.lazy(()=> import('./containers/Auth'))
const Home = React.lazy(()=> import('./containers/Home'))
const Department = React.lazy(()=> import('./containers/Department'))
const Employee = React.lazy(() => import('./containers/Employee'))
const StoreManagement = React.lazy(() => import('./containers/StoreManagement'))
const MyRequest = React.lazy(()=> import('./containers/MyRequest'))
const NotAuthorized = React.lazy(()=> import('./containers/NotAuthorized'))
const Procurement = React.lazy(() => import('./containers/Procurement'))
const Dashboard = React.lazy(() => import('./containers/Dashboard'))
const Store = React.lazy(() => import('./containers/Store'))
const Settings = React.lazy(()=> import('./containers/Settings'))
const Account = React.lazy(() => import('./containers/Account'))
const Report = React.lazy(()=> import('./containers/Report'))
const Audit = React.lazy(() => import('./containers/Audit'))
const QuotationView = React.lazy(() => import('./containers/Quotation'))
const RequestItemIndex = React.lazy(() => import("./containers/RequestItem"))
const PettyCashIndex = React.lazy(() => import("./containers/PettyCash"))
const FloatIndex = React.lazy(() => import("./containers/Float"))
const SupplierModule = React.lazy(() => import("./containers/SupplierModule"))
const LocalPurchaseOrderModule = React.lazy(() => import("./containers/LocalPurchaseOrderModule"))
const GrnIndex = React.lazy(() => import("./containers/Grn"))
const PaymentsModule = React.lazy(() => import("./containers/Payment"))


function App(props) {
  const { authUser, fetchNotifications } = props
  return (
    <>
      <React.Suspense fallback={<Spin />}>
        <Switch>
          <Route path="/app/account" component={Account} {...props} />
          <Route path="/app/store" component={Store} {...props} />
          <Route path="/app/grn" component={GrnIndex} />
          <Route path="/app/payments" component={PaymentsModule} {...props} />
          <AuthenticatedRoute path={`${DASHBOARD_ROUTE}`} component={Dashboard} />
          <Route path={PROCUREMENT_ROUTE} component={Procurement} {...props} />
          <Route path={MY_REQUESTS_ROUTE} component={MyRequest} {...props} />
          <AuthenticatedRoute path={DEPARTMENTS_ROUTE} component={Department} />
          <AuthenticatedRoute path={EMPLOYEE_ROUTE}  component={Employee} />
          <AuthenticatedRoute path="/app/stores-list" component={StoreManagement} />
          <AuthenticatedRoute exact path={HOME_ROUTE}  component={Home} />
          
          <AuthenticatedRoute path="/app/local-purchase-orders" component={LocalPurchaseOrderModule} />
          <AuthenticatedRoute path="/app/settings" component={Settings} {...props} />
          <Route path="/app/reports" component={Report} {...props} />
          <Route path="/app/quotations" component={QuotationView} {...props} />
          <AuthenticatedRoute path="/app/suppliers" component={SupplierModule} {...props} roles={[EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER, EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER]} />

          <Route path="/app/request-items" component={RequestItemIndex} {...props} />
          <Route path="/app/petty-cash" component={PettyCashIndex} {...props} />
          <Route path="/app/float" component={FloatIndex} {...props} />

          <Route path="/app/audit" component={Audit} {...props} />
          <Route path={LOGIN_ROUTE} component={Login} />
          <Route path="/not-authorized" component={NotAuthorized} {...props}/>
          <AuthenticatedRoute path="/" ><Redirect to={HOME_ROUTE}/></AuthenticatedRoute>
        </Switch>
      </React.Suspense>
    </>
  );
}

const mapActionToProps = dispatch => ({
  fetchNotifications: () => dispatch(NotificationCreators.fetchNotifications())
})

const mapStateToProps = (store) => ({
  authUser: store.auth.user,
  notifications: store.notification.notifications,
  notification_loading: store.notification.loading,
})

export default connect(mapStateToProps, mapActionToProps)(App);
