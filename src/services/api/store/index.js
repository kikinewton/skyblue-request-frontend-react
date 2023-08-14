import apiRequest from "../apiRequest";
import { STORES_ENDPOINT } from "../urls";

export function getStores(query) {
  return apiRequest({
    method: 'GET',
    url: `${STORES_ENDPOINT}`
  })
}

export function saveStore(data) {
  return apiRequest({
    method: "POST",
    url: `${STORES_ENDPOINT}`,
    data
  })
}

export function updateStore(id, data) {
  return apiRequest({
    method: "PUT",
    url: `${STORES_ENDPOINT}/${id}`,
    data
  })
}

export function deleteStore(id) {
  return apiRequest({
    method: "DELETE",
    url: `${STORES_ENDPOINT}/${id}`,
  })
}

