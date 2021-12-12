import { call, put, takeLatest } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/department/actions'

import {
  getDepartments,
  deleteDepartment as deleteDepartmentApi,
  updateDepartment as updateDepartmentApi,
  saveDepartment,
  getDepartment as getDepartmentApi
} from '../../api/department'
import openNotification from '../../../util/notification'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'


export function* fetchDepartments(action) {
  try {
    const response = yield call(getDepartments, {})
    if(response.status === 'SUCCESS') {
      const responseData = response.data
      yield put(Creators.fetchDepartmentsSuccess(responseData))
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.fetchDepartmentsFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch departments'
    openNotification('error', 'Login', message)
    yield put(Creators.fetchDepartmentsFailure(message))
  }
}

export function* getDepartment(action) {
  try {
    const response = yield call(getDepartmentApi, action.departmentId)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      yield put(Creators.getDepartmentSuccess(responseData))
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.getDepartmentFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch departments'
    openNotification('error', 'Login', message)
    yield put(Creators.getDepartmentFailure(message))
  }
}

export function* createDepartment(action) {
  console.log('action data', action)
  try {
    const response = yield call(saveDepartment, action.payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      yield put(Creators.createDepartmentSuccess(responseData))
      openNotification('success', 'CREATE DEPARTMENT', response.message)
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.createDepartmentFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch departments'
    openNotification('error', 'Login', message)
    yield put(Creators.createDepartmentFailure(message))
  }
}

export function* updateDepartment(action) {
  console.log('action', action)
  const { departmentId, payload } = action
  try {
    const response = yield call(updateDepartmentApi, departmentId, payload)
    if(response.status === 'SUCCESS') {
      const responseData = response.data
      openNotification('success', 'Update Department', response.message)
      yield put(Creators.updateDepartmentSuccess(responseData))
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.updateDepartmentFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch departments'
    openNotification('error', 'Login', message)
    yield put(Creators.updateDepartmentFailure(message))
  }
}

export function* deleteDepartment(action) {
  console.log('action', action)
  const { departmentId } = action
  try {
    const response = yield call(deleteDepartmentApi, departmentId)
    if(response.status === 'SUCCESS') {
      openNotification('success', 'Delete Department', response.message)
      yield put(Creators.deleteDepartmentSuccess(departmentId))
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.deleteDepartmentFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch departments'
    openNotification('error', 'Login', message)
    yield put(Creators.updateDepartmentFailure(message))
  }
}


export function* watchFetchDepartments(action) {
  yield takeLatest(Types.FETCH_DEPARTMENTS, fetchDepartments)
}

export function* watchCreateDepartment(action) {
  yield takeLatest(Types.CREATE_DEPARTMENT, createDepartment)
}

export function* watchUpdateDepartment(action) {
  yield takeLatest(Types.UPDATE_DEPARTMENT, updateDepartment)
}

export function* watchDeleteDepartment(action) {
  yield takeLatest(Types.DELETE_DEPARTMENT, deleteDepartment)
}

export function* watchGetDepartment(action) {
  yield takeLatest(Types.GET_DEPARTMENT, getDepartment)
}