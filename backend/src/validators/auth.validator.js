// auth.validator.js

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;

function validateRegister(body) {
  const nama = String(body.nama || '').trim();
  const email = String(body.email || '').trim();
  const password = String(body.password || '');

  if (!nama || !email || !password) {
    return 'Nama, email, dan password wajib diisi.';
  }

  if (!EMAIL_REGEX.test(email)) {
    return 'Format email tidak valid.';
  }

  if (password.length < MIN_PASSWORD) {
    return `Password minimal ${MIN_PASSWORD} karakter.`;
  }

  return null;
}

function validateLogin(body) {
  const email = String(body.email || '').trim();
  const password = String(body.password || '');

  if (!email || !password) {
    return 'Email dan password wajib diisi.';
  }

  if (!EMAIL_REGEX.test(email)) {
    return 'Format email tidak valid.';
  }

  return null;
}

module.exports = { validateRegister, validateLogin };