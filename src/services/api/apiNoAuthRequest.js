import axios from "axios";
import { BASE_URL, AUTH_BASE_URL, RESOURCE_BASE_URL } from "./urls";
import { getLocalState } from "../app-storage";
import { AUTH_TOKEN_KEY } from "../app-storage/key-values";
import * as authenticationService from './auth'
import { history } from "../../util/browser-history";

export const RESPONSE_SUCCESS_CODE = "SUCCESS"

const apiConfig = {
  timeout: 60000,
  baseURL: RESOURCE_BASE_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  // paramsSerializer: (params) => qs.stringify(params, { indices: false }),
}

const request = axios.create(apiConfig)

request.interceptors.request.use((config) => {
  if(config.url.indexOf("signUp") !== -1 || config.url.indexOf("signup") !== -1 || config.url.indexOf("login") !== -1 ) {
    config.baseURL = AUTH_BASE_URL
  }
  const accessToken = getLocalState(AUTH_TOKEN_KEY)
  if(accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use((response) => {
  const { status, statusText } = response
  if(status === 200) {
    if(response.config.url.indexOf("download") !== -1) {
      return Promise.resolve(response)
    }
    return Promise.resolve(response.data)
  } else if(status === 401) {
    history.push("/not-authorized")
  }else if(status === 403) {
    authenticationService.signOut()
  }
  return Promise.reject(statusText)
}, (error) => {
  const { status } = error?.response?.data || {}
  if(status === 401) {
    history.push("/not-authorized")
  } else if(status === 403) {
    authenticationService.signOut()
  }
  return Promise.reject(error)
})

export default request