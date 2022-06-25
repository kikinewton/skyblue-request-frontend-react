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

export function fetchUserComments(query) {
  return service({
    url: `/comments/unread?commentType=${query.commentType}`
  })
}
