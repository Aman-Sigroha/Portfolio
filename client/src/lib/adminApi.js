import axios from 'axios'
import { apiUrl } from './api.js'

const adminClient = axios.create({
  baseURL: '',
  withCredentials: true,
})

export async function checkAdminSession() {
  const { data } = await adminClient.get(apiUrl('/api/admin/me'))
  return data.authenticated === true
}

export async function adminLogin(password) {
  const { data } = await adminClient.post(apiUrl('/api/admin/login'), { password })
  return data
}

export async function adminLogout() {
  const { data } = await adminClient.post(apiUrl('/api/admin/logout'))
  return data
}

export async function fetchContactMessages() {
  const { data } = await adminClient.get(apiUrl('/api/admin/messages'))
  return data
}

export async function markMessageRead(id) {
  const { data } = await adminClient.patch(apiUrl(`/api/admin/messages/${id}/read`))
  return data
}
