import { serializeQueryParams, serializeQueryParamsNotNull } from '../../../util/common-helper'
import service from '../apiRequest'
import { BASE_URL } from '../urls'
const path = "/goodsReceivedNotes"

export function getAllGoodsReceiveNotes(query) {
  console.log()
  const qs = serializeQueryParams(query)
  return service({
    url: `${path}${qs}`,
    method: 'GET'
  })
}

export function getGoodsReceiveNoteById(id) {
  return service({
    url: `${path}/${id}`,
    method: 'GET'
  })
}

export function getGoodsReceiveNoteByInvoice(query) {
  return service({
    url: `${path}/invoices/query.invoiceNo`,
    method: 'GET'
  })
}

export function getGoodsReceiveNoteWithoutGRN(query) {
  return service({
    url: `${path}/LPOWithoutGRN`,
    method: 'GET'
  })
}

export function getGoodsReceiveNoteBySupplier(query) {
  return service({
    url: `${path}/suppliers/${query.supplierId}`
  })
}

export function createGoodsReceiveNote(payload) {
  // const data = {
  //   invoice: payload.invoice,
  //   invoiceAmountPayable: payload.invoiceAmountPayable,
  //   lpo: payload.lpo,
  //   supplier: payload.supplier
  // }
  return service({
    url: `/goodsReceivedNotes`,
    method: 'POST',
    data: payload
  })
}

export function updateGoodsReceiveNote(id, payload) {
  
  if(payload?.paymentAdvice) {
    const queryStr = serializeQueryParams({paymentAdvice: payload?.paymentAdvice, paymentDate: payload?.paymentDate})
    return service({
      url: `/goodsReceivedNotes/${id}${queryStr}`,
      method: "PUT",
      data: payload
    })
  } else {
    return service({
      url: `/goodsReceivedNotes/${id}/${payload.updateType}`,
      method: 'PUT',
      data: payload
    })
  }
}

export function getLpoDocument(lpoId) {
  return service({
    url: `/document/lpo/${lpoId}`,
    method: 'GET'
  })
}

export function downloadLPODocument(lpoId) {
  const url = `${BASE_URL}/document/lpo/${lpoId}`
  const link = document.createElement('a')
  link.href = url
  link.setAttribute("target", "_blank")
  document.body.appendChild(link)
  link.click()
  link.parentNode.removeChild(link)
}

export function createFloatGrn(payload) {
  return service({
    url: `goodsReceivedNotes/floats`,
    method: 'POST',
    data: payload
  })
}

export function updateFloatGrn(id, payload) {
  return service({
    url: `goodsReceivedNotes/floats/${id}`,
    method: 'PUT',
    data: payload
  })
}

export function fetchAllFloatGrns(query) {
  const queryStr = serializeQueryParamsNotNull(query)
  return service({
    url: `goodsReceivedNotes`,
    method: 'GET'
  })
}

