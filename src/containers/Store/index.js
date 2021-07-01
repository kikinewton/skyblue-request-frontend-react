import React from 'react'
import { connect } from 'react-redux'
import { Switch, useRouteMatch } from 'react-router-dom'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import AppLayout from '../AppLayout'
import LocalPurchaseOrders from './components/LocalPurchaseOrders'
import ReceiveItems from './components/ReceiveItems'
import Success from '../GoodsReceiveSuccessPage'


const Store = (props) => {
  const { path } = useRouteMatch()
  return (
    <React.Fragment>
      <AppLayout>
        <Switch>
          {/* <AuthenticatedRoute path={`${path}/receive-items`} component={ReceiveItems} {...props} /> */}
          <AuthenticatedRoute path={`${path}/grn-success`} {...props} component={Success} />
          <AuthenticatedRoute path={`${path}/lpos/:lpoId/create-goods-receive-note`} component={ReceiveItems} {...props} />
          {/* <AuthenticatedRoute path={`${path}/local-purchase-orders`} component={LocalPurchaseOrders} /> */}
          <AuthenticatedRoute path={`${path}/lpos`} component={LocalPurchaseOrders} />
        </Switch>
      </AppLayout>
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.auth.user
})


export default connect(mapStateToProps, null)(Store)