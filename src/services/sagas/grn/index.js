import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/grn/actions'
import {Creators as NotificationCreators} from "../../redux/notification/actions"

import {
  getAllGoodsReceiveNotes as getAllGoodsReceiveNotesApi,
  getGoodsReceiveNoteById as getGoodsReceiveNoteByIdApi,
  createGoodsReceiveNote as createGoodsReceiveNoteApi,
  updateGoodsReceiveNote as updateGoodsReceiveNoteApi,
  createFloatGrn as createFloatGrnApi,
  updateFloatGrn as updateFloatGrnApi,
  fetchAllFloatGrns as fetchAllFloatGrnsApi,
} from '../../api/goods-receive-note'

import openNotification from '../../../util/notification'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'


export function* fetchGrns(action) {
  const { query } = action
  try {
    const response = yield call(getAllGoodsReceiveNotesApi, query)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.fetchGrnsSuccess(response?.data))
    } else {
      openNotification('error', 'Fetch Goods Received Notes', response?.message)
      yield put(Creators.fetchGrnsFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error?.response?.data?.error) || error?.response?.data?.errors[0] || error?.response?.data?.message || 'Failed To Fetch Goods Received Notes'
    openNotification('error', 'Fetch GRN', errorText)
    yield put(Creators.fetchGrnsFailure(errorText))
  }
}

export function* fetchFloatGrns(action) {
  const { query } = action
  try {
    const response = yield call(fetchAllFloatGrnsApi, query)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.fetchFloatGrnsSuccess(response?.data))
    } else {
      openNotification('error', 'FETCH FLOAT GRNS', response?.message)
      yield put(Creators.fetchFloatGrnsFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed To Fetch Goods Received Notes'
    openNotification('error', 'FETCH FLOAT GRNS', errorText)
    yield put(Creators.fetchFloatGrnsFailure(errorText))
  }
}

export function* fetchGrn(action) {
  console.log('action fetch grn', action.id)
  const { id } = action
  try {
    const response = yield call(getGoodsReceiveNoteByIdApi, id)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.fetchGrnSuccess(response?.data))
    } else {
      openNotification('error', 'Fetch GRN', response?.message)
      yield put(Creators.fetchGrnFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed to my GRN'
    openNotification('error', 'Fetch GRN', errorText)
    yield put(Creators.fetchGrnFailure(errorText))
  }
}


export function* createGrn(action) {
  const { payload } = action
  try {
    const response = yield call(createGoodsReceiveNoteApi, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'Create Supplier GRN', response?.message)
      yield put(Creators.createGrnSuccess(response?.data))
      yield put(NotificationCreators.fetchNotifications())
    } else {
      openNotification('error', 'Create Supplier GRN', response?.message)
      yield put(Creators.createGrnFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed To Create Supplier Goods Received Note'
    openNotification('error', 'Create Supplier GRN', errorText)
    yield put(Creators.createGrnFailure(errorText))
  }
}

export function* updateGrn(action) {
  const { id, payload } = action
  console.log('saga payload', payload)
  try {
    const response = yield call(updateGoodsReceiveNoteApi, id, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'Update Supplier GRN', response?.message)
      yield put(Creators.updateGrnSuccess(response?.data))
      yield put(NotificationCreators.fetchNotifications())
    } else {
      openNotification('error', 'Update Supplier GRN', response?.message)
      yield put(Creators.updateGrnFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed To Update Supplier GRN'
    openNotification('error', 'Update Supplier GRN', errorText)
    yield put(Creators.updateGrnFailure(errorText))
  }
}


export function* createFloatGrn(action) {
  const { payload } = action
  try {
    const response = yield call(createFloatGrnApi, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'CREATE FLOAT GRN', response?.message)
      yield put(Creators.createFloatGrnSuccess(response?.data))
      yield put(NotificationCreators.fetchNotifications())
    } else {
      openNotification('error', 'CREATE FLOAT GRN', response?.message)
      yield put(Creators.createFloatGrnFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'FAILED TO CREATE GRN FOR FLOAT'
    openNotification('error', 'CREATE FLOAT GRN', errorText)
    yield put(Creators.createFloatGrnFailure(errorText))
  }
}

export function* updateFloatGrn(action) {
  const { id, payload } = action
  console.log('saga payload', payload)
  console.log('saga payload id', id)
  try {
    const response = yield call(updateFloatGrnApi, id, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'UPDATE FLOAT GRN', response?.message)
      yield put(Creators.updateFloatGrnSuccess(response?.data))
      yield put(NotificationCreators.fetchNotifications())
    } else {
      openNotification('error', 'UPDATE FLOAT GRN', response?.message)
      yield put(Creators.updateFloatGrnFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed To Update Float GRN'
    openNotification('error', 'UPDATE FLOAT GRN', errorText)
    yield put(Creators.updateFloatGrnFailure(errorText))
  }
}

//watchers

export function* watchFetchGrns(action) {
  yield takeLatest(Types.FETCH_GRNS, fetchGrns)
}

export function* watchFetchFloatGrns(action) {
  yield takeLatest(Types.FETCH_FLOAT_GRNS, fetchFloatGrns)
}

export function* watchFetchGrn(action) {
  yield takeLatest(Types.FETCH_GRN, fetchGrn)
}

export function* watchCreateGrn(action) {
  yield takeLatest(Types.CREATE_GRN, createGrn)
}

export function* watchUpdateGrn(action) {
  yield takeLeading(Types.UPDATE_GRN, updateGrn)
}

export function* watchCreateFloatGrn(action) {
  yield takeLatest(Types.CREATE_FLOAT_GRN, createFloatGrn)
}

export function* watchUpdateFloatGrn(action) {
  yield takeLeading(Types.UPDATE_FLOAT_GRN, updateFloatGrn)
}
