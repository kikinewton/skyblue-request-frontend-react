import { AxiosResponse } from "axios";
import { LoginPayload } from "../types/payloads";
import { RequestMethods } from "../types/types";
import service from './helpers/web-api'

export function login(loginPayload: LoginPayload): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: '/auth/login',
      method: 'POST',
      data: loginPayload
    })
    .then((response: AxiosResponse) => resolve(response))
    .catch(error => reject(error))
  })
}

export function saveToken(token: string): void {
  window.localStorage.setItem('token', token);
}

export function isAuthenticated() {
  const token: string | null = window.localStorage.getItem('token');
  return token ? true : false;
}

export function getAuthToken(): string | null {
  return window.localStorage.getItem('token');
}