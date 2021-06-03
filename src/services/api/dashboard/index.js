import service from '../apiRequest'

export function getDashboardData(query) {
  return service({
    url: '/dashboard/data',
    method: 'GET'
  })
}