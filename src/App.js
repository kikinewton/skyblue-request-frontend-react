import "antd/dist/antd.less";
//import "./App.less"
import { Switch, Route, Redirect } from 'react-router-dom'
import React from "react";
import { Spin } from "antd";
import { DEPARTMENTS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SUPPLIERS_ROUTE, EMPLOYEE_ROUTE, MY_REQUESTS_ROUTE, REQUEST_ROUTE, PROCUREMENT_ROUTE, DASHBOARD_ROUTE } from "./util/routes";
import './styles/app.less'
import AuthenticatedRoute from './presentation/AuthenticatedRoute'
import { connect } from 'react-redux'
const Login = React.lazy(()=> import('./containers/Auth'))
const Home = React.lazy(()=> import('./containers/Home'))
const Department = React.lazy(()=> import('./containers/Department'))
const Supplier = React.lazy(() => import('./containers/Suppliers'))
const Employee = React.lazy(() => import('./containers/Employee'))
const MyRequest = React.lazy(()=> import('./containers/MyRequest'))
const Request = React.lazy(()=> import('./containers/Requests'))
const NotAuthorized = React.lazy(()=> import('./containers/NotAuthorized'))
const Procurement = React.lazy(() => import('./containers/Procurement'))
const Dashboard = React.lazy(() => import('./containers/Dashboard'))
const Store = React.lazy(() => import('./containers/Store'))
const Settings = React.lazy(()=> import('./containers/Settings'))
const Account = React.lazy(() => import('./containers/Account'))
const Report = React.lazy(()=> import('./containers/Report'))
const Audit = React.lazy(() => import('./containers/Audit'))
const QuotationView = React.lazy(() => import('./containers/QuotationView'))
const RequestManagement = React.lazy(() => import("./containers/RequestManagement"))

function App(props) {
  return (
    <>
      <React.Suspense fallback={<Spin />}>
        <Switch>
          <Route path="/app/account" component={Account} {...props} />
          <Route path="/app/store" component={Store} {...props} />
          <AuthenticatedRoute path={`${DASHBOARD_ROUTE}`} component={Dashboard} />
          <Route path={PROCUREMENT_ROUTE} component={Procurement} {...props} />
          <Route path={REQUEST_ROUTE} component={Request} {...props} />
          <AuthenticatedRoute path={MY_REQUESTS_ROUTE} component={MyRequest} />
          <AuthenticatedRoute path={DEPARTMENTS_ROUTE} component={Department} />
          <AuthenticatedRoute path={SUPPLIERS_ROUTE} component={Supplier} />
          <AuthenticatedRoute path={EMPLOYEE_ROUTE}  component={Employee} />
          <AuthenticatedRoute exact path={HOME_ROUTE}  component={Home} />
          <AuthenticatedRoute path="/app/settings" component={Settings} {...props} />
          <AuthenticatedRoute path="/app/reports" component={Report} {...props} />
          <AuthenticatedRoute path="/app/quotations" component={QuotationView} {...props} />
          <AuthenticatedRoute path="/app/request-management" component={RequestManagement} {...props} />
          <Route path="/app/audit" component={Audit} {...props} />
          <Route path={LOGIN_ROUTE} component={Login} />
          <Route path="/not-authorized" component={NotAuthorized} />
          <AuthenticatedRoute path="/" ><Redirect to={HOME_ROUTE}/></AuthenticatedRoute>
        </Switch>
      </React.Suspense>
    </>
  );
}

const mapStateToProps = (store) => ({
  authUser: store.auth.user
})

export default connect(mapStateToProps, null)(App);
