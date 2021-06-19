import { call, put, takeLatest } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/request/actions'

import {
  fetchRequests as fetchRequestsApi,
  updateRequest as updateRequestApi,
  saveRequest as createRequestApi,
} from '../../api/item-request'
import openNotification from '../../../util/notification'
import { clearLocalState } from '../../app-storage'


export function* fetchRequests(action) {
  console.log('=================>FETCH REQUEST', action)
  try {
    const response = yield call(fetchRequestsApi, action.query)
    console.log("Request Response", response)
    if(["OK", "SUCCESS", "FOUND"].includes(response.status)) {
      const responseData = response?.data || []
      yield put(Creators.fetchRequestsSuccess(responseData))
    } else {
      openNotification('error', 'Fetch Request', response.message || "Failed to fetch Requests")
      yield put(Creators.fetchRequestsFailure(response.message || "Failed to fetch requests!"))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed to fetch departments'
    openNotification('error', 'Fetch Request', errorText)
    yield put(Creators.fetchRequestsFailure(errorText))
  }
}


export function* createRequest(action) {
  console.log('action data', action)
  try {
    const response = yield call(createRequestApi, action.payload)
    if(response.status === 'OK') {
      const responseData = response.data
      yield put(Creators.createRequestSuccess(responseData))
      clearLocalState("NEW-REQUEST")
      openNotification('success', 'CREATE REQUEST', response.message)
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.createRequestFailure(response.message))
    }
  } catch (error) {
    const errorTxt = (error && error.response.data && error.response.data.error) || 'Failed to fetch departments'
    openNotification('error', 'Login', errorTxt)
    yield put(Creators.createRequestFailure(errorTxt))
  }
}

export function* updateRequest(action) {
  console.log('action', action)
  try {
    const response = yield call(updateRequestApi, action.payload)
    if(["OK", "SUCCESS"].includes(response.status)) {
      const responseData = response?.data
      console.log('API RESPONSE DAYA', responseData)
      openNotification('success', 'Update Request', response.message)
      yield put(Creators.updateRequestSuccess(responseData || {}))
    } else {
      openNotification('error', 'Update Request', response.message)
      yield put(Creators.updateRequestFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch departments'
    openNotification('error', 'Update Request', message)
    yield put(Creators.updateRequestFailure(message))
  }
}


export function* resetRequest(action) {
  yield put(Creators.resetRequest())
}

export function* watchFetchRequests(action) {
  yield takeLatest(Types.FETCH_REQUESTS, fetchRequests)
}

export function* watchCreateRequest(action) {
  yield takeLatest(Types.CREATE_REQUEST, createRequest)
}

export function* watchUpdateRequest(action) {
  yield takeLatest(Types.UPDATE_REQUEST, updateRequest)
}