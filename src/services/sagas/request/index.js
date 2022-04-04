import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/request/actions'
import { Creators as NotificationCreators } from "../../redux/notification/actions"

import {
  fetchRequests as fetchRequestsApi,
  updateRequest as updateRequestApi,
  saveRequest as createRequestApi,
  fetchMyRequests as fetchMyRequestsApi,
  getRequestById as fetchRequestByIdApi,
  updateSingleRequest as updateSingleRequestApi
} from '../../api/item-request'
import openNotification from '../../../util/notification'
import { clearLocalState } from '../../app-storage'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'


export function* fetchRequests(action) {
  console.log('=================>FETCH ALL REQUEST SAGA', action)
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

export function* getRequest(action) {
  try {
    const response = yield call(fetchRequestByIdApi, action.id)
      if(response.status === RESPONSE_SUCCESS_CODE) {
        console.log('yes fetched', response?.data)
        yield put(Creators.getRequestSuccess(response?.data))
      }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed to fetch request'
    openNotification('error', 'Fetch Request', errorText)
    yield put(Creators.getRequestFailure(errorText))
  }
}

export function* fetchMyRequests(action) {
  console.log('HEY LETS FETCH MY REQUESTS SAGA')
  console.log('=================>FETCH MY REQUEST')
  try {
    const response = yield call(fetchMyRequestsApi, action.query)
    console.log("Request Response", response)
    if(["OK", "SUCCESS", "FOUND"].includes(response.status)) {
      const responseData = response?.data || []
      yield put(Creators.fetchMyRequestsSuccess(responseData))
    } else {
      openNotification('error', 'Fetch Request', response.message || "Failed to fetch Requests")
      yield put(Creators.fetchMyRequestsFailure(response.message || "Failed to fetch requests!"))
    }
  } catch (error) {
    const errorText = (error?.response?.data && error?.response?.data?.error) || 'Failed to fetch departments'
    openNotification('error', 'Fetch Request', errorText)
    yield put(Creators.fetchMyRequestsFailure(errorText))
  }
}


export function* createRequest(action) {
  console.log('action data', action)
  try {
    const response = yield call(createRequestApi, action.payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      yield put(Creators.createRequestSuccess(responseData))
      clearLocalState("NEW-REQUEST")
      openNotification('success', 'CREATE REQUEST', response.message)
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.createRequestFailure(response.message))
    }
  } catch (error) {
    const errors = error?.response?.data?.errors[0]
    openNotification('error', 'Create Requests', errors)
    yield put(Creators.createRequestFailure(errors))
  }
}

export function* updateRequest(action) {
  console.log('update action saga', action)
  try {
    const response = yield call(updateRequestApi, action.payload)
    if(["OK", "SUCCESS"].includes(response.status)) {
      const responseData = response?.data
      console.log('API RESPONSE DAYA', responseData)
      openNotification('success', 'Update Request', response.message)
      yield put(Creators.updateRequestSuccess(responseData || {}))
      yield put(NotificationCreators.fetchNotifications())
    } else {
      openNotification('error', 'Update Request', response.message)
      yield put(Creators.updateRequestFailure(response.message))
    }
  } catch (error) {
    const errors = error?.response?.data?.errors
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch departments'
    openNotification('error', 'Update Request', errors[0])
    yield put(Creators.updateRequestFailure(message))
  }
}

export function* updateSingleRequest(action) {
  console.log('action', action)
  const {id, payload} = action
  try {
    const response = yield call(updateSingleRequestApi, id, payload)
    if(["OK", "SUCCESS"].includes(response.status)) {
      const responseData = response?.data
      console.log('API RESPONSE DAYA', responseData)
      openNotification('success', 'Update Request', response.message)
      yield put(Creators.updateSingleRequestSuccess(responseData || {}))
    } else {
      openNotification('error', 'Update Request', response.message)
      yield put(Creators.updateSingleRequestFailure(response.message))
    }
  } catch (error) {
    const errors = error?.response?.data?.errors
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch departments'
    openNotification('error', 'Update Request', errors[0])
    yield put(Creators.updateSingleRequestFailure(message))
  }
}


export function* resetRequest(action) {
  yield put(Creators.resetRequest())
}

export function* watchGetRequest(action) {
  yield takeLatest(Types.GET_REQUEST, getRequest)
}

export function* watchFetchRequests(action) {
  yield takeLatest(Types.FETCH_REQUESTS, fetchRequests)
}

export function* watchFetchMyRequests(action) {
  yield takeLatest(Types.FETCH_MY_REQUESTS, fetchMyRequests)
}

export function* watchCreateRequest(action) {
  yield takeLatest(Types.CREATE_REQUEST, createRequest)
}

export function* watchUpdateRequest(action) {
  yield takeLeading(Types.UPDATE_REQUEST, updateRequest)
}


export function* watchUpdateSingleRequest(action) {
  yield takeLatest(Types.UPDATE_SINGLE_REQUEST, updateSingleRequest)
}