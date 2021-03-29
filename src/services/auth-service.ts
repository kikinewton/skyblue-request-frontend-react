import { AxiosResponse } from "axios";
import { EmployeeLevel } from "../types/EmployeeLevel";
import { LoginPayload } from "../types/payloads";
import { AuthUser} from "../types/User";
import service from './helpers/web-api'

export function login(loginPayload: LoginPayload): Promise<any> {
  return new Promise((resolve, reject) => {
    service({
      url: '/auth/login',
      method: 'POST',
      data: loginPayload
    })
    .then((response: AxiosResponse) => {
      return resolve(response)
    })
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

export function getUserDetailsFromStorage(): AuthUser | undefined {
  const storeData = localStorage.getItem('user');
  
  if(storeData) {
    return JSON.parse(storeData) as AuthUser
  } else {
    return undefined
  }
}

export function logout(): void {
  window.localStorage.removeItem('user');
}


export function userHasAnyOfRoles(userRole: EmployeeLevel | undefined, roles: EmployeeLevel[]): boolean {
  if(!userRole) {
    return false
  }
  console.log('has role', roles.indexOf(userRole) >= 0)
  return roles.indexOf(userRole) >= 0;
}

