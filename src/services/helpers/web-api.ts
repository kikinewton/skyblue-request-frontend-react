import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { apiConfig } from './api.config'
import { ResponseData } from '../../types/types';
import { getUserDetailsFromStorage } from '../auth-service';
import { AuthUser } from '../../types/types';
const HTTP_SUCCESS_CODE = 200;



const webApi: AxiosInstance = axios.create(apiConfig)

webApi.interceptors.request.use(config=> {
  const authUser = getUserDetailsFromStorage() as AuthUser
  
  if(config.url?.indexOf('/auth/login') === -1) {
    if(authUser) {
      config.headers['Authorization'] = `Bearer ${authUser.token}`
    }
  }
  console.log('config', config)
  return config
}, error=> {
  return Promise.reject(error)
})


webApi.interceptors.response.use((response: AxiosResponse): Promise<any>=> {
  console.log('response', response)
  const { status } = response;
  if(status === HTTP_SUCCESS_CODE) {
    const {data} = response
    return Promise.resolve(data as ResponseData)
  } else {
    if(status === 404) {
      console.log('400')
    }
    return Promise.reject(response)
  }
}, error=> {
  console.log('error', error)
  return Promise.reject(error)
})

export default webApi