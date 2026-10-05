// Dipakai untuk melindungi endpoint selain register/login (transaksi, budget,
// dst), yang baru dikerjakan di sprint berikutnya. Belum dipasang ke route
// manapun sekarang - disiapkan di sini supaya ownership.middleware.js nanti
// (S4) tinggal pakai req.user yang sudah diisi middleware ini.

const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { JWT_SECRET } = require('../config/env');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new AppError('Token tidak ditemukan. Silakan login.', 401));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { user_id: payload.user_id, email: payload.email };
    next();
  } catch (err) {
    next(new AppError('Token tidak valid atau sudah kedaluwarsa.', 401));
  }
}

module.exports = authMiddleware;
