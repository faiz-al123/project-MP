// Helper fetch bersama untuk semua file *.api.js (auth, transaksi, budget, dst).
// Backend FiNote selalu membalas { success, message, data }, jadi di sini kita
// ubah semua response gagal menjadi ApiError dengan pesan siap tampil.

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api').replace(/\/$/, '')
const TIMEOUT_MS = 15000

export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export async function request(path, { method = 'GET', body, token } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  const headers = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    })
  } catch (err) {
    const timedOut = err.name === 'AbortError'
    throw new ApiError(
      timedOut
        ? 'Server terlalu lama merespons. Coba lagi.'
        : 'Tidak dapat terhubung ke server. Pastikan backend sudah berjalan.',
    )
  } finally {
    clearTimeout(timer)
  }

  // Response bisa saja bukan JSON (mis. halaman 404 HTML bawaan Express)
  let data = null
  const text = await res.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = null
    }
  }

  if (!res.ok || data?.success === false) {
    throw new ApiError(
      data?.message || `Permintaan gagal (kode ${res.status}).`,
      res.status,
      data,
    )
  }

  return data
}