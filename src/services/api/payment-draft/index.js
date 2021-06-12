import service from '../apiRequest'
import { serializeQueryParams } from '../../../util/common-helper'


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

export function approvePaymentDraft(paymentDraftId, payload) {
  const queryStr = serializeQueryParams(payload)
  return service({
    url: `${path}/${paymentDraftId}/auditorApproval/${queryStr.length > 1 ? queryStr : ""}`,
    method: 'PUT'
  })
}

export function getAllPaymentDrafts(query) {
  const queryString = serializeQueryParams(query)
  return service({
    url: `/paymentDraft/all/${queryString.length > 1 ? queryString : ""}`,
    method: 'GET'
  })
}

export function getAllPayments(query) {
  const queryString = serializeQueryParams(query)
  return service({
    url: `/payments/all/${queryString.length > 1 ? queryString : ""}`,
    method: 'GET'
  })
}