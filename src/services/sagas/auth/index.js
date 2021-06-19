import { call, put, takeLeading } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/auth/actions'
import { history } from '../../../util/browser-history'

import {
  signIn
} from '../../api/auth'
import { clearLocalState, storeLocalState } from '../../app-storage'
import openNotification from '../../../util/notification'
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '../../app-storage/key-values'


export function* login(action) {
  console.log('action', action)
  try {
    const { email, password } = action.payload
    const response = yield call(signIn, { email, password })
    if(response.status === 'SUCCESS') {
      const responseData = response.data
      storeLocalState(AUTH_TOKEN_KEY, responseData.token)
      storeLocalState(AUTH_USER_KEY, { ...responseData.employee, role: responseData.employee.role[0] })
      yield put(Creators.loginSuccess(responseData))
      //window.location.href = "/app"
      history.push("/app")
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.loginFailue(response.message))
    }
  } catch (error) {
    const message = (error && error.response?.data && error.response?.data?.error) || 'Invalid credentials'
    openNotification('error', 'Login', message)
    yield put(Creators.loginFailure(message))
  }
}

export function* logout(action) {
  yield put(Creators.logout(null))
  clearLocalState(AUTH_USER_KEY)
  clearLocalState(AUTH_TOKEN_KEY)
  //window.location.href = "/#auth/login"
  history.push("/auth/login")
}

export function* watchLogin() {
  yield takeLeading(Types.LOGIN, login)
}

export function* watchLogout() {
  yield takeLeading(Types.LOGOUT, logout)
}