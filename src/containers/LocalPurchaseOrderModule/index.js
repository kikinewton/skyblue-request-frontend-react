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
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import CreateLPODraft from './components/CreateLPODraft'
import CreateLPO from './components/CreateLPO'
import AllLocalPurchaseOrders from './components/AllLocalPurchaseOrders'
import NotificationBadge from '../../shared/NotificationBadge'
import { userHasAnyRole } from '../../services/api/auth'
import { EMPLOYEE_ROLE } from '../../util/datas'


const LocalPurchaseOrderModule = (props) => {
  const [key, setKey] = useState()
  const location = useLocation()
  const { notifications } = props

  const handleNavClick = (value) => {
    setKey(value)
  }

  useEffect(() => {
    const { pathname } = location
    if(pathname.includes("/app/local-purchase-orders/add-new-draft")) {
      setKey("/app/local-purchase-orders/add-new-draft")
    } else if(pathname.includes("/app/local-purchase-orders/add-new")) {
      setKey("/app/local-purchase-orders/add-new")
    } else if(pathname.includes("/app/local-purchase-orders/all")) {
      setKey("/app/local-purchase-orders/all")
    } else if(pathname.includes("/app/local-purchase-orders")) {
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
          >
            <Menu.Item key="/app/local-purchase-orders">
              <NavLink to="/app/local-purchase-orders">
                <span>LPOs For Suppliers</span>
              </NavLink>
            </Menu.Item>
            {userHasAnyRole(props.currentUser.role, [EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER]) && (
              <Menu.Item key="/app/local-purchase-orders/add-new-draft">
                <NavLink to="/app/local-purchase-orders/add-new-draft">
                  <span>Draft LPO</span>
                </NavLink>
              </Menu.Item>
            )}
            {userHasAnyRole(props.currentUser.role, [EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER]) && (
            <Menu.Item key="/app/local-purchase-orders/add-new">
              <NavLink to="/app/local-purchase-orders/add-new">
                {notifications?.lpoDraftAwaitingApproval ? (
                  <NotificationBadge count={notifications?.lpoDraftAwaitingApproval}>
                    <span>Create LPO</span>
                  </NotificationBadge>
                ) : (<span>Create LPO</span>)}
              </NavLink>
            </Menu.Item>
            )}
            <Menu.Item key="/app/local-purchase-orders/all">
              <NavLink to="/app/local-purchase-orders/all">
                <span>All LPOs</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        )}
      >
        <Switch>
          <AuthenticatedRoute {...props} path="/app/local-purchase-orders/all" component={AllLocalPurchaseOrders} />
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
  local_purchase_orders_meta: store.local_purchase_order.meta,

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
  currentUser: store.auth.user,

  notifications: store?.notification?.notifications || {}
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
