import { serializeQueryParams } from "../../../util/common-helper";
import apiRequest from "../apiRequest";
import { RESOURCE_BASE_URL, SUPPLIERS_ENDPOINT } from "../urls";

export function getSuppliers(query) {
  const queryStr = serializeQueryParams(query)
  return apiRequest({
    method: "GET",
    url: `${SUPPLIERS_ENDPOINT}${queryStr}`
  })
}

export function getSupplier(supplierId) {
  return apiRequest({
    method: "GET",
    url: `${SUPPLIERS_ENDPOINT}/${supplierId}`
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
    url: `${SUPPLIERS_ENDPOINT}/${supplierId}`,
    data
  })
}

export function deleteSupplier(supplierId) {
  return apiRequest({
    method: "DELETE",
    url: `${SUPPLIERS_ENDPOINT}/${supplierId}`
  })
}

export function downloadRfqForSupplier({supplierId}) {
  const url = `${RESOURCE_BASE_URL}/procurement/generateRequestListForSupplier/suppliers/${supplierId}`
  const link = document.createElement('a')
  link.href = url
  link.setAttribute("target", "_blank")
  document.body.appendChild(link)
  link.click()
  link.parentNode.removeChild(link)
}

export function generateRfqForSupplierAndShare({supplierId}) {
  return apiRequest({
    url: `/procurement/sendRequestListForSupplier/suppliers/${supplierId}`,
    method: "GET"
  })
}