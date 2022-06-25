import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/employee/actions'

import {
  getUsers as fetchEmployeesApi,
  deleteUser as deleteEmployeeApi,
  updateUser as updateEmployeeApi,
  saveUser as saveEmployeeApi,
  getUser as getEmployeeApi,
  enableEmployee as enableEmployeeApi,
  disableEmployee as disableEmployeeApi,
  resetEmployeePassword as resetEmployeePasswordApi
} from '../../api/employee'
import openNotification from '../../../util/notification'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'


export function* fetchEmployees(action) {
  try {
    const response = yield call(fetchEmployeesApi, {})
    if(response.status === 'SUCCESS') {
      const responseData = response.data
      yield put(Creators.fetchEmployeesSuccess(responseData))
    } else {
      openNotification('error', 'Fetch users', response.message)
      yield put(Creators.fetchEmployeesFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Employees'
    openNotification('error', 'Login', message)
    yield put(Creators.fetchEmployeesFailure(message))
  }
}

export function* resetEmployeePassword(action) {
  console.log('lets reset employee password')
  try {
    const response = yield call(resetEmployeePasswordApi, action.employeeId)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      yield put(Creators.resetEmployeePasswordSuccess(response?.data))
      openNotification("success", "Reset User Password", "Password reset successfully")
    } else {
      yield put(Creators.resetEmployeePasswordFailure(response.message || ""))
      openNotification("error", "Reset User Password", "Failed to reset user password")
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to reset user password!'
    yield put(Creators.resetEmployeePasswordFailure(message))
    openNotification('error', 'Reset User Password', message)
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
    if(response.status === RESPONSE_SUCCESS_CODE) {
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
    console.log("eror", error)
    const message = (error?.response?.data?.message || "Hey no")
    openNotification('error', 'Create Employee', message)
    yield put(Creators.createEmployeeFailure(message))
  }
}

export function* updateEmployee(action) {
  try {
    const response = yield call(updateEmployeeApi, action.employeeId, action.payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      openNotification('success', 'Update User', 'SUCCESS')
      yield put(Creators.updateEmployeeSuccess(responseData))
      yield put(Creators.fetchEmployees({}))
    } else {
      openNotification('error', 'Update User', response.message)
      yield put(Creators.updateEmployeeFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Employees'
    openNotification('error', 'Update User', message)
    yield put(Creators.updateEmployeeFailure(message))
  }
}

export function* enableEmployee(action) {
  try {
    const response = yield call(enableEmployeeApi, action.employeeId)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      openNotification('success', 'Activate Employee', response.message)
      yield put(Creators.enableEmployeeSuccess(responseData))
      yield put(Creators.fetchEmployees({}))
    } else {
      openNotification('error', 'Activate Employee', response.message)
      yield put(Creators.enableEmployeeFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to Activate Employee'
    openNotification('error', 'Activate Employee', message)
    yield put(Creators.enableEmployeeFailure(message))
  }
}

export function* disableEmployee(action) {
  try {
    const response = yield call(disableEmployeeApi, action.employeeId)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      openNotification('success', 'Deactivate Employee', response.message)
      yield put(Creators.disableEmployeeSuccess(responseData))
      yield put(Creators.fetchEmployees({}))
    } else {
      openNotification('error', 'Deactivate Employee', response.message)
      yield put(Creators.disableEmployeeFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to Deactivate Employee'
    openNotification('error', 'Deactivate Employee', message)
    yield put(Creators.disableEmployeeFailure(message))
  }
}

export function* deleteEmployee(action) {
  console.log('action', action)
  try {
    const response = yield call(deleteEmployeeApi, action.employeeId)
    if(response.status === 'OK') {
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

export function* watchEnableEmployee(action) {
  yield takeLatest(Types.ENABLE_EMPLOYEE, enableEmployee)
}

export function* watchDisableEmployee(action) {
  yield takeLatest(Types.DISABLE_EMPLOYEE, disableEmployee)
}

export function* watchDeleteEmployee(action) {
  yield takeLatest(Types.DELETE_EMPLOYEE, deleteEmployee)
}

export function* watchGetEmployee(action) {
  yield takeLatest(Types.GET_EMPLOYEE, getEmployee)
}

export function* watchResetEmployeePassword(action) {
  yield takeLeading(Types.RESET_EMPLOYEE_PASSWORD, resetEmployeePassword)
}