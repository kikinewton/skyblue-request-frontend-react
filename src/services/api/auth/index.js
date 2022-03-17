import { clearLocalState } from "../../app-storage";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "../../app-storage/key-values";
import apiRequest from "../apiRequest";
import { history } from "../../../util/browser-history";


export function signIn(payload){
  return apiRequest({
    url: `/login`,
    method: 'POST',
    data: payload,
  })
}


export function fetchRoles(query) {
  return apiRequest({
    url: '/roles',
    method: 'GET'
  })
}

export function signOut() {
  clearLocalState(AUTH_TOKEN_KEY)
  clearLocalState(AUTH_USER_KEY)
  history.push("/login")
}

export function userHasAnyRole(role, roles) {
  if(!roles) return true
  return roles.indexOf(role) !== -1
}
