import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/local-purchase-order/actions'
import { Creators as NotificationCreators } from '../../redux/notification/actions'

import {
  fetchLocalPurchaseOrders as fetchLocalPurchaseOrdersApi,
  fetchLocalPurchaseOrder as fetchLocalPurchaseOrderApi,
  fetchLocalPurchaseOrderDraft as fetchLocalPurchaseOrderDraftApi,
  createLocalPurchaseOrderDraft as saveLocalPurchaseOrderDraftApi,
  createLocalPurchaseOrder as saveLocalPurchaseOrderApi,
} from '../../api/local-purchase-order'

import openNotification from '../../../util/notification'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'

export function* fetchLocalPurchaseOrders(action) {
  const { query } = action
  try {
    const response = yield call(fetchLocalPurchaseOrdersApi, query)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.fetchLocalPurchaseOrdersSuccess(response?.data))
    } else {
      openNotification('error', 'FETCH LPO', response?.message)
      yield put(Creators.fetchLocalPurchaseOrdersFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 
    (error?.response?.data?.errors[0]) || 'Failed to fetch float requests'
    openNotification('error', 'FETCH LPO', errorText)
    yield put(Creators.fetchLocalPurchaseOrdersFailure(errorText))
  }
}

export function* fetchLocalPurchaseOrder(action) {
  const { id } = action
  try {
    const response = yield call(fetchLocalPurchaseOrderApi, id)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.fetchLocalPurchaseOrderSuccess(response?.data))
    } else {
      openNotification('error', 'Fetch Lpo', response?.message)
      yield put(Creators.fetchLocalPurchaseOrderFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Internal server error'
    openNotification('error', 'Fetch Lpo', errorText)
    yield put(Creators.fetchLocalPurchaseOrderFailure(errorText))
  }
}

export function* fetchLocalPurchaseOrderDrafts(action) {
  console.log('=================>FETCH REQUEST', action)
  const { query } = action
  try {
    const response = yield call(fetchLocalPurchaseOrderDraftApi, query)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.fetchLocalPurchaseOrderDraftsSuccess(response?.data))
    } else {
      openNotification('error', 'FETCH LPO', response?.message)
      yield put(Creators.fetchLocalPurchaseOrderDraftsFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Internal server error'
    openNotification('error', 'FETCH LPO', errorText)
    yield put(Creators.fetchLocalPurchaseOrderDraftsFailure(errorText))
  }
}


export function* createLocalPurchaseOrder(action) {
  const { payload } = action
  try {
    const response = yield call(saveLocalPurchaseOrderApi, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'CREATE LPO', response?.message)
      yield put(Creators.createLocalPurchaseOrderSuccess(response?.data))
      yield put(NotificationCreators.fetchNotifications())
    } else {
      openNotification('error', 'CREATE LPO', response?.message)
      yield put(Creators.createLocalPurchaseOrderFailure(response?.message))
    }
  } catch (error) {
    const errors = error?.response?.data?.errors
    const errorText = errors[0] || 'Failed to create local purchase order'
    openNotification('error', 'CREATE LPO', errorText)
    yield put(Creators.createLocalPurchaseOrderFailure(errorText))
  }
}

export function* createLocalPurchaseOrderDraft(action) {
  const { payload } = action
  try {
    const response = yield call(saveLocalPurchaseOrderDraftApi, payload)
    if(response?.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'DRAFT LPO', response?.message)
      yield put(Creators.createLocalPurchaseOrderDraftSuccess(response?.data))
      yield put(NotificationCreators.fetchNotifications())
    } else {
      openNotification('error', 'DRAFT LPO', response?.message)
      yield put(Creators.createLocalPurchaseOrderDraftFailure(response?.message))
    }
  } catch (error) {
    const errors = error?.response?.data?.errors || []
    const errorText = errors[0] || 'Internal server error'
    openNotification('error', 'DRAFT LPO', errorText)
    yield put(Creators.createLocalPurchaseOrderDraftFailure(errorText))
  }
}


export function* resetLocalPurchaseOrder(action) {
  yield put(Creators.resetFloatequest())
}

//watchers

export function* watchFetchLocalPurchaseOrders(action) {
  yield takeLeading(Types.FETCH_LOCAL_PURCHASE_ORDERS, fetchLocalPurchaseOrders)
}

export function* watchFetchLocalPurchaseOrder(action) {
  yield takeLeading(Types.FETCH_LOCAL_PURCHASE_ORDER, fetchLocalPurchaseOrder)
}


export function* watchCreateLocalPurchaseOrder(action) {
  yield takeLatest(Types.CREATE_LOCAL_PURCHASE_ORDER, createLocalPurchaseOrder)
}

export function* watchCreateLocalPurchaseOrderDraft(action) {
  yield takeLatest(Types.CREATE_LOCAL_PURCHASE_ORDER_DRAFT, createLocalPurchaseOrderDraft)
}

export function* watchFetchLocalPurchaseOrderDrafts(action) {
  yield takeLatest(Types.FETCH_LOCAL_PURCHASE_ORDER_DRAFTS, fetchLocalPurchaseOrderDrafts)
}