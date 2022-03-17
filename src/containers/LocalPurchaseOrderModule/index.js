import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import AppLayout from '../AppLayout'
import { Creators as LocalPurchaseOrderCreators } from "../../services/redux/local-purchase-order/actions"
import { Creators as RequestCategoryCreators } from "../../services/redux/request-category/actions"
import { Creators as SupplierCreators } from "../../services/redux/supplier/actions"
import { Creators as QuotationCreators } from "../../services/redux/quotation/actions"
import { Switch, useLocation } from 'react-router'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import List from "./components/List"
import { Badge, Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import CreateLPODraft from './components/CreateLPODraft'
import CreateLPO from './components/CreateLPO'
import MyBadge from '../../presentation/MyBadge'


const LocalPurchaseOrderModule = (props) => {
  const [key, setKey] = useState()
  const location = useLocation()

  const handleNavClick = (value) => {
    setKey(value)
  }

  useEffect(() => {
    const { pathname } = location
    if(pathname.includes("/app/local-purchase-orders/add-new-draft")) {
      setKey("/app/local-purchase-orders/add-new-draft")
    } else if(pathname.includes("/app/local-purchase-orders/add-new")) {
      setKey("/app/local-purchase-orders/add-new")
    }else if(pathname.includes("/app/local-purchase-orders")) {
      setKey("/app/local-purchase-orders")
    } 
  }, [key])

  return (
    <>
      <AppLayout
        title="Local purchase orders"
        subNav={(
          <Menu
            selectedKeys={[key]}
            mode="horizontal"
            onClick={handleNavClick}
            forceSubMenuRender
            mode="horizontal"
          >
            <Menu.Item key="/app/local-purchase-orders">
              <NavLink to="/app/local-purchase-orders">
                <span>Local Purchase Orders</span> 
                {/* <span><MyBadge count={5} /></span> */}
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/app/local-purchase-orders/add-new-draft">
              <NavLink to="/app/local-purchase-orders/add-new-draft">
                <span>Draft Local Purchase Order</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/app/local-purchase-orders/add-new">
              <NavLink to="/app/local-purchase-orders/add-new">
                <span>Create Local Purchase Order</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        )}
      >
        <Switch>
          <AuthenticatedRoute {...props} path="/app/local-purchase-orders/add-new-draft" component={CreateLPODraft} />
          <AuthenticatedRoute {...props} path="/app/local-purchase-orders/add-new" component={CreateLPO} />
          <AuthenticatedRoute {...props} path="/app/local-purchase-orders" component={List} />
        </Switch>
      </AppLayout>
    </>
  )
}

const mapStateToProps = store => ({
  local_purchase_orders: store.local_purchase_order.local_purchase_orders,
  local_purchase_order_drafts: store.local_purchase_order.local_purchase_order_drafts,
  fetching_local_purchase_orders: store.local_purchase_order.loading,
  submit_local_purchase_order_success: store.local_purchase_order.submit_success,
  submitting_local_purchase_order: store.local_purchase_order.submitting,

  suppliers: store.supplier.suppliers,
  fetching_suppliers: store.supplier.loading,

  quotations: store.quotation.quotations,
  fetching_quotations: store.quotation.loading,
  filtered_quotations: store.quotation.filtered_quotations,

  request_categories: store.requestCategory.request_categories,
  fetching_request_categories: store.requestCategory.loading,
  
  local_purchase_orders: store.local_purchase_order.local_purchase_orders,
  submitting_local_purchase_order: store.local_purchase_order.submitting,
  submit_local_purchase_order_success: store.local_purchase_order.submit_success,
})

const mapActionsToState = dispatch => ({
  fetchLocalPurchaseOrders: (query) => dispatch(LocalPurchaseOrderCreators.fetchLocalPurchaseOrders(query)),
  createLocalPurchaseOrder: (payload) => dispatch(LocalPurchaseOrderCreators.createLocalPurchaseOrder(payload)),
  createLocalPurchaseOrderDraft: (payload) => dispatch(LocalPurchaseOrderCreators.createLocalPurchaseOrderDraft(payload)),
  resetLocalPurchaseOrder: () => dispatch(LocalPurchaseOrderCreators.resetLocalPurchaseOrder()),
  fetchLocalPurchaseOrderDrafts: (query) => dispatch(LocalPurchaseOrderCreators.fetchLocalPurchaseOrderDrafts(query)),

  fetchRequestCategories: (query) => dispatch(RequestCategoryCreators.fetchRequestCategories(query)),
  resetRequestCategory: () => dispatch(RequestCategoryCreators.resetRequestCategory()),

  fetchSuppliers: (query) => dispatch(SupplierCreators.fetchSuppliers(query)),
  resetSuppliers: () => dispatch(SupplierCreators.resetSuppliers()),

  fetchQuotations: (query) => dispatch(QuotationCreators.fetchQuotations(query)),
  resetQuotation: () => dispatch(QuotationCreators.resetQuotation()),
  filterQuotations: (filter) => dispatch(QuotationCreators.filterQuotations(filter)),
})

export default connect(mapStateToProps, mapActionsToState)(LocalPurchaseOrderModule)
