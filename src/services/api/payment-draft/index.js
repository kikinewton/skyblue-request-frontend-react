import service from '../apiRequest'
import { FETCH_REQUEST_TYPES, UPDATE_REQUEST_TYPES } from '../../../util/request-types'


const path = "/paymentDraft"


export function savePaymentDraft(payload) {
  return service({
    url: `${path}`,
    method: 'POST',
    data: payload
  })
}

export function getPaymentDraft(query) {
  return service({
    url: `${path}/${query.paymentDraftId}`,
    method: 'GET',
  })
}

export function updatePaymentDraft(payload) {
  return service({
    url: `${path}/${payload.paymentDraftId}`,
    method: 'POST',
    data: payload
  })
}

export function approvePaymentDraft(payload) {
  return service({
    url: `${path}/${payload.paymentDraftId}/auditorApproval`,
    method: 'PUT',
    data: payload
  })
}