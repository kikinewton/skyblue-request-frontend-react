import service from '../apiRequest'
import { serializeQueryParams } from '../../../util/common-helper'


const path = "/paymentDraft"


export function createPaymentDraft(payload) {
  return service({
    url: `${path}`,
    method: 'POST',
    data: payload
  })
}

export function fetchPaymentDraft(query) {
  return service({
    url: `${path}/${query.paymentDraftId}`,
    method: 'GET',
  })
}

export function updatePaymentDraft(id, payload) {
  if(payload.approval) {
    return service({
      url: `${path}/${id}/approval`,
      method: 'PUT'
    })
  } else {
    return service({
      url: `${path}/${payload.paymentDraftId}`,
      method: 'POST',
      data: payload
    })
  }
  
}

export function fetchPaymentDrafts(query) {
  const queryString = serializeQueryParams(query)
  return service({
    url: `/paymentDrafts${queryString}`,
    method: 'GET'
  })
}


export function approvePaymentDraft(paymentDraftId, payload) {
  const queryStr = serializeQueryParams(payload)
  return service({
    url: `${path}/${paymentDraftId}/auditorApproval/${queryStr.length > 1 ? queryStr : ""}`,
    method: 'PUT'
  })
}

export function fetchPayments(query) {
  const queryString = serializeQueryParams(query)
  return service({
    url: `/payments${queryString}`,
    method: 'GET'
  })
}

export function fetchPayment(id) {
  return service({
    url: `/payments/${id}`,
    method: 'GET'
  })
}

export function createPayment(payload) {
  return service({
    url: `/payments`,
    method: 'POST',
    data: payload
  })
}

export function updatePayment(id, payload) {
  return service({
    url: `/payments/${id}`,
    method: 'PUT',
    data: payload
  })
}