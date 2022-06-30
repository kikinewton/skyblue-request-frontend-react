import service from '../apiRequest'

export function fetchComments(query) {
  return service({
    url: `/comments`,
    method: "GET",
  })
}

export function createComment(commentType, itemId, payload) {
  return service({
    url: `/comments/${commentType}/${itemId}`,
    method: "POST",
    data: payload
  })
}

export function createCommentWithCancel(procurementType, payload) {
  return service({
    url: `/comments/${procurementType}/cancel?itemId=${payload?.itemId}`,
    method: "PUT",
    data: payload
  })
}

export function fetchUserComments(query) {
  return service({
    url: `/comments/unread?commentType=${query.commentType}`
  })
}

export function fetchRequestComment(itemId, commentType) {
  return service({
    url: `/comments/${itemId}/unread?commentType=${commentType}`
  })
}
