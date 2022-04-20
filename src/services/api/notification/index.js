import service from '../apiRequest'


export function fetchNotifications() {
  return service({
    url: `/notifications`,
    method: 'GET',
  })
}