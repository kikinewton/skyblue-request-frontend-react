import { call, put, takeLatest } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/dashboard/actions'
import {
  getDashboardData as fetchDashboardDataApi
} from "../../api/dashboard"
import openNotification from '../../../util/notification'

export function* fetchDashboardData(action) {
  try {
    const response = yield call(fetchDashboardDataApi, {})
    if(response.status === 'SUCCESS') {
      const responseData = response.data
      yield put(Creators.fetchDashboardDataSuccess(responseData))
    } else {
      openNotification('error', 'Fetch Dashboard Data', response.message)
      yield put(Creators.fetchDashboardDataFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch departments'
    openNotification('error', 'Fetch Dashboard Data', message)
    yield put(Creators.fetchDashboardDataFailure(message))
  }
}


export function* watchfetchDashboardData(action) {
  yield takeLatest(Types.FETCH_DASHBOARD_DATA, fetchDashboardData)
}