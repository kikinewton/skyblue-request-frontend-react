import apiRequest from "../apiRequest";
import { DEPARTMENTS_ENDPOINT } from "../urls";

export function getDepartments(query) {
  return apiRequest({
    method: 'GET',
    url: `${DEPARTMENTS_ENDPOINT}`
  })
}

export function getDepartment(deptId) {
  return apiRequest({
    method: "GET",
    url: `${DEPARTMENTS_ENDPOINT}${deptId}`
  })
}

export function saveDepartment(data) {
  console.log('data api', data)
  return apiRequest({
    method: "POST",
    url: `${DEPARTMENTS_ENDPOINT}`,
    data
  })
}

export function updateDepartment(deptId, data) {
  return apiRequest({
    method: "PUT",
    url: `${DEPARTMENTS_ENDPOINT}${deptId}`,
    data
  })
}

export function deleteDepartment(deptId) {
  return apiRequest({
    method: "DELETE",
    url: `${DEPARTMENTS_ENDPOINT}${deptId}`
  })
}