import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Switch, useRouteMatch, Redirect } from 'react-router-dom'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import AppLayout from '../AppLayout'
import LocalPurchaseOrders from './components/LocalPurchaseOrders'
import ReceiveItems from './components/ReceiveItems'
import Success from '../GoodsReceiveSuccessPage'
import { Creators as LpoCreators } from "../../services/redux/local-purchase-order/actions"
import { Creators as GrnCreators } from "../../services/redux/grn/actions"
import {Menu} from "antd"


const Store = (props) => {
  const [key, setKey] = useState("/app/store/lpo")
  const {
    currentUser
  } = props
  const { path } = useRouteMatch()
  return (
    <React.Fragment>
      <Switch>
        <AuthenticatedRoute exact path={`${path}`}>
          <Redirect to="/app/store/lpos" />
        </AuthenticatedRoute>
        <AuthenticatedRoute path={`${path}/grn-success`} {...props} component={Success} />
        <AuthenticatedRoute path={`${path}/lpos/:lpoId/create-goods-receive-note`} component={ReceiveItems} {...props} />
        <AuthenticatedRoute path={`${path}/lpos`} component={LocalPurchaseOrders} />
      </Switch>
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.auth.user
})

const mapActionsToProps = dispatch => ({

})


export default connect(mapStateToProps, null)(Store)