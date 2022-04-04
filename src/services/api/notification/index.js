import service from '../apiRequest'
import { serializeQueryParams, serializeQueryParamsNotNull } from '../../../util/common-helper'


export function fetchNotifications() {
  return service({
    url: `/notifications`,
    method: 'GET',
  })
}