import React from 'react'
import { Creators as SupplierCreators } from '../../services/redux/supplier/actions'
import { Creators as QuotationCreators } from '../../services/redux/quotation/actions'
import { Creators as RequestCreators } from '../../services/redux/request/actions'
import {  Creators as RequestCategoryCreator } from '../../services/redux/request-category/actions'
import { connect } from 'react-redux'
import { Switch, useRouteMatch } from 'react-router-dom'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import AppLayout from '../AppLayout'
import AddDocument from './components/AddDocument'
import CreateLocalPurchaseOrder from './components/CreateLocalPurchase'
import RequestCategory from './components/RequestCategory'
import AssignSupplier from './components/AssignSupplier'
import LocalPurchaseOrders from './components/LocalPurchaseOrders'
import Suppliers from './components/Suppliers'

const Procurement = (props) => {
  const { path } = useRouteMatch()

  return (
    <React.Fragment>
      <AppLayout>
        <Switch>
          <AuthenticatedRoute path={`${path}/suppliers`}  component={Suppliers} {...props}/>
          <AuthenticatedRoute path={`${path}/request-categories`} component={RequestCategory} {...props} />
          <AuthenticatedRoute path={`${path}/add-local-purchase-order`} component={CreateLocalPurchaseOrder} {...props} />
          <AuthenticatedRoute path={`${path}/local-purchase-orders`} component={LocalPurchaseOrders}  {...props} />
          <AuthenticatedRoute path={`${path}/attach-document`} component={AddDocument} {...props} />
          <AuthenticatedRoute path={`${path}/assign-suppliers`} component={AssignSupplier} {...props} />
        </Switch>
      </AppLayout>
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.auth.user,
  requests: store.request.requests,
  requestLoading: store.request.loading,
  requestSubmitting: store.request.submitting,
  requestSubmitSuccess: store.request.submitSuccess,
  quotations: store.quotation.quotations,
  quotationLoading: store.quotation.loading,
  quotationSubmitSuccess: store.quotation.submitSuccess,
  quotationSubmitting: store.quotation.submitting,
  suppliers: store.supplier.suppliers,
  supplierLoading: store.supplier.loading,
  supplierSubmitSuccess: store.supplier.submitSuccess,
  requestCategories: store.requestCategory.requestCategories,
  requestCategoryLoading: store.requestCategory.loading,
  requestCategorySubmitSuccess: store.requestCategory.submitSuccess,
  requestCategorySubmitting: store.requestCategory.submitting
})

const mapActionsToState = (dispatch) => {
  return {
  fetchSuppliers: (query) => {
    dispatch(SupplierCreators.fetchSuppliers(query))
  },
  resetSupplier: () => {
    dispatch(SupplierCreators.resetSupplier())
  },
  createSupplier: (payload) => {
    dispatch(SupplierCreators.createSupplier(payload))
  },
  updateSupplier: (supplierId, payload) => {
    dispatch(SupplierCreators.updateSupplier(supplierId, payload))
  },
  deleteSupplier: (supplierId) => {
    dispatch(SupplierCreators.deleteSupplier(supplierId))
  },
  getSupplier: (supplierId) => {
    dispatch(SupplierCreators.getSupplier(supplierId))
  },
  fetchRequests: (query) => {
    dispatch(RequestCreators.fetchRequests(query))
  },
  updateRequest: (payload) => {
    dispatch(RequestCreators.updateRequest(payload))
  },
  fetchQuotations: (query) => {
    dispatch(QuotationCreators.fetchQuotations(query))
  },
  updateQuotation: (quotationId, payload) => {
    dispatch(QuotationCreators.updateQuotation(quotationId, payload))
  },
  resetRequest: () => {
    dispatch(RequestCreators.resetRequest())
  },
  fetchRequestCategories: (query) => {
    dispatch(RequestCategoryCreator.fetchRequestCategories(query))
  },
  createRequestCategory: (payload) => {
    dispatch(RequestCategoryCreator.createRequestCategory(payload))
  },
  createQuotation: (payload) => {
    dispatch(QuotationCreators.createQuotation(payload))
  }
}}

export default connect(mapStateToProps, mapActionsToState)(Procurement)