import { serializeQueryParams } from '../../../util/common-helper'
import service from '../apiRequest'
import { BASE_URL } from '../urls'
const path = "/goodsReceivedNote"

export function getAllGoodsReceiveNotes(query) {
  const qs = serializeQueryParams(query)
  return service({
    url: `${path}/${qs}`,
    method: 'GET'
  })
}

export function getGoodsReceiveNoteById(query) {
  return service({
    url: `${path}/${query.goodsReceivedNoteId}`,
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
    url: `/receiveGoods`,
    method: 'POST',
    data: payload
  })
}

export function updateGoodsReceiveNote(payload) {
  const data = {
    invoice: payload.invoice,
    invoiceAmountPayable: payload.invoiceAmountPayable,
    lpo: payload.lpo,
    supplier: payload.supplier
  }
  return service({
    url: `${path}/${payload.goodsReceiveNoteId}`,
    method: 'POST',
    data
  })
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