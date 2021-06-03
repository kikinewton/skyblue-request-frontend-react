import service from '../apiRequest'
import { FETCH_REQUEST_TYPES, UPDATE_REQUEST_TYPES } from '../../../util/request-types'


const path = "/requestDocument"
export function getAllDocuments(payload){
  return service({
    url: `${path}/${payload.quotationId}/assignRequestDocument/${payload.documentId}`,
    method: 'POST',
    data: payload
  })
}


export function getAllDocument(query) {
  return service({
    url: `${path}/download/${query.fileName}`,
    method: 'GET'
  })
}

export function saveDocument(payload) {
  const fd = new FormData()
  console.log('file send', payload.file)
  fd.append("files", payload.file)
  return service({
    url: `${path}/uploadMultipleFiles?employeeId=${payload.employeeId}`,
    method: 'POST',
    data: fd,
  })
}