import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/float/actions'

import {
  fetchMyFloatRequests as fetchMyFloatRequestsApi,
  saveFloatRequest as saveFloatRequestApi,
  fetchFloatRequests as fetchFloatRequestsApi,
  updateFloatRequest as updateFloatRequestApi,
  updateSingleFloatRequest as updateSingleFloatRequestApi,
  allocateFundsToFloat as allocateFundsToFloatApi,
  fetchFloatOrders as fetchFloatOrdersApi
} from '../../api/float'
import openNotification from '../../../util/notification'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'


export function* fetchAllFloatRequests(action) {
  console.log('=================>FETCH REQUEST', action)
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
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed to fetch float requests'
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
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed to fetch float requests'
    openNotification('error', 'Fetch Request', errorText)
    yield put(Creators.fetchFloatOrdersFailure(errorText))
  }
}

export function* fetchMyFloatRequests(action) {
  console.log('=================>FETCH REQUEST', action)
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
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed to my float requests'
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
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed to my float requests'
    openNotification('error', 'Create Float', errorText)
    yield put(Creators.createFloatRequestFailure(errorText))
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
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed to my float requests'
    openNotification('error', 'Update Float', errorText)
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
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed to my float requests'
    openNotification('error', 'Update Float', errorText)
    yield put(Creators.updateSingleFloatRequestFailure(errorText))
  }
}


export function* allocateFundsToFloatRequest(action) {
  const { payload } = action
  try {
    const response = yield call(allocateFundsToFloatApi, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'Allocate Funds To Float', response?.message)
      yield put(Creators.allocateFundsToFloatRequestSuccess(response?.data))
    } else {
      openNotification('error', 'Allocate Funds To Float', response?.message)
      yield put(Creators.allocateFundsToFloatRequestFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed To Allocate Funds To Float'
    openNotification('error', 'Allocate Funds To Float', errorText)
    yield put(Creators.allocateFundsToFloatRequestFailure(errorText))
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
