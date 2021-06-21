import { serializeQueryParams } from '../../../util/common-helper'
import service from '../apiRequest'

export function downloadPaymentsReport(query) {
  const queryStr = serializeQueryParams(query)
  console.log('queryStr', queryStr)
  return service({
    url: `/accounts/paymentReport/download/${queryStr}`,
    method: 'GET',
    responseType: "blob"
  })
}

export function downloadProcuredItemsReport(query) {
  const queryStr = serializeQueryParams(query)
  return service({
    url: `/procurement/procuredItemsReport/download/${queryStr}`,
    method: 'GET',
    responseType: 'arraybuffer'
  })
}

export function downloadGrnReport(query) {
  const queryStr = serializeQueryParams(query)
  return service({
    url: `/stores/grn/download/${queryStr}`,
    method: 'GET',
    responseType: 'blob'
  })
}