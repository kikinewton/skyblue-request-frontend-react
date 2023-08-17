import { serializeQueryParams, serializeQueryParamsNotNull } from "../../../util/common-helper";
import apiRequest from "../apiRequest";
import { RESOURCE_BASE_URL } from "../urls";

export function fetchLocalPurchaseOrders(query) {
  const queryStr = serializeQueryParamsNotNull(query)
  return apiRequest({
    method: "GET",
    url: `/localPurchaseOrders${queryStr}`
  })
}

export function fetchLocalPurchaseOrder(id) {
  return apiRequest({
    method: "GET",
    url: `/localPurchaseOrders/${id}`
  })
}

export function fetchLocalPurchaseOrderDraft(query) {
  const queryStr = serializeQueryParams(query)
  return apiRequest({
    method: "GET",
    url: `/localPurchaseOrderDrafts${queryStr}`
  })
}

export function createLocalPurchaseOrder(payload) {
  return apiRequest({
    method: "POST",
    url: `/localPurchaseOrders`,
    data: payload
  })
}

export function createLocalPurchaseOrderDraft(payload) {
  return apiRequest({
    method: "POST",
    url: `/localPurchaseOrderDrafts`,
    data: payload
  })
}


export function downloadLPODocument({lpoId}) {
  const url = `${RESOURCE_BASE_URL}/localPurchaseOrders/${lpoId}/download`
  const link = document.createElement('a')
  link.href = url
  link.setAttribute("target", "_blank")
  document.body.appendChild(link)
  link.click()
  link.parentNode.removeChild(link)
}

export function fetchLpoDraftsPendingApproval(query) {
  const queryStr = serializeQueryParams(query)
  return apiRequest({
    url: `/localPurchaseOrderDrafts${queryStr}`,
    method: 'GET'
  })
}