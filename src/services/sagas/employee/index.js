import { call, put, takeLatest } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/employee/actions'

import {
  getUsers as fetchEmployeesApi,
  deleteUser as deleteEmployeeApi,
  updateUser as updateEmployeeApi,
  saveUser as saveEmployeeApi,
  getUser as getEmployeeApi
} from '../../api/employee'
import openNotification from '../../../util/notification'


export function* fetchEmployees(action) {
  try {
    const response = yield call(fetchEmployeesApi, {})
    if(response.status === 'SUCCESS') {
      const responseData = response.data
      yield put(Creators.fetchEmployeesSuccess(responseData))
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.fetchEmployeesFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Employees'
    openNotification('error', 'Login', message)
    yield put(Creators.fetchEmployeesFailure(message))
  }
}

export function* getEmployee(action) {
  try {
    const response = yield call(getEmployeeApi, action.EmployeeId)
    if(response.status === 'OK') {
      const responseData = response.data
      yield put(Creators.getEmployeeSuccess(responseData))
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.getEmployeeFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Employees'
    openNotification('error', 'Login', message)
    yield put(Creators.getEmployeeFailure(message))
  }
}

export function* createEmployee(action) {
  try {
    const response = yield call(saveEmployeeApi, action.payload)
    if(response.status === 'CREATED') {
      const responseData = response.data
      console.log('data', responseData)
      openNotification('success', 'CREATE Employee', response.message)
      yield put(Creators.createEmployeeSuccess(responseData))
      yield put(Creators.fetchEmployees())
    } else {
      openNotification('error', 'Create Employee', response.message)
      yield put(Creators.createEmployeeFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to create Employees'
    openNotification('error', 'Create Employee', message)
    yield put(Creators.createEmployeeFailure(message))
  }
}

export function* updateEmployee(action) {
  console.log('action', action)
  try {
    const response = yield call(updateEmployeeApi, action.employeeId, action.payload)
    if(response.status === 'CREATED') {
      const responseData = response.data
      yield put(Creators.updateEmployeeSuccess(responseData))
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.updateEmployeeFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Employees'
    openNotification('error', 'Login', message)
    yield put(Creators.updateEmployeeFailure(message))
  }
}

export function* deleteEmployee(action) {
  console.log('action', action)
  try {
    const response = yield call(deleteEmployeeApi, action.employeeId)
    if(response.status === 'OK') {
      const responseData = response.data
      openNotification('success', 'delete employee', response.message)
      yield put(Creators.deleteEmployeeSuccess({employeeId: action.employeeId}))
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.deleteEmployeeFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Employees'
    openNotification('error', 'Login', message)
    yield put(Creators.updateEmployeeFailure(message))
  }
}


export function* watchFetchEmployees(action) {
  yield takeLatest(Types.FETCH_EMPLOYEES, fetchEmployees)
}

export function* watchCreateEmployee(action) {
  yield takeLatest(Types.CREATE_EMPLOYEE, createEmployee)
}

export function* watchUpdateEmployee(action) {
  yield takeLatest(Types.UPDATE_EMPLOYEE, updateEmployee)
}

export function* watchDeleteEmployee(action) {
  yield takeLatest(Types.DELETE_EMPLOYEE, deleteEmployee)
}

export function* watchGetEmployee(action) {
  yield takeLatest(Types.GET_EMPLOYEE, getEmployee)
}