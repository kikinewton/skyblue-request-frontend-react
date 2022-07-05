import React, { useState } from 'react'
import { Creators as SupplierCreators } from '../../services/redux/supplier/actions'
import { Creators as QuotationCreators } from '../../services/redux/quotation/actions'
import { Creators as RequestCreators } from '../../services/redux/request/actions'
import {  Creators as RequestCategoryCreator } from '../../services/redux/request-category/actions'
import { connect } from 'react-redux'
import { Switch, useRouteMatch, NavLink, useLocation } from 'react-router-dom'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import AppLayout from '../AppLayout'
import ListQuotations from './components/List'
import CreateQuotation from './components/Add'
import { Menu } from "antd"
import { FileDoneOutlined, SolutionOutlined } from '@ant-design/icons'
import ListAllQuotations from './components/AllQuotations'
import AddQuotationFOrUnregisteredSupplier from './components/AddQuotationForUnregisteredSupplier'
import { Creators as CommentCreators } from '../../services/redux/comment/actions'

const Quotation = (props) => {
  const { path } = useRouteMatch()
  const [key, setKey] = useState("list")
  const location = useLocation()

  React.useEffect(() => {
    console.log('my path name', location.pathname)
    const { pathname } = location
    switch(pathname) {
      case "/app/quotations":
        setKey("list")
        break
      case "/app/quotations/add-new":
        setKey("add")
        break
      case "/app/quotations/all":
        setKey("list-all")
        break
      case "/app/quotations/add-new-to-unregistered":
        setKey("add-new-to-unregistered")
        break
      default:
        setKey("list")
        break
    }
    // eslint-disable-next-line
  }, [key])

  return (
    <React.Fragment>
      <AppLayout 
        title="Quotations"
        subNav={(
          <Menu
            selectedKeys={[key]}
            defaultSelectedKeys={[key]}
            onClick={(value) => setKey(value)}
            mode="horizontal"
          >
            <Menu.Item key="add">
              <NavLink to="/app/quotations/add-new">
                <FileDoneOutlined />
                <span>Create Quotation</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="list">
              <NavLink to="/app/quotations">
                <SolutionOutlined />
                <span>Supplier Quotes</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="list-all">
              <NavLink to="/app/quotations/all">
                <SolutionOutlined />
                <span>All Quotations</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="add-new-to-unregistered">
              <NavLink to="/app/quotations/add-new-to-unregistered">
                <SolutionOutlined />
                <span>Create Quotation for Unregistered Supplier</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        )}
      >
        <Switch>
          <AuthenticatedRoute path={`${path}/add-new-to-unregistered`} component={AddQuotationFOrUnregisteredSupplier} {...props} />
          <AuthenticatedRoute path={`${path}/add-new`} component={CreateQuotation} {...props} />
          <AuthenticatedRoute path={`${path}/all`} component={ListAllQuotations} {...props} />
          <AuthenticatedRoute path={`${path}`} component={ListQuotations} {...props} />
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
  filtered_quotations: store.quotation.filtered_quotations,
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
  request_category: store.requestCategory.request_category,

  comments: store.comment.comments,
  comments_loading: store.comment.loading,
  submitting_comment: store.comment.submitting,
  submit_comment_success: store.comment.submit_success,
  new_comment: store.comment.new_comment,
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
  generateQuotation: (payload) => {
    console.log('in idndex generate quot', payload)
    dispatch(QuotationCreators.generateQuotation(payload))
  },
  filterQuotations: (filter) => {
    dispatch(QuotationCreators.filterQuotations(filter))
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
  },

  createComment: (commentType, itemId, payload) => {
    dispatch(CommentCreators.createComment(commentType, itemId, payload))
  },
  createCommentWithCancel: (procurementType, payload) => dispatch(CommentCreators.createCommentWithCancel(procurementType, payload)),
  fetchComments: (itemId, commentType) => {
    dispatch(CommentCreators.fetchComments(itemId, commentType))
  },
  setNewComment: (newComment) => {
    dispatch(CommentCreators.setNewComment(newComment))
  },
  resetComment: () => {
    dispatch(CommentCreators.resetComment())
  },
}}

export default connect(mapStateToProps, mapActionsToState)(Quotation)