import service from '../apiRequest'
import { FETCH_FLOAT_REQUEST_TYPES, UPDATE_FLOAT_REQUEST_TYPES } from '../../../util/request-types'
import { serializeQueryParams } from '../../../util/common-helper'

export function saveFloatRequest(payload){
  return service({
    url: `/bulkFloatOrPettyCash/FLOAT`,
    method: 'POST',
    data: payload
  })
}

export function updateFloatRequest(payload){
  const { updateType } = payload
  console.log('update float api', updateType, 'compare', UPDATE_FLOAT_REQUEST_TYPES.HOD_CANCEL)
  switch(updateType) {
    case UPDATE_FLOAT_REQUEST_TYPES.HOD_ENDORSE:
      return service({url: `/bulkFloats/ENDORSE`, method: "PUT", data: payload?.bulkFloat})
    case UPDATE_FLOAT_REQUEST_TYPES.HOD_COMMENT:
      return service({url: `/comment`, method: "POST", data: payload?.bulkFloat})
    case UPDATE_FLOAT_REQUEST_TYPES.HOD_CANCEL:
      return service({url: `/bulkFloats/CANCEL`, method: "PUT", data: payload?.bulkFloat})
    case UPDATE_FLOAT_REQUEST_TYPES.APPROVE:
      return service({url: `/bulkFloats/APPROVE`, method: "PUT", data: payload?.bulkFloat})
    default:
      return service({url: `/bulkFloats`, method: "PUT", data: payload})
  }
}

export function updateSingleFloatRequest(id, payload){
  return service({
    url: `/floats/${id}`,
    method: "PUT",
    data: payload
  })
}



export function fetchMyFloatRequests(query) {
  const queryStr = serializeQueryParams(query)
  return service({
    url: `/floatsForEmployee${queryStr}`,
    method: 'GET',
  })
}

export function fetchAllFloatRequests(query) {
  const queryStr = serializeQueryParams(query)
  return service({
    url: `/float${queryStr}`,
    method: 'GET',
  })
}

export function fetchFloatRequests(query) {
  switch(query.requestType) {
    case FETCH_FLOAT_REQUEST_TYPES.HOD_PENDING_ENDORSEMENT_REQUESTS:
      return service({url: `/floatsForDepartment`, method: "GET"})
    case FETCH_FLOAT_REQUEST_TYPES.PENDING_APPROVAL:
      return service({url: `/floats?endorsement=ENDORSED`, method: "GET"})
    case FETCH_FLOAT_REQUEST_TYPES.PENDING_FUND_ALLOCATION:
      return service({url: `/floats?approval=APPROVED`, method: "GET"})
    case FETCH_FLOAT_REQUEST_TYPES.PENDING_GRN:
      return service({url: `/floats?awaitingFunds=true`, method: "GET"})
    case FETCH_FLOAT_REQUEST_TYPES.PENDING_DOCUMENT_UPLOAD:
      return service({url: `/floats?receivedFundsAndNotRetired=true`, method: "GET"})
    case FETCH_FLOAT_REQUEST_TYPES.GM_PENDING_RETIRE:
      return service({url: `/floats?gmRetire=true`, method: "GET"})
    case FETCH_FLOAT_REQUEST_TYPES.AUDITOR_PENDING_RETIRE:
      return service({url: `/floats?auditorRetire=true`, method: "GET"})
    case FETCH_FLOAT_REQUEST_TYPES.MY_AWAITING_RETIREMENT:
      return service({url: `/floats?awaitingDocument=true`, method: "GET"})
    case FETCH_FLOAT_REQUEST_TYPES.CLOSE_RETIREMENT:
      return service({url: `/floats?closeRetirement=true`, method: "GET"})
    default:
      return fetchAllFloatRequests(query)
  }
}

export function deleteFloatRequest(id) {
  return service({
    url: `/floats/${id}`,
    method: 'POST'
  })
}

export function allocateFundsToFloat(id, payload) {
  return service({
    url: `/floatOrders/${id}/receiveFunds`,
    method: 'PUT',
    data: payload
  })
}

export function fetchFloatOrders(query) {
  const queryStr = serializeQueryParams(query)
  return service({
    url: `/floatOrders${queryStr}`,
    method: "GET"
  })
}

export function createFloatOrder(payload) {
  return service({
    url: `/floatOrders`,
    method: "POST",
    data: payload
  })
}

export function updateFloatOrder(id, payload) {
  return service({
    url: `/floatOrders/${id}`,
    method: "PUT",
    data: payload
  })
}

export function fetchFloatOrder(id) {
  return service({
    url: `/floatOrders/${id}`,
    method: "GET"
  })
}

export function addItems(id, payload) {
  return service({
    url: `/floatOrders/${id}/addItems`,
    method: "PUT",
    data: payload
  })
}

export function updateStatus(id, status) {
  return service({
    url: `/floatOrders/${id}?statusChange=${status}`,
    method: "PUT"
  })
}

export function retireFloatOrder(id, payload) {
  console.log('api payload', payload)
  return service({
    url: `/floatOrders/${id}/supportingDocument`,
    method: "PUT",
    data: payload?.documents
  })
}

export function closeloatOrder(id, payload) {
  return service({
    url: `/floatOrders/${id}/close`,
    method: "PUT",
    data: payload
  })
}