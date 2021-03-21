import { AxiosResponse } from "axios";
import { MultiRequestItemPayload, ProcurementActOnRequestPayload, UserPayload } from "../types/payloads";
import service from './helpers/web-api'

const servicePath = 'requests'



export function saveItemRequest(payload: MultiRequestItemPayload): Promise<any> {
  console.log('payload', payload)
  return new Promise((resolve, reject) => {
    service({
      url: `/multipleRequestItems`,
      method: 'POST',
      data: payload
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function getAllUsers(): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `${servicePath}`,
      method: 'GET'
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function getUser(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/${servicePath}/${id}`,
      method: 'GET'
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function updateUser(id: number, payload: UserPayload): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/${servicePath}/${id}`,
      method: 'PUT',
      data: payload
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function deleteUser(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/${servicePath}/${id}`,
      method: 'DELETE'
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
} 

export function getUserItemRequests(userId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/requestItems/employees/${userId}`,
      method: 'get'
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function getAllItemRequests(): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/requestItems`,
      method: 'get'
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function getAllDepartmentItemRequests(departmentId: number, employeeId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/requestItems/departments/${departmentId}/employees/${employeeId}`,
      method: 'get'
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function endorseItemRequest(requestId: number, employeeId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/requestItems/${requestId}/employees/${employeeId}/endorse`,
      method: 'put',
      data: {}
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function hodCancelItemRequest(requestId: number, employeeId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/requestItems/${requestId}/employees/${employeeId}/cancel`,
      method: 'put',
      data: {}
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function getEndorsedRequestItems(employeeId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/requestItems/endorsedItems`,
      method: 'get',
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function procurementActOnRequest(requestId: number, employeeId: number,payload: ProcurementActOnRequestPayload): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/procurement/${employeeId}/requestItem/${requestId}`,
      method: 'put',
      data: payload
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function getGeneralManagerRequests(employeeId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/requestItems/employees/${employeeId}/generalManager`,
      method: 'get'
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function approveRequest(requestId: number, employeeId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/requestItems/${requestId}/employees/${employeeId}/approve`,
      method: 'put',
      data: {}
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function cancelRequest(requestId: number, employeeId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/requestItems/${requestId}/employees/${employeeId}/cancel`,
      method: 'put',
      data: {}
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

