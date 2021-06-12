import React from 'react'
import AppLayout from '../AppLayout'
import List from './components/List'
import { connect } from 'react-redux'
import { Creators } from '../../services/redux/supplier/actions'


const Suppliers = (props) => {
  return (
    <>
      <AppLayout>
        <List {...props} />
      </AppLayout>
    </>
  ) 
}

const mapStateToProps = (store) => ({
  authUser: store.auth.user,
  suppliers: store.supplier.suppliers,
  submitting: store.supplier.submitting,
  loading: store.supplier.loading,
  supplier: store.supplier.supplier,
  submitSuccess: store.supplier.submitSuccess
})

const mapActionsToProps = (dispatch) => {
  return {
    fetchSuppliers: (query) => {
      dispatch(Creators.fetchSuppliers(query))
    },
    createSupplier: (payload) => {
      dispatch(Creators.createSupplier(payload))
    },
    updateSupplier: (supplierId, payload) => {
      dispatch(Creators.updateSupplier(supplierId, payload))
    },
    deleteSupplier: (supplierId) => {
      dispatch(Creators.deleteSupplier(supplierId))
    },
    getSupplier: (supplierId) => {
      dispatch(Creators.getSupplier(supplierId))
    }
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Suppliers);

