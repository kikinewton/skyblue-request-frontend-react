import { call, put, takeLatest } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/float/actions'

import {
  fetchAllFloatRequests as fetchAllFloatRequestsApi,
  fetchMyFloatRequests as fetchMyFloatRequestsApi,
  saveFloatRequest as saveFloatRequestApi,
  fetchFloatRequests as fetchFloatRequestsApi
} from '../../api/float'
import openNotification from '../../../util/notification'
import { clearLocalState } from '../../app-storage'
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
