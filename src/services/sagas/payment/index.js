import { call, put, takeLatest } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/payment/actions'
import { Creators as NotificationCreators } from '../../redux/notification/actions'

import {
  fetchPayments as fetchPaymentsApi,
  fetchPayment as fetchPaymentApi,
  createPayment as createPaymentApi,
  updatePayment as updatePaymentApi,

  fetchPaymentDrafts as fetchPaymentDraftsApi,
  fetchPaymentDraft as fetchPaymentDraftApi,
  createPaymentDraft as createPaymentDraftApi,
  updatePaymentDraft as updatePaymentDraftApi,
  deletePaymentDraft as deletePaymentDraftApi
} from '../../api/payment-draft'

import openNotification from '../../../util/notification'
import { message } from 'antd'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'


export function* fetchPayments(action) {
  try {
    const response = yield call(fetchPaymentsApi, action.query)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      yield put(Creators.fetchPaymentsSuccess(responseData))
    } else {
      openNotification('error', 'Fetch Payments', response.message)
      yield put(Creators.fetchPaymentsFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Payments'
    openNotification('error', 'Fetch Payments', message)
    yield put(Creators.fetchPaymentsFailure(message))
  }
}

export function* fetchPayment(action) {
  try {
    const response = yield call(fetchPaymentApi, action.id)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      yield put(Creators.fetchPaymentSuccess(responseData))
    } else {
      openNotification('error', 'Fetch Payments', response.message)
      yield put(Creators.fetchPaymentFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Payments'
    openNotification('error', 'Fetch Payments', message)
    yield put(Creators.fetchPaymentFailure(message))
  }
}


export function* updatePayment(action) {
  console.log('action', action)
  const {quotationId, payload} = action
  try {
    const response = yield call(updatePaymentApi, quotationId, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      yield put(Creators.updatePaymentSuccess(responseData))
      openNotification('success', 'Payment', response.message)
      yield put(NotificationCreators.fetchNotifications())
      //yield put(Creators.fetchQuotations({}))
    } else {
      openNotification('error', 'Update Payment', response.message)
      yield put(Creators.updatePaymentFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to update payment'
    openNotification('error', 'Update Payment', message)
    yield put(Creators.updatePaymentFailure(message))
  }
}

export function* createPayment(action) {
  const { payload } = action
  try {
    const response = yield call(createPaymentApi, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.createPaymentSuccess(response.data))
      message.success("Payment created successfully")
    } else {
      message.error(response?.message)
      yield put(Creators.createPaymentFailure(response.message))
    }
  } catch (error) {
    console.log('err: ', error)
    const errors = error?.response?.data?.errors
    message.error("Failed!")
    yield put(Creators.createPaymentFailure(errors[0]))
  }
}





////////////////////////////////
export function* fetchPaymentDrafts(action) {
  try {
    const response = yield call(fetchPaymentDraftsApi, action.query)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      yield put(Creators.fetchPaymentDraftsSuccess(responseData))
    } else {
      openNotification('error', 'Fetch Payment Drafts', response.message)
      yield put(Creators.fetchPaymentDraftsFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Payment Drafts'
    openNotification('error', 'Fetch Payment Draft', message)
    yield put(Creators.fetchPaymentDraftsFailure(message))
  }
}

export function* fetchPaymentDraft(action) {
  try {
    const response = yield call(fetchPaymentDraftApi, action.id)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      yield put(Creators.fetchPaymentSuccess(responseData))
    } else {
      openNotification('error', 'Fetch Payments', response.message)
      yield put(Creators.fetchPaymentDraftFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Payments'
    openNotification('error', 'Fetch Payment', message)
    yield put(Creators.fetchPaymentDraftFailure(message))
  }
}


export function* updatePaymentDraft(action) {
  const {id, payload} = action
  try {
    const response = yield call(updatePaymentDraftApi, id, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      console.log("UPDATE PAYMENT DRAFT RESPONSE", response)
      const responseData = response?.data
      openNotification('success', 'Update Payment Draft', response?.message)
      yield put(Creators.updatePaymentDraftSuccess(responseData))
      yield put(NotificationCreators.fetchNotifications())
    } else {
      openNotification('error', 'Update Payment Draft', response?.message)
      yield put(Creators.updatePaymentDraftFailure(response?.message))
    }
  } catch (error) {
    const message = (error && error?.response?.data && error?.response?.data?.error) || 'Failed to update payment'
    openNotification('error', 'Update Payment Draft', message)
    yield put(Creators.updatePaymentDraftFailure(message))
  }
}

export function* createPaymentDraft(action) {
  const { payload } = action
  try {
    const response = yield call(createPaymentDraftApi, payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.createPaymentDraftSuccess(response.data))
      message.success("Payment created successfully")
    } else {

      message.error(response?.message)
      yield put(Creators.createPaymentDraftFailure(response.message))
    }
  } catch (error) {
    console.log('err: ', error?.response)
    const errors = error?.response?.data?.message || "Payment Fialed"
    message.error(errors)
    yield put(Creators.createPaymentDraftFailure(errors))
  }
}

export function* deletePaymentDraft(action) {
  const { id } = action
  try {
    const response = yield call(deletePaymentDraftApi, id)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.createPaymentDraftSuccess(response.data))
      message.success("Payment Draft successfully")
    } else {

      message.error(response?.message)
      yield put(Creators.deletePaymentDraftFailure(response.message))
    }
  } catch (error) {
    console.log('err: ', error?.response)
    const errors = error?.response?.data?.message || "Payment Fialed"
    message.error(errors)
    yield put(Creators.delPaymentDraftFailure(errors))
  }
}


export function* watchFetchPayments(action) {
  yield takeLatest(Types.FETCH_PAYMENTS, fetchPayments)
}

export function* watchFetchPayment(action) {
  yield takeLatest(Types.FETCH_PAYMENT, fetchPayment)
}

export function* watchUpdatePayment(action) {
  yield takeLatest(Types.UPDATE_PAYMENT, updatePayment)
}

export function* watchCreatePayment(action) {
  yield takeLatest(Types.CREATE_PAYMENT, createPayment)
}

//////////////////
export function* watchFetchPaymentDrafts(action) {
  yield takeLatest(Types.FETCH_PAYMENT_DRAFTS, fetchPaymentDrafts)
}

export function* watchFetchPaymentDraft(action) {
  yield takeLatest(Types.FETCH_PAYMENT_DRAFT, fetchPaymentDraft)
}

export function* watchUpdatePaymentDraft(action) {
  yield takeLatest(Types.UPDATE_PAYMENT_DRAFT, updatePaymentDraft)
}

export function* watchCreatePaymentDraft(action) {
  yield takeLatest(Types.CREATE_PAYMENT_DRAFT, createPaymentDraft)
}

export function* watchDeletePaymentDraft(action) {
  yield takeLatest(Types.DELETE_PAYMENT_DRAFT, deletePaymentDraft)
}