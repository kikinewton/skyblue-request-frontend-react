import apiRequest from "../apiRequest";
import { SUPPLIERS_ENDPOINT } from "../urls";

export function getSuppliers() {
  console.log('fetch supplie API')
  return apiRequest({
    method: "GET",
    url: `${SUPPLIERS_ENDPOINT}`
  })
}

export function getSupplier(supplierId) {
  return apiRequest({
    method: "GET",
    url: `${SUPPLIERS_ENDPOINT}${supplierId}`
  })
}

export function saveSupplier(data) {
  return apiRequest({
    method: "POST",
    url: `${SUPPLIERS_ENDPOINT}`,
    data
  })
}

export function updateSupplier(supplierId, data) {
  return apiRequest({
    method: "PUT",
    url: `${SUPPLIERS_ENDPOINT}${supplierId}`,
    data
  })
}

export function deleteSupplier(supplierId) {
  return apiRequest({
    method: "DELETE",
    url: `${SUPPLIERS_ENDPOINT}${supplierId}`
  })
}