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
      return service({url: `/pettyCashByDepartment`, method: "GET"})
    default:
      return service({url: `/pettyCashRequests`, method: "GET"})
  }
}

export function deletePettyCashRequest(id) {
  return service({
    url: `/floats/${id}`,
    method: 'DELETE',
  })
}
