import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/petty-cash/actions'

import {
  savePettyCashRequest as savePettyCashRequestApi,
  fetchMyPettyCashRequests as fetchMyPettyCashRequestsApi,
  fetchAllPettyCashRequests as fetchAllPettyCashRequestsApi,
  updatePettyCashRequest as updatePettyCashRequestApi,
  updateBulkPettyCashRequest as updateBulkPettyCashRequestApi
} from '../../api/petty-cash'
import openNotification from '../../../util/notification'
import { clearLocalState } from '../../app-storage'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'


export function* fetchPettyCashRequests(action) {
  console.log('petty cash fetch saga-----')
  try {
    const response = yield call(fetchAllPettyCashRequestsApi, action.query)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response?.data || []
      yield put(Creators.fetchPettyCashRequestsSuccess(responseData))
    } else {
      openNotification('error', 'Fetch Request', response.message || "Failed to fetch Requests")
      yield put(Creators.fetchPettyCashRequestsFailure(response.message || "Failed to fetch requests!"))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed to fetch departments'
    openNotification('error', 'Fetch Request', errorText)
    yield put(Creators.fetchPettyCashRequestsFailure(errorText))
  }
}


export function* fetchMyPettyCashRequests(action) {
  try {
    const response = yield call(fetchMyPettyCashRequestsApi, action.query)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response?.data || []
      yield put(Creators.fetchMyPettyCashRequestsSuccess(responseData))
    } else {
      openNotification('error', 'Fetch Request', response.message || "Failed to fetch Requests")
      yield put(Creators.fetchMyPettyCashRequestsFailure(response.message || "Failed to fetch requests!"))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed to fetch departments'
    openNotification('error', 'Fetch Request', errorText)
    yield put(Creators.fetchMyPettyCashRequestsFailure(errorText))
  }
}


export function* createPettyCashRequest(action) {
  try {
    const response = yield call(savePettyCashRequestApi, action.payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      yield put(Creators.createPettyCashRequestSuccess(responseData))
      clearLocalState("NEW-REQUEST")
      openNotification('success', 'CREATE PETTY CASH', response.message)
    } else {
      openNotification('error', 'CREATE PETTY CASH', response.message)
      yield put(Creators.createPettyCashRequestFailure(response.message))
    }
  } catch (error) {
    const errorTxt = (error && error.response.data && error.response.data.error) || 'Failed to fetch departments'
    openNotification('error', 'Login', errorTxt)
    yield put(Creators.createPettyCashRequestFailure(errorTxt))
  }
}

export function* updatePettyCashRequest(action) {
  const {id, payload} = action
  try {
    const response = yield call(updatePettyCashRequestApi, id, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      yield put(Creators.updatePettyCashRequestSuccess(responseData))
      clearLocalState("NEW-REQUEST")
      openNotification('success', 'UPDATE PETTY CASH', response.message)
    } else {
      openNotification('error', 'UPDATE PETTY CASH', response.message)
      yield put(Creators.updatePettyCashRequestFailure(response.message))
    }
  } catch (error) {
    const errorTxt = (error && error.response.data && error.response.data.error) || 'Failed to update petty cash'
    openNotification('error', 'Login', errorTxt)
    yield put(Creators.updatePettyCashRequestFailure(errorTxt))
  }
}

export function* updateBulkPettyCashRequest(action) {
  try {
    const response = yield call(updateBulkPettyCashRequestApi, action.payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      yield put(Creators.updateBulkPettyCashRequestSuccess(responseData))
      clearLocalState("NEW-REQUEST")
      openNotification('success', 'UPDATE PETTY CASH', response.message)
    } else {
      openNotification('error', 'UPDATE PETTY CASH', response.message)
      yield put(Creators.updateBulkPettyCashRequestFailure(response.message))
    }
  } catch (error) {
    const errorTxt = (error && error.response.data && error.response.data.error) || 'Failed to update petty cash'
    openNotification('error', 'Login', errorTxt)
    yield put(Creators.updateBulkPettyCashRequestFailure(errorTxt))
  }
}


export function* resetRequest(action) {
  yield put(Creators.resetRequest())
}

export function* watchFetchPettyCashRequests(action) {
  yield takeLatest(Types.FETCH_PETTY_CASH_REQUESTS, fetchPettyCashRequests)
}

export function* watchFetchMyPettyCashRequests(action) {
  yield takeLatest(Types.FETCH_MY_PETTY_CASH_REQUESTS, fetchMyPettyCashRequests)
}

export function* watchCreatePettyCashRequest(action) {
  yield takeLatest(Types.CREATE_PETTY_CASH_REQUEST, createPettyCashRequest)
}

export function* watchUpdatePettyCashRequest(action) {
  yield takeLeading(Types.UPDATE_PETTY_CASH_REQUEST, updatePettyCashRequest)
}


export function* watchUpdateBulkPettyCashRequest(action) {
  yield takeLeading(Types.UPDATE_BULK_PETTY_CASH_REQUEST, updateBulkPettyCashRequest)
}

