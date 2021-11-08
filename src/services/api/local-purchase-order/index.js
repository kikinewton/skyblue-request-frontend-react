import { serializeQueryParams } from "../../../util/common-helper";
import apiRequest from "../apiRequest";
import { QUOTATION_ENDPOINT } from "../urls";

export function fetchLocalPurchaseOrders(query) {
  console.log('fetch supplie API')
  const queryStr = serializeQueryParams(query)
  return apiRequest({
    method: "GET",
    url: `/lpo${queryStr}`
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