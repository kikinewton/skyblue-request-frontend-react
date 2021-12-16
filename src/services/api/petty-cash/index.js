import service from '../apiRequest'
import { serializeQueryParams } from '../../../util/common-helper'
import { FETCH_PETTY_CASH_REQUEST_TYPES } from '../../../util/request-types'

export function savePettyCashRequest(payload){
  return service({
    url: `/bulkFloatOrPettyCash/PETTY_CASH`,
    method: 'POST',
    data: payload
  })
}

export function fetchMyPettyCashRequests(query) {
  const queryStr = serializeQueryParams(query)
  return service({
    url: `/pettyCashForEmployee${queryStr}`,
    method: 'GET',
  })
}

export function fetchAllPettyCashRequests(query) {
  const queryStr = serializeQueryParams(query)
  switch(query.requestType) {
    case FETCH_PETTY_CASH_REQUEST_TYPES.HOD_PENDING_ENDORSEMENT_REQUESTS:
      return service({url: `/pettyCashByDepartment${queryStr}`, method: "GET"})
    default:
      return service({url: `/pettyCashRequests`, method: "GET"})
  }
}

export function deletePettyCashRequest(id) {
  return service({
    url: `/pettyCash/${id}`,
    method: 'DELETE',
  })
}

export function updatePettyCashRequest(id, payload) {
  return service({
    url: `/pettyCash/${id}`,
    method: 'PUT',
    data: payload
  })
}

export function updateBulkPettyCashRequest(payload) {
  const { statusChange, items } = payload
  return service({
    url: `/bulkPettyCash/${statusChange}`,
    method: "PUT",
    data: items
  })
}
