import { serializeQueryParams, serializeQueryParamsNotNull } from '../../../util/common-helper'
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

export function generateAccountPaymentsReport(query) {
  const queryStr = serializeQueryParamsNotNull(query)
  if(query?.download) {
    const url = `${BASE_URL}/accounts/paymentReport${queryStr}`
    downloadFile(url)
  } else {
    console.log('api query', query)
    return service({url: `/accounts/paymentReport${queryStr}`})
  }
  
}

export function generateAccountPettyCashPaymentsReport(query) {
  const queryStr = serializeQueryParamsNotNull(query)
  if(query.download) {
    const url = `${BASE_URL}/accounts/pettyCashPaymentReport${queryStr}`
    downloadFile(url)
  } else {
    return service({
      url: `/accounts/pettyCashPaymentReport${queryStr}`,
      method: 'GET'
    })
  }
}

export function generateFloatAgeingAnalysisReport(query) {
  
  const queryStr = serializeQueryParamsNotNull(query)
  const url = `${BASE_URL}/accounts/floatAgeingAnalysisReport${queryStr}`
  if(query.download) {
    downloadFile(url)
  } else {
    return service({url: `/accounts/floatAgeingAnalysisReport${queryStr}`, method: "GET"})
  }
  
}


//store
export function generateGoodsReceiveNotesReport(query) {
  const queryStr = serializeQueryParamsNotNull(query)
  if(query.download) {
    const url = `${BASE_URL}/stores/grnReport${queryStr}`
    downloadFile(url)
  } else {
    return service({
      url: `/stores/grnReport${queryStr}`,
      method: "GET"
    })
  }
}

//procurement
export function generateProcureItemsReportReport(query) {
  const queryStr = serializeQueryParamsNotNull(query)
  if(query.download) {
    const url = `${BASE_URL}/procurement/procuredItemsReport${queryStr}`
    downloadFile(url)
  } else {
    return service({
      url: `/procurement/procuredItemsReport${queryStr}`
    })
  }
}

export function downloadFile(url) {
  console.log('url', url)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute("target", "_blank")
  document.body.appendChild(link)
  link.click()
  link.parentNode.removeChild(link)
}