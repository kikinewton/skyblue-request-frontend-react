import service from '../apiRequest'
import { serializeQueryParams } from '../../../util/common-helper'

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
  return service({
    url: `/pettyCash${queryStr}`,
    method: 'GET',
  })
}

export function deletePettyCashRequest(id) {
  return service({
    url: `/floats/${id}`,
    method: 'DELETE',
  })
}
