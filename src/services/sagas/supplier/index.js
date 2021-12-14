import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/supplier/actions'

import {
  getSuppliers,
  deleteSupplier as deleteSupplierApi,
  updateSupplier as updateSupplierApi,
  saveSupplier
} from '../../api/supplier'
import openNotification from '../../../util/notification'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'


export function* fetchSuppliers(action) {
  const { query } = action
  try {
    const response = yield call(getSuppliers, query)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response?.data || []
      yield put(Creators.fetchSuppliersSuccess(responseData))
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.fetchSuppliersFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Suppliers'
    openNotification('error', 'Login', message)
    yield put(Creators.fetchSuppliersFailure(message))
  }
}

export function* createSupplier(action) {
  try {
    const response = yield call(saveSupplier, action.payload)
    if(response.status === 'SUCCESS') {
      const responseData = response.data
      openNotification('success', 'CREATE SUPPLIER', response.message)
      yield put(Creators.createSupplierSuccess(responseData))
      yield put(Creators.fetchSuppliers({}))
    } else {
      openNotification('error', 'CREATE SUPPLIER', response.message)
      yield put(Creators.createSupplierFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to create Suppliers'
    openNotification('error', 'CREATE SUPPLIER', message)
    yield put(Creators.createSupplierFailure(message))
  }
}

export function* updateSupplier(action) {
  console.log('action', action)
  try {
    const response = yield call(updateSupplierApi, action.supplierId, action.payload)
    if(response.status === 'SUCCESS') {
      openNotification('success', 'update supplier', response.message)
      yield put(Creators.updateSupplierSuccess({id: action.supplierId, ...action.payload}))
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.updateSupplierFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Suppliers'
    openNotification('error', 'Login', message)
    yield put(Creators.updateSupplierFailure(message))
  }
}

export function* deleteSupplier(action) {
  const  {supplierId} = action
  console.log('---------->saga supplier id', supplierId)
  try {
    const response = yield call(deleteSupplierApi, supplierId)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.deleteSupplierSuccess(supplierId))
      openNotification('success', 'Delete Supplier', response.message)
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.deleteSupplierFailure(response.message))
    }
  } catch (error) {
    const errors = error?.response?.data?.errors
    openNotification('error', 'Login', errors[0])
    yield put(Creators.updateSupplierFailure(errors[0]))
  }
}


export function* watchFetchSuppliers(action) {
  yield takeLatest(Types.FETCH_SUPPLIERS, fetchSuppliers)
}

export function* watchCreateSupplier(action) {
  yield takeLeading(Types.CREATE_SUPPLIER, createSupplier)
}

export function* watchUpdateSupplier(action) {
  yield takeLatest(Types.UPDATE_SUPPLIER, updateSupplier)
}

export function* watchDeleteSupplier(action) {
  yield takeLatest(Types.DELETE_SUPPLIER, deleteSupplier)
}