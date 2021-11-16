import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/local-purchase-order/actions'

import {
  fetchLocalPurchaseOrders as fetchLocalPurchaseOrdersApi,
  createLocalPurchaseOrder as saveLocalPurchaseOrderApi,
} from '../../api/local-purchase-order'

import openNotification from '../../../util/notification'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'


export function* fetchLocalPurchaseOrders(action) {
  console.log('=================>FETCH REQUEST', action)
  const { query } = action
  try {
    const response = yield call(fetchLocalPurchaseOrdersApi, query)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.fetchLocalPurchaseOrdersSuccess(response?.data))
    } else {
      openNotification('error', 'Fetch Request', response?.message)
      yield put(Creators.fetchLocalPurchaseOrdersFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed to fetch float requests'
    openNotification('error', 'Fetch Request', errorText)
    yield put(Creators.fetchLocalPurchaseOrdersFailure(errorText))
  }
}


export function* createLocalPurchaseOrder(action) {
  const { payload } = action
  try {
    const response = yield call(saveLocalPurchaseOrderApi, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'Create Local Purchase Order', response?.message)
      yield put(Creators.createLocalPurchaseOrderSuccess(response?.data))
    } else {
      openNotification('error', 'Create Local Purchase Order', response?.message)
      yield put(Creators.createLocalPurchaseOrderFailure(response?.message))
    }
  } catch (error) {
    const errors = error?.response?.data?.errors
    const errorText = errors[0] || 'Failed to create local purchase order'
    openNotification('error', 'Create Local Purchase Order', errorText)
    yield put(Creators.createLocalPurchaseOrderFailure(errorText))
  }
}


export function* resetLocalPurchaseOrder(action) {
  yield put(Creators.resetFloatequest())
}

//watchers

export function* watchFetchLocalPurchaseOrders(action) {
  yield takeLeading(Types.FETCH_LOCAL_PURCHASE_ORDERS, fetchLocalPurchaseOrders)
}


export function* watchCreateLocalPurchaseOrder(action) {
  yield takeLatest(Types.CREATE_LOCAL_PURCHASE_ORDER, createLocalPurchaseOrder)
}
