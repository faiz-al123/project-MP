// Satu pintu untuk semua environment variable, supaya file lain tidak
// perlu menebak-nebak nama variabel atau nilai default-nya.
// Panggil require('dotenv').config() di server.js SEBELUM file ini
// dipakai, supaya process.env sudah terisi dari file .env.

module.exports = {
  PORT: process.env.PORT || 3000,
  DB_PATH: process.env.DB_PATH || 'database/finote.db',
  JWT_SECRET: process.env.JWT_SECRET || 'ganti_ini_sebelum_production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
};
