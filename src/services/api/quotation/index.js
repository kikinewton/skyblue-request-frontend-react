import service from '../apiRequest'
import { ALL_QUOTATIONS, QUOTATIONS_WITHOUT_DOCUMENT, QUOTATIONS_WITHOUT_DOCUMENT_TEST } from '../../../util/quotation-types'


const path = "/quotations"
export function assignRequestDocument(payload){
  return service({
    url: `${path}/${payload.quotationId}/assignRequestDocument/${payload.documentId}`,
    method: 'POST',
    data: payload
  })
}

export function assignRequestDocumentToSupplier(payload){
  return service({
    url: `/suppliers/${payload.supplierId}/assignRequestDocument/${payload.documentId}`,
    method: 'POST',
    data: payload
  })
}

export function getAllQuotationsWithoutDocuments(query) {
  return service({
    url: `${path}/withoutDocument`,
    method: 'GET'
  })
}

export function getAllQuotationsWithoutDocumentsTest(query) {
  return service({
    url: `${path}/supplierRequest`,
    method: 'GET'
  })
}

export function getQuotations(query) {
  return service({
    url:  `${path}/all`,
    method: 'GET'
  })
}


export function getAllQuotations(query) {
  console.log('query api', query)
  const { requestType } = query
  switch(requestType) {
    case ALL_QUOTATIONS:
      return getQuotations()
    case QUOTATIONS_WITHOUT_DOCUMENT:
      return getAllQuotationsWithoutDocuments()
    case QUOTATIONS_WITHOUT_DOCUMENT_TEST:
      return getAllQuotationsWithoutDocumentsTest()
    default:
      return getQuotations()
  }
}

export function updateQuotation(quotationId, payload) {
  console.log('payload', payload)
  return service({
    url: `${path}/${quotationId}/assignRequestDocument/${payload.documentId}`,
    method: 'PUT',
    data: payload
  })
}

export function createQuotation({ file, userId, supplierId }) {
  let fd = new FormData()
  fd.append("file", file)
  return service({
    url: `/quotations/suppliers/${supplierId}?employeeId=${userId}`,
    method: 'POST',
    data: fd
  })
}