import { AxiosResponse } from "axios";
import { UserPayload } from "../types/payloads";
import service from './helpers/web-api'

const servicePath = 'employees'



export function saveUser(payload: UserPayload): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/${servicePath}`,
      method: 'POST',
      data: payload
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function registerEmployee(payload: UserPayload): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/auth/admin/signup`,
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