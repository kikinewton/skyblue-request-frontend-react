import React from 'react'
import { Creators as SupplierCreators } from '../../services/redux/supplier/actions'
import { Creators as QuotationCreators } from '../../services/redux/quotation/actions'
import { Creators as RequestCreators } from '../../services/redux/request/actions'
import {  Creators as RequestCategoryCreator } from '../../services/redux/request-category/actions'
import { connect } from 'react-redux'
import { Switch, useRouteMatch } from 'react-router-dom'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import AppLayout from '../AppLayout'
import CreateLocalPurchaseOrder from './components/CreateLocalPurchase'
import RequestCategory from './components/RequestCategory'
import LocalPurchaseOrders from './components/LocalPurchaseOrders'
import AssignSuppliersToRequests from './components/AssignSuppliersToRequests'
import CreateQuotation from './components/CreateQuotation'
import RfqList from './components/RfqList'

const Procurement = (props) => {
  const { path } = useRouteMatch()

  return (
    <React.Fragment>
      <AppLayout title="Procurement">
        <Switch>
          <AuthenticatedRoute path={`${path}/rfqs`} component={RfqList} {...props} />
          <AuthenticatedRoute path={`${path}/request-categories`} component={RequestCategory} {...props} />
          <AuthenticatedRoute path={`${path}/add-local-purchase-order`} component={CreateLocalPurchaseOrder} {...props} />
          <AuthenticatedRoute path={`${path}/local-purchase-orders`} component={LocalPurchaseOrders}  {...props} />
          <AuthenticatedRoute path={`${path}/create-quotation`} component={CreateQuotation} {...props} />
          <AuthenticatedRoute path={`${path}/assign-suppliers`} component={AssignSuppliersToRequests} {...props} />
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
  selected_requests: store.request.selected_requests,
  updating_request: store.request.updating,
  request_update_success: store.request.update_success,

  quotations: store.quotation.quotations,
  quotationLoading: store.quotation.loading,
  quotationSubmitSuccess: store.quotation.submitSuccess,
  quotationSubmitting: store.quotation.submitting,

  suppliers: store.supplier.suppliers,
  fetching_suppliers: store.supplier.loading,
  supplier_submit_success: store.supplier.submit_success,
  submitting_supplier: store.supplier.submitting,
  supplier: store.supplier.supplier,

  request_categories: store.requestCategory.request_categories,
  request_category_loading: store.requestCategory.loading,
  request_category_submit_success: store.requestCategory.submit_success,
  request_category_submitting: store.requestCategory.submitting,
  request_category: store.requestCategory.request_category
})

const mapActionsToState = (dispatch) => {
  return {
  fetchSuppliers: (query) => {
    dispatch(SupplierCreators.fetchSuppliers(query))
  },
  resetSupplier: () => {
    dispatch(SupplierCreators.resetSuppliers())
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
  resetQuotation: (quotationId, payload) => {
    dispatch(QuotationCreators.resetQuotation())
  },
  resetRequest: () => {
    dispatch(RequestCreators.resetRequest())
  },
  setSelectedRequests: (requests) => {
    dispatch(RequestCreators.setSelectedRequests(requests))
  },
  fetchRequestCategories: (query) => {
    dispatch(RequestCategoryCreator.fetchRequestCategories(query))
  },
  createRequestCategory: (payload) => {
    dispatch(RequestCategoryCreator.createRequestCategory(payload))
  },
  deleteRequestCategory: (id) => {
    dispatch(RequestCategoryCreator.deleteRequestCategory(id))
  },
  updateRequestCategory: (id, payload) => {
    dispatch(RequestCategoryCreator.updateRequestCategory(id, payload))
  },
  resetRequestCategory: () => {
    dispatch(RequestCategoryCreator.resetRequestCategory())
  },
  setRequestCategory: (requestCategory) => {
    dispatch(RequestCategoryCreator.setRequestCategory(requestCategory))
  },
  createQuotation: (payload) => {
    dispatch(QuotationCreators.createQuotation(payload))
  }
}}

export default connect(mapStateToProps, mapActionsToState)(Procurement)