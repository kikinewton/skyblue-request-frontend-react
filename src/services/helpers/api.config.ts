import {PathLike} from 'fs'
import * as qs from 'qs'

// export const apiConfig = {
//   returnRejectedPromiseOnError: true,
//   withCredentials: true,
//   timeout: 30000,
//   baseURL: 'http://localhost:8080/api',
//   headers: {
//     common: {
//       "Access-Control-Allow-Origin": true,
//       "Cache-Control": "no-cache, no-store, must-revalidate",
//        Pragma: "no-cache",
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     }
//   },
//   paramsSerializer: (params: PathLike) => qs.stringify(params, { indices: false }),
// }
export const apiConfig = {
  timeout: 30000,
  baseURL: 'http://localhost:8080/api',
  paramsSerializer: (params: PathLike) => qs.stringify(params, { indices: false }),
}