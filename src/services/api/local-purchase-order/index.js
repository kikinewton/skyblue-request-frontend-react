import { serializeQueryParams } from "../../../util/common-helper";
import apiRequest from "../apiRequest";
import { BASE_URL, QUOTATION_ENDPOINT } from "../urls";

export function fetchLocalPurchaseOrders(query) {
  console.log('fetch supplie API', query)
  const queryStr = serializeQueryParams(query)
  return apiRequest({
    method: "GET",
    url: `/localPurchaseOrders${queryStr}`
  })
}


export function createLocalPurchaseOrder(payload) {
  console.log('create LPO API')
  return apiRequest({
    method: "POST",
    url: `/localPurchaseOrders`,
    data: payload
  })
}


export function downloadLPODocument({lpoId}) {
  const url = `${BASE_URL}/localPurchaseOrders/${lpoId}/download`
  const link = document.createElement('a')
  link.href = url
  link.setAttribute("target", "_blank")
  document.body.appendChild(link)
  link.click()
  link.parentNode.removeChild(link)
}