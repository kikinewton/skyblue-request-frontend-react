import service from '../apiRequest'
import { serializeQueryParams, serializeQueryParamsNotNull } from '../../../util/common-helper'
import { FETCH_REQUEST_TYPES, UPDATE_REQUEST_TYPES } from '../../../util/request-types'

export function fetchMyRequests(query) {
  const queryStr = serializeQueryParamsNotNull(query)
  return service({
    url: `/requestItemsForEmployee${queryStr}`,
    method: 'get'
  })
}

export function fetchHODPendingReviewRequests(query) {
  return service({
    url: `/requestItemsByDepartment?toBeReviewed=${true}`,
    method: 'get'
  })
}

export function getRequestById(id) {
  return service({
    url: `/requestItems/${id}`,
    method: 'get'
  })
}

export function saveRequest(payload){
  return service({
    url: `/multipleRequestItems`,
    method: 'POST',
    data: payload
  })
}


export function getUserItemRequests(userId) {
  return service({
      url: `/requestItemsForEmployee`,
      method: 'get'
    })
}

export function getAllItemRequests(query) {
  const queryStr = serializeQueryParams(query)
  return service({
      url: `/requestItems/${queryStr}`,
      method: 'get'
    })
}

export function getRequestItemStatus(id) {
  return service({
    url: `/requestItems/${id}/status`,
    method: 'get'
  })
}

export function getAllDepartmentItemRequests() {
  console.log("lets fetch department request")
  return service({
      url: `/requestItemsByDepartment`,
      method: 'get'
    })
}

export function endorseItemRequest(requestId, employeeId){
  return service({
      url: `/requestItems/${requestId}/employees/${employeeId}/endorse`,
      method: 'put',
      data: {}
    })
}


//HOD UPDATE
export function hodEndorseBulkItemRequest(data) {
  console.log('hey am heere')
  return service({
    url: `/requestItems/HOD_ENDORSE`,
    method: 'put',
    data
  })
}
export function hodCancelBulkRequest(payload) {
  return service({
    url: `/requestItems/bulkCancel`,
    method: 'put',
    data: payload
  })
}

export function hodRejectBulkRequest(payload) {
  return service({
      url: `/requestItems/bulkCancel`,
      method: 'put',
      data: payload
    })
}

export function approveBulkRequests(data) {
  return service({
      url: `/requestItems/bulkApproval`,
      method: 'put',
      data
    })
}



export function getEndorsedRequestItems(employeeId) {
  return service({
      url: `/requestItemsByDepartment/endorsed`,
      method: 'get',
    })
}

export function procurementActOnRequest(requestId, employeeId, payload) {
  return service({
      url: `/procurement/${employeeId}/requestItem/${requestId}`,
      method: 'put',
      data: payload
    })
}

export function getGeneralManagerRequests(employeeId) {
  return service({
      url: `/requestItems/employees/${employeeId}/generalManager`,
      method: 'get'
    })
}

export function approveRequest(requestId, employeeId) {
  return service({
      url: `/requestItems/${requestId}/employees/${employeeId}/approve`,
      method: 'put',
      data: {}
    })
}

export function cancelRequest(requestId, employeeId) {
  return service({
      url: `/requestItems/${requestId}/employees/${employeeId}/cancel`,
      method: 'put',
      data: {}
    })
}

export function addSuppliersToRequest(data) {
  return service({
      url: `/procurement/assignSuppliers/requestItems`,
      method: 'put',
      data
    })
}

export function getEndorsedRequestsWithMultipleSuppliers() {
  return service({
      url: `/procurement/endorsedItemsWithMultipleSuppliers`,
      method: 'GET'
    })
}

export function getEndorsedItemsWithMultipleSuppliers() {
  return service({
      url: `/procurement/endorsedItemsWithMultipleSuppliers`,
      method: 'GET'
    })
}

export function procurementUpdateMultiReuqestSupplier(data) {
  return service({
      url: `/procurement/requestItems/multipleInfo`,
      method: 'PUT',
      data
    })
}



export function getEndorsedItemsWithSupplier(query) {
  return service({
    url: `/procurement/endorsedItemsWithSupplierId/${query?.supplierId}`,
    method: 'GET'
  })
}


export function getAllEndorsedRequestsByDepartment() {
  return service({
      url: `/procurement/endorsedItemsWithMultipleSuppliers`,
      method: 'GET'
    })
}

export function getApprovedRequests() {
  return service({
      url: `/requestItems/approvedItems`,
      method: 'GET'
    })
}

export function getRequestsBySupplier() {
  return service({
    url: `/requestItems/`
  })
}

export function updateRequest(data) {
  console.log("API PAYLOAD", data)
  const { updateType, payload } = data
  console.log('----------->update request payload', data)
  switch (updateType) {
    case UPDATE_REQUEST_TYPES.HOD_ENDORSE:
      return service({url: '/requestItems/bulkEndorse', method: "PUT", data: payload})
    case UPDATE_REQUEST_TYPES.HOD_CANCEL:
      return service({url: '/requestItems/updateStatus/CANCEL', method: "PUT", data: payload})
    case UPDATE_REQUEST_TYPES.HOD_COMMENT:
      return service({url: '/requestItems/updateStatus/COMMENT', method: "PUT", data: payload})
    case UPDATE_REQUEST_TYPES.HOD_REVIEW:
      return service({url: '/requestItems/updateStatus/HOD_REVIEW', method: "PUT", data: payload})
    case UPDATE_REQUEST_TYPES.GM_APPROVE:
      // return service({url: '/requestItems/updateStatus/APPROVE', method: "PUT", data: payload})
      return service({url: '/requestItems/bulkApprove', method: "PUT", data: payload})
    case UPDATE_REQUEST_TYPES.HOD_REJECT:
      return hodRejectBulkRequest(payload)
    case UPDATE_REQUEST_TYPES.PROCUREMENT_PENDING_ASSIGN_SUPPLIER_REQUESTS:
      return addSuppliersToRequest(payload)
    case UPDATE_REQUEST_TYPES.UPDATE_UNIT_PRICE:
      return service({url: `/requestItems/updateRequestItems`, method: 'PUT', data: data.payload})
    case UPDATE_REQUEST_TYPES.APPROVE:
      return service({url: `/requestItems/bulkApproval`, method: 'PUT', data: payload})
    default:
      break;
  }
}

export function updateSingleRequest(id, payload) {
  return service({url: `/requestItems/${id}`, method: "PUT", data: payload})
}

export function resolveComment(reqId, payload) {
  return service({
    url: `/requestItems/${reqId}/resolveComment`,
    method: 'PUT',
    data: payload
  })
}

export function fetchRequests(query) {
  const { requestType } = query
  switch (requestType) {
    case FETCH_REQUEST_TYPES.MY_REQUESTS:
      return getUserItemRequests(query)
    case FETCH_REQUEST_TYPES.HOD_PENDING_ENDORSEMENT_REQUESTS:
      return getAllDepartmentItemRequests(query)
    case FETCH_REQUEST_TYPES.HOD_PENDING_REVIEW:
      return service({url: `/requestItemsByDepartment?toBeReviewed=${true}`})
    case FETCH_REQUEST_TYPES.PROCUREMENT_PENDING_ASSIGN_SUPPLIER_REQUESTS:
      return service({url: "/requestItems/endorsed", method: "GET"})
    case FETCH_REQUEST_TYPES.DOCUMENTED_REQUESTS_BY_SUPPLIER:
      return getEndorsedItemsWithSupplier(query)
    case FETCH_REQUEST_TYPES.ENDORSED_REQUESTS:
      return getEndorsedRequestItems()
    case FETCH_REQUEST_TYPES.GENERAL_MANAGER_PENDING_APPROVE_REQUESTS:
      return service({ url: `/requestItems?toBeApproved=${true}`, method: "GET" })
    case FETCH_REQUEST_TYPES.DEPARTMENT_ENDORSED_REQUESTS:
      return service({ url: `/requestItems/departmentHistory`, method: "GET" })
    case FETCH_REQUEST_TYPES.ALL_APPROVED_REQUESTS:
      return service({ url: `/requestItems?approved=true`, method: "GET" })
    case FETCH_REQUEST_TYPES.PENDING_QUOTATION:
      return service({url: `/requestItems?`, method: "GET"})
    default: {
      console.log('In default api call')
      return getAllItemRequests(query);
    }
      
  }
}

export function getRequestDocs(id) {
  return service({
    url: `/requestDocuments/requestItems/${id}`,
    method: 'GET'
  })
}


export function fetchAllRequests(query) {
  const queryStr = serializeQueryParamsNotNull(query)
  return service({
    url: `/requestItems${queryStr}`,
    method: 'GET'
  })
}


