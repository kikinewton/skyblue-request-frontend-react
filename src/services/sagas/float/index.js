import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/float/actions'

import {
  fetchMyFloatRequests as fetchMyFloatRequestsApi,
  saveFloatRequest as saveFloatRequestApi,
  fetchFloatRequests as fetchFloatRequestsApi,
  updateFloatRequest as updateFloatRequestApi,
  updateSingleFloatRequest as updateSingleFloatRequestApi,
  allocateFundsToFloat as allocateFundsToFloatApi,
  fetchFloatOrders as fetchFloatOrdersApi,
  fetchFloatOrder as fetchFloatOrderApi,
  updateStatus as updateFloatOrderStatusApi,
  retireFloatOrder as retireFloatOrderApi,
  addItems as addItemsToFloatOrderApi,
  closeloatOrder as closeFloatOrderApi
} from '../../api/float'
import openNotification from '../../../util/notification'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'

export function* fetchAllFloatRequests(action) {
  const { query } = action
  try {
    const response = yield call(fetchFloatRequestsApi, query)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.fetchFloatRequestsSuccess(response?.data))
    } else {
      openNotification('error', 'Fetch Request', response?.message)
      yield put(Creators.fetchAFloatRequestsFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error?.response?.data?.errors || []) [0] || error?.response?.data?.message
    openNotification('error', 'Fetch Request', errorText)
    yield put(Creators.fetchFloatRequestsFailure(errorText))
  }
}


export function* fetchFloatOrders(action) {
  const { query } = action
  try {
    const response = yield call(fetchFloatOrdersApi, query)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.fetchFloatOrdersSuccess(response?.data))
    } else {
      openNotification('error', 'Fetch Request', response?.message)
      yield put(Creators.fetchAFloatOrdersFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error?.response?.data?.errors || []) [0] || error?.response?.data?.message
    openNotification('error', 'Fetch Request', errorText)
    yield put(Creators.fetchFloatOrdersFailure(errorText))
  }
}

export function* fetchFloatOrder(action) {
  const { id } = action
  try {
    const response = yield call(fetchFloatOrderApi, id)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.fetchFloatOrderSuccess(response?.data))
    } else {
      openNotification('error', 'Fetch Request', response?.message)
      yield put(Creators.fetchAFloatOrderFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed to fetch float requests'
    openNotification('error', 'Fetch Request', errorText)
    yield put(Creators.fetchFloatOrderFailure(errorText))
  }
}

export function* fetchMyFloatRequests(action) {
  const { query } = action
  try {
    const response = yield call(fetchMyFloatRequestsApi, query)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.fetchMyFloatRequestsSuccess(response?.data))
    } else {
      openNotification('error', 'Fetch Request', response?.message)
      yield put(Creators.fetchMyFloatRequestsFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error?.response?.data?.errors || []) [0] || error?.response?.data?.message
    openNotification('error', 'Fetch Request', errorText)
    yield put(Creators.fetchMyFloatRequestsFailure(errorText))
  }
}

export function* createFloatRequest(action) {
  const { payload } = action
  try {
    const response = yield call(saveFloatRequestApi, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'Create Float', response?.message)
      yield put(Creators.createFloatRequestSuccess(response?.data))
    } else {
      openNotification('error', 'Create Float', response?.message)
      yield put(Creators.createFloatRequestFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error?.response?.data?.errors || []) [0] || error?.response?.data?.message
    console.log('errors', errorText)
    openNotification('error', 'Create Float', errorText)
    yield put(Creators.createFloatRequestFailure(errorText))
  }
}

export function* updateFloatOrderStatus(action) {
  const { id, status } = action
  try {
    const response = yield call(updateFloatOrderStatusApi, id, status)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'Update Float', response?.message)
      yield put(Creators.updateFloatOrderStatusSuccess(response?.data))
    } else {
      openNotification('error', 'Update Float Status', response?.message)
      yield put(Creators.updateFloatOrderStatusFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error?.response?.data?.errors || []) [0] || error?.response?.data?.message
    openNotification('error', 'Update Float Status',errorText)
    yield put(Creators.updateFloatOrderStatusFailure(errorText))
  }
}

export function* updateFloatRequest(action) {
  const { payload } = action
  console.log('saga payload', payload)
  try {
    const response = yield call(updateFloatRequestApi, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'Update Float', response?.message)
      yield put(Creators.updateFloatRequestSuccess(response?.data))
    } else {
      openNotification('error', 'Update Float', response?.message)
      yield put(Creators.updateFloatRequestFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error?.response?.data?.errors || []) [0] || error?.response?.data?.message
    openNotification('error', 'Update Float',errorText)
    yield put(Creators.updateFloatRequestFailure(errorText))
  }
}

export function* updateSingleFloatRequest(action) {
  const { payload, id } = action
  console.log('saga payload', action)
  try {
    const response = yield call(updateSingleFloatRequestApi, id, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'Update Float', response?.message)
      yield put(Creators.updateSingleFloatRequestSuccess(response?.data))
    } else {
      openNotification('error', 'Update Float', response?.message)
      yield put(Creators.updateSingleFloatRequestFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error?.response?.data?.errors || []) [0] || error?.response?.data?.message
    openNotification('error', 'Update Float', errorText)
    yield put(Creators.updateSingleFloatRequestFailure(errorText))
  }
}


export function* allocateFundsToFloatRequest(action) {
  console.log('payload sga', action)
  const { id, payload } = action
  try {
    const response = yield call(allocateFundsToFloatApi, id, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'Allocate Funds To Float', response?.message)
      yield put(Creators.allocateFundsToFloatRequestSuccess(response?.data))
    } else {
      openNotification('error', 'Allocate Funds To Float', response?.message)
      yield put(Creators.allocateFundsToFloatRequestFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error?.response?.data?.errors || []) [0] || error?.response?.data?.message
    openNotification('error', 'Allocate Funds To Float', errorText)
    yield put(Creators.allocateFundsToFloatRequestFailure(errorText))
  }
}

export function* retireFloatOrder(action) {
  const { id, payload } = action
  try {
    const response = yield call(retireFloatOrderApi, id, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'Retire Float', response?.message)
      yield put(Creators.retireFloatOrderSuccess(response?.data))
    } else {
      openNotification('error', 'Retire Float', response?.message)
      yield put(Creators.retireFloatOrderFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error?.response?.data?.errors || []) [0] || error?.response?.data?.message
    openNotification('error', 'Retire Float', errorText)
    yield put(Creators.retireFloatOrderFailure(errorText))
  }
}


export function* closeFloatOrder(action) {
  const { id, payload } = action
  try {
    const response = yield call(closeFloatOrderApi, id, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'Close Float', response?.message)
      yield put(Creators.closeFloatOrderSuccess(response?.data))
    } else {
      openNotification('error', 'Close Float', response?.message)
      yield put(Creators.closeFloatOrderFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error?.response?.data?.errors || []) [0] || error?.response?.data?.message
    openNotification('error', 'Close Float', errorText)
    yield put(Creators.closeFloatOrderFailure(errorText))
  }
}

export function* addItemsToFloatOrder(action) {
  const { id, payload } = action
  try {
    const response = yield call(addItemsToFloatOrderApi, id, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'Update Float Order', response?.message)
      yield put(Creators.addItemsToFloatOrderSuccess(response?.data))
    } else {
      openNotification('error', 'Update Float Order', response?.message)
      yield put(Creators.addItemsToFloatOrderFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error?.response?.data?.errors || []) [0] || error?.response?.data?.message
    openNotification('error', 'Update Float Order', errorText)
    yield put(Creators.addItemsToFloatOrderFailure(errorText))
  }
}


export function* resetFloatRequest(action) {
  yield put(Creators.resetFloatequest())
}

//watchers

export function* watchFetchFloatRequests(action) {
  yield takeLatest(Types.FETCH_FLOAT_REQUESTS, fetchAllFloatRequests)
}

export function* watchFetchMyFloatRequests(action) {
  yield takeLatest(Types.FETCH_MY_FLOAT_REQUESTS, fetchMyFloatRequests)
}

export function* watchCreateFloatRequest(action) {
  yield takeLatest(Types.CREATE_FLOAT_REQUEST, createFloatRequest)
}

export function* watchUpdateFloatRequest(action) {
  yield takeLeading(Types.UPDATE_FLOAT_REQUEST, updateFloatRequest)
}

export function* watchUpdateSingleFloatRequest(action) {
  yield takeLeading(Types.UPDATE_SINGLE_FLOAT_REQUEST, updateSingleFloatRequest)
}

export function* watchAllocateFundsToFloatRequest(action) {
  yield takeLeading(Types.ALLOCATE_FUNDS_TO_FLOAT_REQUEST, allocateFundsToFloatRequest)
}

export function* watchFetchFloatOrders(action) {
  yield takeLeading(Types.FETCH_FLOAT_ORDERS, fetchFloatOrders)
}

export function* watchFetchFloatOrder(action) {
  yield takeLeading(Types.FETCH_FLOAT_ORDER, fetchFloatOrder)
}

export function* watchUpdateFloatOrderStatus(action) {
  yield takeLatest(Types.UPDATE_FLOAT_ORDER_STATUS, updateFloatOrderStatus)
}

export function* watchAddItemsToFloatOrder(action) {
  yield takeLeading(Types.ADD_ITEMS_TO_FLOAT_ORDER, addItemsToFloatOrder)
}

export function* watchRetireFloatOrder(action) {
  yield takeLeading(Types.RETIRE_FLOAT_ORDER, retireFloatOrder)
}

export function* watchCloseFloatOrder(action) {
  yield takeLeading(Types.CLOSE_FLOAT_ORDER, closeFloatOrder)
}