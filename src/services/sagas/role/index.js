import { call, put, takeLatest } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/role/actions'

import {
  fetchRoles as fetchRolesApi
} from '../../api/auth'
import openNotification from '../../../util/notification'
import { clearLocalState } from '../../app-storage'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'


export function* fetchRoles(action) {
  try {
    const response = yield call(fetchRolesApi, action.query)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response?.data || []
      yield put(Creators.fetchRolesSuccess(responseData))
    } else {
      openNotification('error', 'Fetch Roles', response.message || "Failed to fetch roles")
      yield put(Creators.fetchRolesFailure(response.message || "Failed to fetch roles!"))
    }
  } catch (error) {
    const errorText = (error && error?.response?.data && error?.response?.data?.error) || 'Failed to fetch roles'
    openNotification('error', 'Fetch Request', errorText)
    yield put(Creators.fetchRolesFailure(errorText))
  }
}

export function* watchFetchRoles(action) {
  yield takeLatest(Types.FETCH_ROLES, fetchRoles)
}
