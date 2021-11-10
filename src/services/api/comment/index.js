import service from '../apiRequest'

export function fetchComments(query) {
  return service({
    url: `/comment`,
    method: "GET",
  })
}

export function createComment(procurementType, payload) {
  return service({
    url: `/comment/${procurementType}`,
    method: "POST",
    data: payload
  })
}