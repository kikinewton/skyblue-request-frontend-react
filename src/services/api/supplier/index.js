import { serializeQueryParams } from "../../../util/common-helper";
import apiRequest from "../apiRequest";
import { SUPPLIERS_ENDPOINT } from "../urls";

export function getSuppliers(query) {
  console.log('fetch supplie API')
  const queryStr = serializeQueryParams(query)
  return apiRequest({
    method: "GET",
    url: `${SUPPLIERS_ENDPOINT}${queryStr}`
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