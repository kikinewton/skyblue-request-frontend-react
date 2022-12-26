import service from '../apiRequest'
import { ALL_QUOTATIONS, QUOTATIONS_BY_SUPPLIER, QUOTATIONS_WITHOUT_DOCUMENT, QUOTATIONS_WITHOUT_DOCUMENT_TEST, NOT_LINKED_TO_LPO, QUOTATIONS_WITHOUT_DOCUMENT_TEST_FOR_UNREGISTERED, LINKED_TO_LPO, UNDER_REVIEW }
 from '../../../util/quotation-types'
import { serializeQueryParams, serializeQueryParamsNotNull } from '../../../util/common-helper'


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
    url: `${path}/supplierRequest?registered=true`,
    method: 'GET'
  })
}

export function getAllQuotationsWithoutDocumentsTestForUnregistered(query) {
  console.log("Lets fetch for unregistered api----------------->")
  return service({
    url: `${path}/supplierRequest?registered=false`,
    method: 'GET'
  })
}

export function getQuotations(query) {
  return service({
    url:  `${path}/all`,
    method: 'GET'
  })
}

export function getQuotationBySupplier(query) {
  return service({
    url: `${path}/suppliers/${query.supplierId}`
  })
}


export function getAllQuotations(query) {
  const { requestType } = query
  const queryStr = serializeQueryParamsNotNull(query);
  switch(requestType) {
    case ALL_QUOTATIONS:
      return service({url: `/quotations${queryStr}`, method: "GET"})
    case QUOTATIONS_WITHOUT_DOCUMENT:
      return getAllQuotationsWithoutDocuments()
    case QUOTATIONS_WITHOUT_DOCUMENT_TEST:
      return getAllQuotationsWithoutDocumentsTest()
    case QUOTATIONS_WITHOUT_DOCUMENT_TEST_FOR_UNREGISTERED:
      return getAllQuotationsWithoutDocumentsTestForUnregistered()
    case QUOTATIONS_BY_SUPPLIER:
      return getQuotationBySupplier(query)
    case NOT_LINKED_TO_LPO:
      return service({url: `/quotations?linkedToLpo=${false}`, method: "GET"})
    case LINKED_TO_LPO:
      return service({url: `/quotations?linkedToLpo=${true}`, method: "GET"})
    case UNDER_REVIEW:
      return service({url: `/quotations?underReview=${true}`, method: "GET"})
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

export function generateQuotationForUnregisteredSupplier(payload) {
  return service({
    url: `/quotations/generateQuoteForSupplier`,
    method: 'POST',
    data: payload
  })
}

// export function createQuotation({ file, userId, supplierId }) {
//   let fd = new FormData()
//   fd.append("file", file)
//   return service({
//     url: `/quotations/suppliers/${supplierId}?employeeId=${userId}`,
//     method: 'POST',
//     data: fd
//   })
// }

export function createQuotation(payload) {
  return service({
    url: `/quotations`,
    method: 'POST',
    data: payload
  })
}


export function fetchQuotations(query) {
  const queryStr = serializeQueryParams(query);
  return service({
    url: `/quotations${queryStr}`,
    method: 'GET'
  })
}


export function fetchRequestItemQuotations(requestItemId) {
  return service({
    url: `/requestItem/`
  })
}
