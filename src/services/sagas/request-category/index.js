import { call, put, takeLatest } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/request-category/actions'

import {
  getRequestCategories as getRequestCategoriesApi,
  saveRequestCategory as createRequestCategoryApi
} from '../../api/request-category'
import openNotification from '../../../util/notification'


export function* fetchRequestCategories(action) {
  console.log('=================>FETCH REQUEST', action)
  try {
    const response = yield call(getRequestCategoriesApi, action.query)
    const responseData = response.data
    yield put(Creators.fetchRequestCategoriesSuccess(responseData))
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch categories'
    openNotification('error', 'Login', message)
    yield put(Creators.fetchRequestCategoriesFailure(message))
  }
}


export function* createRequestCategory(action) {
  console.log('action data', action)
  try {
    const response = yield call(createRequestCategoryApi, action.payload)
    if(response.status === 'OK') {
      const responseData = response.data
      yield put(Creators.createRequestCategorySuccess(responseData))
      openNotification('success', 'CREATE REQUEST', response.message)
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.createRequestCategoryFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to save category'
    openNotification('error', 'Login', message)
    yield put(Creators.createRequestCategoryFailure(message))
  }
}


export function* resetRequestCategory(action) {
  yield put(Creators.resetRequest())
}



export function* watchFetchRequestCategories(action) {
  yield takeLatest(Types.FETCH_REQUEST_CATEGORIES, fetchRequestCategories)
}

export function* watchCreateRequestCategory(action) {
  yield takeLatest(Types.CREATE_REQUEST_CATEGORY, createRequestCategory)
}

export function* watchResetRequestCategory(action) {
  yield takeLatest(Types.RESET_REQUEST_CATEGORY, resetRequestCategory)
}
