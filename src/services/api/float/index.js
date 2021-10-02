import service from '../apiRequest'
import { FETCH_REQUEST_TYPES, UPDATE_REQUEST_TYPES } from '../../../util/request-types'
import { serializeQueryParams } from '../../../util/common-helper'

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

export function deleteFloatRequest(id) {
  return service({
    url: `/floats/${id}`,
    method: 'POST'
  })
}
