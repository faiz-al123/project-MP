// Pemanggilan endpoint /auth/* dan penyimpanan sesi login di browser.
// Lihat backend/API_CONTRACT.md untuk bentuk request & response.

import { request } from './client'

const TOKEN_KEY = 'finote_token'
const USER_KEY = 'finote_user'

// POST /auth/login -> { user, token }
export async function login({ email, password }) {
  const res = await request('/auth/login', {
    method: 'POST',
    body: { email, password },
  })
  return res.data
}

// GET /auth/me -> user
export async function getCurrentUser(token) {
  const res = await request('/auth/me', { token })
  return res.data.user
}

export function saveSession({ token, user }) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}