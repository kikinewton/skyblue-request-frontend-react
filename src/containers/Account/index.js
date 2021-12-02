import React from 'react'
import { connect } from 'react-redux'
import { Switch, useRouteMatch } from 'react-router'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import AppLayout from '../AppLayout'
import GrnList from './components/GrnList'
import NewPayment from './components/NewPayment'
import PaymentList from './components/PaymentList'
import PaymentSuccess from './components/PaymentSuccess'
import { Creators as SupplierCreator } from '../../services/redux/supplier/actions'


const Account = (props) => {
  const { path } = useRouteMatch()
  return (
    <React.Fragment>
      <AppLayout
        title="Accounts"
      >
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
  currentUser: store.auth.user,
  suppliers: store.supplier.suppliers,
  suppliersLoading: store.supplier.loading
})

const mapActionToProps = (dispatch) => {
  return {
    fetchSuppliers: (query) => {
      dispatch(SupplierCreator.fetchSuppliers(query))
    }
  }
}

export default connect(mapStateToProps, mapActionToProps)(Account)