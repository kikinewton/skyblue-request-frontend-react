import { AxiosResponse } from "axios";
import { SupplierPayload, UserPayload } from "../types/payloads";
import service from './helpers/web-api'

const servicePath = 'suppliers'

export function saveSupplier(payload: SupplierPayload): Promise<any> {
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

export function getAllSuppliers(): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `${servicePath}`,
      method: 'GET'
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function getSupplier(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/${servicePath}/${id}`,
      method: 'GET'
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}

export function updateSupplier(id: number, payload: SupplierPayload): Promise<any> {
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

export function deleteSupplier(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: `/${servicePath}/${id}`,
      method: 'DELETE'
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error=> reject(error))
  })
}