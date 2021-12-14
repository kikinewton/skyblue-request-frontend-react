import { call, put, takeLatest } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/request-category/actions'

import {
  getRequestCategories as getRequestCategoriesApi,
  saveRequestCategory as createRequestCategoryApi,
  deleteRequestCategory as deleteRequestCategoryApi,
  updateRequestCategory as updateRequestCategoryApi
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
    if(response.status === 'SUCCESS') {
      const responseData = response.data
      yield put(Creators.createRequestCategorySuccess(responseData))
      openNotification('success', 'CREATE REQUEST', response.message)
    } else {
      openNotification('error', 'CREATE REQUEST', response.message)
      yield put(Creators.createRequestCategoryFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to save category'
    openNotification('error', 'Login', message)
    yield put(Creators.createRequestCategoryFailure(message))
  }
}

export function* updateRequestCategory(action) {
  console.log('action data', action)
  try {
    const response = yield call(updateRequestCategoryApi, action.id, action.payload)
    if(response.status === 'SUCCESS') {
      const responseData = response.data
      yield put(Creators.updateRequestCategorySuccess(responseData))
      openNotification('success', 'CREATE REQUEST', response.message)
    } else {
      openNotification('error', 'CREATE REQUEST', response.message)
      yield put(Creators.updateRequestCategoryFailure(response.message))
    }
  } catch (error) {
    const errors = error?.response?.data?.errors
    openNotification('error', 'Login', errors[0])
    yield put(Creators.updateRequestCategoryFailure(errors[0]))
  }
}

export function* deleteRequestCategory(action) {
  console.log('action data', action)
  try {
    const response = yield call(deleteRequestCategoryApi, action.id)
    if(response.status === 'SUCCESS') {
      yield put(Creators.deleteRequestCategorySuccess(action.id))
      openNotification('success', 'DELETE REQUEST CATEGORY', response.message)
    } else {
      openNotification('error', 'DELETE REQUEST CATEGORY', response.message)
      yield put(Creators.deleteRequestCategoryFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to delete category'
    openNotification('error', 'DELETE REQUEST CATEGORY', message)
    yield put(Creators.deleteRequestCategoryFailure(message))
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

export function* watchUpdateRequestCategory(action) {
  yield takeLatest(Types.UPDATE_REQUEST_CATEGORY, updateRequestCategory)
}

export function* watchResetRequestCategory(action) {
  yield takeLatest(Types.RESET_REQUEST_CATEGORY, resetRequestCategory)
}
