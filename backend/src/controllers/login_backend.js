// backend/src/controllers/authController.js
// Logic registrasi & login FiNote (tabel User: user_id, nama, email, password, created_at)

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // koneksi better-sqlite3 ke FiNote.db

const SALT_ROUNDS = 10;
const MIN_PASSWORD = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ------------------------------------------------------------
// Helper
// ------------------------------------------------------------
function buatToken(user) {
  return jwt.sign(
    { user_id: user.user_idad, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

function dataUserAman(user) {
  // Jangan pernah kirim password (hash sekalipun) ke client
  return {
    user_id: user.user_id,
    nama: user.nama,
    email: user.email,
    created_at: user.created_at,
  };
}

// ------------------------------------------------------------
// REGISTRASI
// Body: { nama, email, password }
// ------------------------------------------------------------
async function register(req, res) {
  try {
    const nama = String(req.body.nama || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    // Validasi input
    if (!nama || !email || !password) {
      return res.status(400).json({ message: 'Nama, email, dan password wajib diisi.' });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Format email tidak valid.' });
    }
    if (password.length < MIN_PASSWORD) {
      return res.status(400).json({ message: `Password minimal ${MIN_PASSWORD} karakter.` });
    }

    // Cek email sudah terdaftar atau belum
    const sudahAda = db.prepare('SELECT user_id FROM User WHERE email = ?').get(email);
    if (sudahAda) {
      return res.status(409).json({ message: 'Email sudah terdaftar.' });
    }

    // Hash password lalu simpan
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const hasil = db
      .prepare('INSERT INTO User (nama, email, password) VALUES (?, ?, ?)')
      .run(nama, email, hash);

    const userBaru = db
      .prepare('SELECT * FROM User WHERE user_id = ?')
      .get(hasil.lastInsertRowid);

    return res.status(201).json({
      message: 'Registrasi berhasil.',
      user: dataUserAman(userBaru),
      token: buatToken(userBaru),
    });
  } catch (err) {
    // Antisipasi dua request bersamaan dengan email yang sama
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ message: 'Email sudah terdaftar.' });
    }
    console.error('Error register:', err);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
}

// ------------------------------------------------------------
// LOGIN
// Body: { email, password }
// ------------------------------------------------------------
async function login(req, res) {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi.' });
    }

    const user = db.prepare('SELECT * FROM User WHERE email = ?').get(email);

    // Pesan sengaja sama untuk "email tidak ada" dan "password salah"
    // supaya orang luar tidak bisa menebak email mana yang terdaftar
    const pesanGagal = { message: 'Email atau password salah.' };

    if (!user) {
      return res.status(401).json(pesanGagal);
    }

    const cocok = await bcrypt.compare(password, user.password);
    if (!cocok) {
      return res.status(401).json(pesanGagal);
    }

    return res.status(200).json({
      message: 'Login berhasil.',
      user: dataUserAman(user),
      token: buatToken(user),
    });
  } catch (err) {
    console.error('Error login:', err);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
}

module.exports = { register, login };
