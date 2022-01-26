import service from '../apiRequest'
import { BASE_URL } from '../urls'


const path = "/requestDocument"
export function getAllDocuments(payload){
  return service({
    url: `${path}/${payload.quotationId}/assignRequestDocument/${payload.documentId}`,
    method: 'POST',
    data: payload
  })
}

export function generateResourceUrl(fileName) {
  const url = `${BASE_URL}/requestDocument/download/${fileName}`;
  console.log('url: ', url)
  return url;
}


export function getAllDocument(query) {
  return service({
    url: `${path}/download/${query.fileName}`,
    method: 'GET'
  })
}

// export function saveDocument(payload) {
//   const fd = new FormData()
//   console.log('file send', payload.file)
//   fd.append("files", payload.file)
//   return service({
//     url: `${path}/uploadMultipleFiles?employeeId=${payload.employeeId}`,
//     method: 'POST',
//     data: fd,
//   })
// }

export function saveDocument(payload) {
  const fd = new FormData()
  fd.append("files", payload.files)
  return service({
    url: `${path}/uploadMultipleFiles`,
    method: 'POST',
    data: fd,
  })
}

export function saveSingleDocument(payload) {
  console.log("file upload api", payload)
  const fd = new FormData()
  fd.append("file", payload.file)
  return service({
    url: `${path}/upload?docType=${payload?.docType}`,
    method: 'POST',
    data: fd,
  })
}

export function saveMultipleDocument(payload) {
  console.log("file upload api", payload)
  const fd = new FormData()
  fd.append("files", payload.files)
  return service({
    url: `/requestDOcument/uploadMultipleFiles`,
    method: 'POST',
    data: fd,
  })
}

// export function saveDocument(payload) {
//   const fd = new FormData()
//   console.log('file send', payload.file)
//   fd.append("files", payload.file)
//   return service({
//     url: `${path}/uploadMultipleFiles?employeeId=${payload.employeeId}`,
//     method: 'POST',
//     data: fd,
//   })
// }
