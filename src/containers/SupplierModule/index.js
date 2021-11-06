import React, { useState } from 'react'
import AppLayout from '../AppLayout'
import { Creators as SupplierCreators } from "../../services/redux/supplier/actions"
import { connect } from 'react-redux'
import List from "./components/List"
import { Menu,Row, Col, } from "antd"
import { NavLink } from 'react-router-dom'

const SupplierModule = (props) => {
  const [key, setKey] = useState("ho")
  return (
    <>
      <AppLayout
        title="Supplier Management"
      >
        <List {...props} />
      </AppLayout>
    </>
  )
}

const mapStateToProps = store => ({
  suppliers: store.supplier.suppliers,
  filtered_suppliers: store.supplier.filtered_suppliers,
  fetching_suppliers: store.supplier.loading,
  supplier_submit_success: store.supplier.submit_success,
  submitting_supplier: store.supplier.submitting,
})

const mapActionsToState = dispatch => ({
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
  filterSuppliers: (search) => {
    dispatch(SupplierCreators.filterSuppliers(search))
  }
})

export default connect(mapStateToProps, mapActionsToState)(SupplierModule)