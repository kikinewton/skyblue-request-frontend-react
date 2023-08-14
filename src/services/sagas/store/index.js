import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/store/actions'

import {
  getStores as getStoresApi,
  saveStore as saveStoreApi,
  updateStore as updateStoreApi,
  deleteStore as deleteStoreApi
} from '../../api/store'
import openNotification from '../../../util/notification'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'


export function* fetchStores(action) {
  const { query } = action
  try {
    const response = yield call(getStoresApi, query)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response?.data || []
      yield put(Creators.fetchStoresSuccess(responseData))
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.fetchStoresFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Stores'
    openNotification('error', 'Login', message)
    yield put(Creators.fetchStoresFailure(message))
  }
}

export function* createStore(action) {
  try {
    const response = yield call(saveStoreApi, action.payload)
    if(response.status === 'SUCCESS') {
      const responseData = response.data
      openNotification('success', 'CREATE Store', response.message)
      yield put(Creators.createStoreSuccess(responseData))
      yield put(Creators.fetchStores({}))
    } else {
      openNotification('error', 'CREATE Store', response.message)
      yield put(Creators.createStoreFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to create Stores'
    openNotification('error', 'CREATE Store', message)
    yield put(Creators.createStoreFailure(message))
  }
}

export function* updateStore(action) {
  const { id, payload } = action
  try {
    const response = yield call(updateStoreApi, id, payload)
    if(response.status === 'SUCCESS') {
      const responseData = response.data
      openNotification('success', 'Update Store', response.message)
      yield put(Creators.updateStoreSuccess(responseData))
      yield put(Creators.fetchStores({}))
    } else {
      openNotification('error', 'Update Store', response.message)
      yield put(Creators.updateStoreFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to create Stores'
    openNotification('error', 'Update Store', message)
    yield put(Creators.updateStoreFailure(message))
  }
}

export function* deleteStore(action) {
  const { id } = action
  try {
    const response = yield call(deleteStoreApi, id)
    if(response.status === 'SUCCESS') {
      const responseData = response.data
      openNotification('success', 'Delete Store', response.message)
      yield put(Creators.deleteStoreSuccess(responseData))
      yield put(Creators.fetchStores({}))
    } else {
      openNotification('error', 'Delete Store', response.message)
      yield put(Creators.deleteStoreFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to create Stores'
    openNotification('error', 'Delete Store', message)
    yield put(Creators.DeleteStoreFailure(message))
  }
}

export function* watchFetchStores(action) {
  yield takeLatest(Types.FETCH_STORES, fetchStores)
}

export function* watchCreateStore(action) {
  yield takeLeading(Types.CREATE_STORE, createStore)
}

export function* watchUpdateStore(action) {
  yield takeLeading(Types.UPDATE_STORE, updateStore)
}

export function* watchDeleteStore(action) {
  yield takeLeading(Types.DELETE_STORE, deleteStore)
}