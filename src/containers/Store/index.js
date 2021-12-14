import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Switch, useRouteMatch, Redirect, NavLink, useLocation } from 'react-router-dom'
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
  
  const { path } = useRouteMatch()
  const location = useLocation()

  React.useEffect(() => {
    const { pathname } = location
    if(pathname.includes("/app/store/lpos")) {
      setKey("/app/store/lpos")
    } else if(pathname.includes("/app/store/grns")) {
      setKey("/app/store/grns")
    }
    // eslint-disable-next-line
  }, [key])
  return (
    <React.Fragment>
      <AppLayout
        title="STORE MANAGEMENT"
        subNav={(
          <Menu
            selectedKeys={[key]}
            mode="horizontal"
            onClick={value => setKey(value)}
            forceSubMenuRender
          >
            <Menu.Item key="/app/store/lpos">
              <NavLink to="/app/store/lpos">
                Local Purchase Orders
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/app/store/grns">
              <NavLink to="/app/store/grns">
                Goods Receive Notes
              </NavLink>
            </Menu.Item>
          </Menu>
        )}
      >
        <Switch>
          <AuthenticatedRoute exact path={`${path}`}>
            <Redirect to="/app/store/lpos" />
          </AuthenticatedRoute>
          <AuthenticatedRoute path={`${path}/grn-success`} {...props} component={Success} />
          <AuthenticatedRoute path={`${path}/lpos/:lpoId/create-goods-receive-note`} component={ReceiveItems} {...props} />
          <AuthenticatedRoute path={`${path}/lpos`} component={LocalPurchaseOrders} {...props} />
        </Switch>
      </AppLayout>
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.auth.user,

  fetching_grn: store.grn.loading,
  submitting_grn: store.grn.submitting,
  submit_grn_success: store.grn.submit_success,
  grns: store.grn.grns,
  grn: store.grn.grn,

  local_purchase_orders: store.local_purchase_order.local_purchase_orders,
  local_purchase_order: store.local_purchase_order.local_purchase_order,
  fetching_local_purchase_orders: store.local_purchase_order.loading,

})

const mapActionsToProps = dispatch => ({
  fetchGrns: (query) => dispatch(GrnCreators.fetchGrns(query)),
  fetchGrn: (id) => dispatch(GrnCreators.fetchGrn(id)),
  createGrn: (payload) => dispatch(GrnCreators.createGrn(payload)),
  updateGrn: (payload) => dispatch(GrnCreators.updateGrn(payload)),
  resetGrn: () => dispatch(GrnCreators.resetGrn()),

  fetchLocalPurchaseOrders: (query) => dispatch(LpoCreators.fetchLocalPurchaseOrders(query)),
  fetchLocalPurchaseOrder: (id) => dispatch(LpoCreators.fetchLocalPurchaseOrder(id)),
  resetLocalPurchaseOrder: () => dispatch(LpoCreators.resetLocalPurchaseOrder()),
})


export default connect(mapStateToProps, mapActionsToProps)(Store)