import service from '../apiRequest'
const path = "/goodsReceivedNote"

export function getAllGoodsReceiveNotes() {
  return service({
    url: `${path}`,
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