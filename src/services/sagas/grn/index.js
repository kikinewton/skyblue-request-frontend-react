import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/grn/actions'

import {
  getAllGoodsReceiveNotes as getAllGoodsReceiveNotesApi,
  getGoodsReceiveNoteById as getGoodsReceiveNoteByIdApi,
  createGoodsReceiveNote as createGoodsReceiveNoteApi,
  updateGoodsReceiveNote as updateGoodsReceiveNoteApi,
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
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed To Fetch Goods Received Notes'
    openNotification('error', 'Fetch Goods Received Notes', errorText)
    yield put(Creators.fetchGrnsFailure(errorText))
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
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed to my float requests'
    openNotification('error', 'Fetch GRN', errorText)
    yield put(Creators.fetchGrnFailure(errorText))
  }
}


export function* createGrn(action) {
  const { payload } = action
  try {
    const response = yield call(createGoodsReceiveNoteApi, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'Create Supplier Goods Received Note', response?.message)
      yield put(Creators.createGrnSuccess(response?.data))
    } else {
      openNotification('error', 'Create Supplier Goods Received Note', response?.message)
      yield put(Creators.createGrnFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed To Create Supplier Goods Received Note'
    openNotification('error', 'Create Supplier Goods Received Note', errorText)
    yield put(Creators.createGrnFailure(errorText))
  }
}

export function* updateGrn(action) {
  const { id, payload } = action
  console.log('saga payload', payload)
  try {
    const response = yield call(updateGoodsReceiveNoteApi, id, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      openNotification('success', 'Update Supplier Goods Received Note', response?.message)
      yield put(Creators.updateGrnSuccess(response?.data))
    } else {
      openNotification('error', 'Update Supplier Goods Received Note', response?.message)
      yield put(Creators.updateGrnFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed To Update Supplier Goods Received Note'
    openNotification('error', 'Update Supplier Goods Received Note', errorText)
    yield put(Creators.updateGrnFailure(errorText))
  }
}

//watchers

export function* watchFetchGrns(action) {
  yield takeLatest(Types.FETCH_GRNS, fetchGrns)
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
