import { call, put, takeLatest } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/quotation/actions'

import {
  getAllQuotations as getAllQuotationsApi,
  updateQuotation as updateQuotationApi,
  createQuotation as createQuotationApi,
} from '../../api/quotation'
import openNotification from '../../../util/notification'
import { message } from 'antd'


export function* fetchQuotations(action) {
  console.log('fetch quotations saga', action)
  try {
    const response = yield call(getAllQuotationsApi, action.query)
    if(response.status === 'OK') {
      const responseData = response.data
      console.log('response data', responseData)
      yield put(Creators.fetchQuotationsSuccess(responseData))
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.fetchQuotationsFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Employees'
    openNotification('error', 'Login', message)
    yield put(Creators.fetchQuotationsFailure(message))
  }
}


export function* updateQuotation(action) {
  console.log('action', action)
  const {quotationId, payload} = action
  try {
    const response = yield call(updateQuotationApi, quotationId, payload)
    if(response.status === 'OK') {
      const responseData = response.data
      yield put(Creators.updateQuotationSuccess(responseData))
      openNotification('success', 'Update Quotation', response.message)
      //yield put(Creators.fetchQuotations({}))
    } else {
      openNotification('error', 'Update Quotation', response.message)
      yield put(Creators.updateQuotationFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Employees'
    openNotification('error', 'Login', message)
    yield put(Creators.updateQuotationFailure(message))
  }
}

export function* createQuotation(action) {
  const { payload } = action
  try {
    const response = yield call(createQuotationApi, payload)
    if(response.status === "OK") {
      yield put(Creators.createQuotationSuccess(response.data))
      message.success("Quotation Document Addedd Successfully")
    } else {
      message.error("Upload failed!")
    }
  } catch (error) {
    console.log('err: ', error)
    message.error("Failed!")
  }
}


export function* watchFetchQuotations(action) {
  yield takeLatest(Types.FETCH_QUOTATIONS, fetchQuotations)
}

export function* watchUpdateQuotation(action) {
  yield takeLatest(Types.UPDATE_QUOTATION, updateQuotation)
}

export function* watchCreateQuotation(action) {
  yield takeLatest(Types.CREATE_QUOTATION, createQuotation)
}