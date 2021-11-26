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
      return service({url: `/bulkFloats/COMMENT`, method: "PUT", data: payload?.bulkFloat})
    case UPDATE_FLOAT_REQUEST_TYPES.HOD_CANCEL:
      return service({url: `/bulkFloats/CANCEL`, method: "PUT", data: payload?.bulkFloat})
    default:
      return service({url: `/bulkFloats`, method: "PUT", data: payload})
  }
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
  console.log('fetch floats api', query)
  const queryStr = serializeQueryParams(query)
  switch(query.requestType) {
    case FETCH_FLOAT_REQUEST_TYPES.HOD_PENDING_ENDORSEMENT_REQUESTS:
      return service({url: `/floatsForDepartment`, method: "GET"})
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
