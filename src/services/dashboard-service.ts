import { AxiosResponse } from "axios";
import { DepartmentPayload} from "../types/payloads";
import service from './helpers/web-api'

export function requestPerCurrentMonthPerDepartment(): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: '/dashboard/requestPerCurrentMonthPerDepartment',
      method: 'GET',
    })
    .then((response) => resolve(response))
    .catch(error=> reject(error))
  })
}