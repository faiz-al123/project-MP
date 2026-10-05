const { CORS_ORIGIN } = require('./env');

// Hanya izinkan origin frontend yang disebut di .env, bukan "*" (semua origin)
// supaya API tidak bisa diakses sembarang website lain.
module.exports = {
  origin: CORS_ORIGIN,
  credentials: true,
};
