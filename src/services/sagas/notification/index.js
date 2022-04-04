import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/notification/actions'

import {
  fetchNotifications as fetchNotificationsApi
} from '../../api/notification'
import openNotification from '../../../util/notification'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'

export function* fetchNotifications(action) {
  try {
    const response = yield call(fetchNotificationsApi)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.fetchNotificationsSuccess(response?.data))
      localStorage.setItem("app-notifications", JSON.stringify(response?.data))
    } else {
      openNotification('error', 'Get Notifications', response?.message)
      yield put(Creators.fetchNotificationsFailure(response?.message))
    }
  } catch (error) {
    const errorText = (error?.response?.data?.errors || []) [0] || error?.response?.data?.message
    openNotification('error', 'Get Notifications', errorText)
    yield put(Creators.fetchNotificationsFailure(errorText))
  }
}


//watchers

export function* watchFetchNotifications(action) {
  yield takeLatest(Types.FETCH_NOTIFICATIONS, fetchNotifications)
}
