import { clearLocalState } from "../../app-storage";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "../../app-storage/key-values";
import apiRequest from "../apiRequest";
import { history } from '../../../util/browser-history'
import { LOGIN_ROUTE } from "../../../util/routes";


export function signIn(payload){
  return apiRequest({
    url: `/auth/login/`,
    method: 'POST',
    data: payload,
  })
}

export function signOut() {
  clearLocalState(AUTH_TOKEN_KEY)
  clearLocalState(AUTH_USER_KEY)
  //history.push(LOGIN_ROUTE)
  window.location.href="/#auth/login"
}

export function userHasAnyRole(role, roles) {
  if(!roles) return true
  return roles.indexOf(role) !== -1
}
