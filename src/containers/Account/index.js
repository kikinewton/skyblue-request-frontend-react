import React from 'react'
import { connect } from 'react-redux'
import { Switch, useRouteMatch } from 'react-router'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import AppLayout from '../AppLayout'
import GrnList from './components/GrnList'
import NewPayment from './components/NewPayment'
import PaymentList from './components/PaymentList'
import PaymentSuccess from './components/PaymentSuccess'


const Account = (props) => {
  const { path } = useRouteMatch()
  return (
    <React.Fragment>
      <AppLayout>
        <Switch>
          <AuthenticatedRoute path={`${path}/payment-success`} component={PaymentSuccess} {...props} />
          <AuthenticatedRoute path={`${path}/goods-receive-notes/:grnId/add-new-payment`} component={NewPayment} {...props} />
          <AuthenticatedRoute path={`${path}/goods-receive-notes`} component={GrnList} {...props} />
          <AuthenticatedRoute path={`${path}`} component={PaymentList} {...props} />
        </Switch>
      </AppLayout>
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.auth.user
})

export default connect(mapStateToProps, null)(Account)