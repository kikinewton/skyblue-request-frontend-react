import service from '../apiRequest'
const path = 'requestCategory'

export function getRequestCategories() {
  return service({
    url: `${path}`,
    method: 'GET'
  })
}

export function saveRequestCategory(data) {
  return service({
    url: `${path}`,
    method: 'POST',
    data
  })
}

export function updateRequestCategory(id, data) {
  return service({
    url: `${path}/${id}`,
    method: 'PUT',
    data
  })
}

export function deleteRequestCategory(id) {
  return service({
    url: `${path}/${id}`,
    method: "DELETE"
  })
}
