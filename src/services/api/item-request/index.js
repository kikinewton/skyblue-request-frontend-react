import service from '../apiRequest'
import { FETCH_REQUEST_TYPES, UPDATE_REQUEST_TYPES } from '../../../util/request-types'


export function saveRequest(payload){
  return service({
    url: `/multipleRequestItems`,
    method: 'POST',
    data: payload
  })
}


export function getUserItemRequests(userId) {
  return service({
      url: `/requestItems/employees/${userId}`,
      method: 'get'
    })
}

export function getAllItemRequests() {
  return service({
      url: `/requestItems`,
      method: 'get'
    })
}

export function getAllDepartmentItemRequests(departmentId, employeeId) {
  return service({
      url: `/requestItems/departments/${departmentId}/employees/${employeeId}`,
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

export function endorseBulkItemRequest(authUserId, data) {
  return service({
      url: `/requestItems/bulkEndorse/employees/${authUserId}`,
      method: 'put',
      data
    })
}

export function approveBulkRequests(data) {
  return service({
      url: `/requestItems/bulkApproval`,
      method: 'put',
      data
    })
}

export function cancelBulkRequest(payload) {
  return service({
      url: `/requestItems/bulkCancel`,
      method: 'put',
      data: payload
    })
}

export function getEndorsedRequestItems(employeeId) {
  return service({
      url: `/requestItems/endorsedItems`,
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



export function getEndorsedItemsWithSupplier(supplierId) {
  return service({
    url: `/procurement/endorsedItemsWithSupplierId/${supplierId}`,
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
  const { updateType, userId, payload } = data
  switch (updateType) {
    case UPDATE_REQUEST_TYPES.ENDORSE:
      return endorseBulkItemRequest(userId, payload)
    case UPDATE_REQUEST_TYPES.CANCEL:
      return cancelBulkRequest(payload)
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

export function fetchRequests(query) {
  const { requestType, userId } = query
  switch (requestType) {
    case FETCH_REQUEST_TYPES.MY_REQUESTS:
      return getUserItemRequests(query.userId)
    case FETCH_REQUEST_TYPES.HOD_PENDING_REQUEST:
      return getAllDepartmentItemRequests(query.departmentId, query.userId)
    case FETCH_REQUEST_TYPES.PROCUREMENT_PENDING_ASSIGN_SUPPLIER_REQUESTS:
      return getEndorsedRequestItems(userId)
    case FETCH_REQUEST_TYPES.DOCUMENTED_REQUESTS_BY_SUPPLIER:
      return getEndorsedItemsWithSupplier(query.supplierId)
    case FETCH_REQUEST_TYPES.ENDORSED_REQUESTS:
      return getEndorsedRequestItems(query.userId)
    default:
      return getAllItemRequests();
  }
}


