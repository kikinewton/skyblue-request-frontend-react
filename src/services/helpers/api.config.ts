import {PathLike} from 'fs'
import * as qs from 'qs'

export const apiConfig = {
  timeout: 30000,
  baseURL: 'http://localhost:5000/api',
  //baseURL: 'http://bluesupply-env.eba-tykdzwp2.us-east-1.elasticbeanstalk.com/api',
  paramsSerializer: (params: PathLike) => qs.stringify(params, { indices: false }),
}