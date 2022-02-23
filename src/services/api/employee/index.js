import apiRequest from "../apiRequest";
import { EMPLOYEE_ENDPOINT } from "../urls";

export function getUsers() {
  return apiRequest({
    method: "GET",
    url: `${EMPLOYEE_ENDPOINT}`
  })
}

export function getUser(userId) {
  return apiRequest({
    method: "GET",
    url: `${EMPLOYEE_ENDPOINT}${userId}`
  })
}

export function saveUser(data) {
  return apiRequest({
    method: "POST",
    url: `/admin/signup`,
    data
  })
}

export function updateUser(userId, data) {
  return apiRequest({
    method: "PUT",
    url: `${EMPLOYEE_ENDPOINT}${userId}`,
    data
  })
}

export function deleteUser(userId) {
  return apiRequest({
    method: "DELETE",
    url: `${EMPLOYEE_ENDPOINT}${userId}`
  })
}


export function selfChangePassword(userId, data) {
  return apiRequest({
    method: "PUT",
    url: `${EMPLOYEE_ENDPOINT}${userId}/changePassword`,
    data
  })
}

export function disableEmployee(id) {
  return apiRequest({
    url: `${EMPLOYEE_ENDPOINT}${id}/disable`,
    method: "PUT",
    data: {}
  })
}

export function enableEmployee(id) {
  return apiRequest({
    url: `${EMPLOYEE_ENDPOINT}${id}/enable`,
    method: "PUT",
    data: {}
  })
}