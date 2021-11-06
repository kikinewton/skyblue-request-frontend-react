import service from '../apiRequest'
import { FETCH_REQUEST_TYPES, UPDATE_REQUEST_TYPES } from '../../../util/request-types'
import { serializeQueryParams } from '../../../util/common-helper'
import { FETCH_FLOAT_TYPES } from '../../../util/float-request-types'

export function saveFloatRequest(payload){
  return service({
    url: `/bulkFloatOrPettyCash/FLOAT`,
    method: 'POST',
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
  console.log('fetch floats api', query)
  const queryStr = serializeQueryParams(query)
  switch(query.requestType) {
    case FETCH_FLOAT_TYPES.HOD_PENDING_ENDORSEMENT:
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
