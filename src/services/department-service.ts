import { AxiosResponse } from "axios";
import { DepartmentPayload} from "../types/payloads";
import service from './helpers/web-api'

export function saveDepartment(departmentPayload: DepartmentPayload): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: '/departments',
      method: 'POST',
      data: departmentPayload
    })
    .then((response) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function getAllDepartments(): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: '/departments',
      method: 'GET'
    })
    .then((response: AxiosResponse) => {
      
      return resolve(response)
    })
    .catch(error=> reject(error))
  })
}

export function getDepartment(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/departments/${id}`,
      method: 'GET'
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function updateDepartment(id: number, payload: DepartmentPayload): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/departments/${id}`,
      method: 'PUT',
      data: payload
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function deleteDepartment(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/departments/${id}`,
      method: 'DELETE'
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}