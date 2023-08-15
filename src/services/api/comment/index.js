import service from '../apiRequest'
import { RESOURCE_BASE_URL } from '../urls'

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

export function downloadComments(itemId, commentType) {
  const url = `${RESOURCE_BASE_URL}/comments/${itemId}/export?commentType=${commentType}`
  const link = document.createElement('a')
  link.href = url
  link.setAttribute("target", "_blank")
  document.body.appendChild(link)
  link.click()
  link.parentNode.removeChild(link)
}
