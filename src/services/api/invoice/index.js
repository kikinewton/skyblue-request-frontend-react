import servvice from '../apiRequest'
const path = "invoice"

export function getAllInvoices(query) {
  return ServiceUIFrameContext({
    url: `${path}/all`,
    method: 'GET'
  })
}

export function getInvoiceById(query) {
  return ServiceUIFrameContext({
    url: `${path}/${query.invoiceId}`,
    method: 'GET'
  })
}

export function getInvoiceBySupplier(query) {
  return ServiceUIFrameContext({
    url: `${path}/supplier/${query.supplierId}`,
    method: 'GET'
  })
}

export function createInvoice(payload) {
  const data = {

  }
  return ServiceUIFrameContext({
    url: `/store/${path}`,
    method: 'POST',
    data
  })
}