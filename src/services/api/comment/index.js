import service from '../apiRequest'

export function fetchComments(query) {
  return service({
    url: `/comments`,
    method: "GET",
  })
}

export function createComment(procurementType, payload) {
  return service({
    url: `/comments/${procurementType}`,
    method: "POST",
    data: payload
  })
}

export function fetchUserComments(query) {
  return service({
    url: `/comments/unread?commentType=${query.commentType}`
  })
}
