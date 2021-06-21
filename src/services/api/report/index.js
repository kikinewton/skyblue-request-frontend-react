import { serializeQueryParams } from '../../../util/common-helper'
import service from '../apiRequest'
import { BASE_URL } from '../urls'

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

export function downloadPaymentReportLink(query) {
  const queryStr = serializeQueryParams(query)
  const url = `${BASE_URL}/accounts/paymentReport/download/${queryStr}`
  const link = document.createElement('a')
  link.href = url
  link.setAttribute("target", "_blank")
  document.body.appendChild(link)
  link.click()
  link.parentNode.removeChild(link)
}

export function downloadProcuredItemsLink(query) {
  const queryStr = serializeQueryParams(query)
  const url = `${BASE_URL}/procurement/procuredItemsReport/download/${queryStr}`
  const link = document.createElement('a')
  link.href = url
  link.setAttribute("target", "_blank")
  document.body.appendChild(link)
  link.click()
  link.parentNode.removeChild(link)
}

export function downloadGrnLink(query) {
  const queryStr = serializeQueryParams(query)
  const url = `${BASE_URL}/stores/grn/download/${queryStr}`
  const link = document.createElement('a')
  link.href = url
  link.setAttribute("target", "_blank")
  document.body.appendChild(link)
  link.click()
  link.parentNode.removeChild(link)
}