// Koneksi ke database SQLite FiNote.
//
// CATATAN BUAT KAMU: file ini pakai modul `node:sqlite` bawaan Node.js
// (tersedia sejak Node 22.5+), jadi TIDAK perlu `npm install` driver
// database apa pun. Kalau nanti proyek mau pindah ke `better-sqlite3`
// (versi yang lebih stabil, non-experimental), cukup ganti isi file ini
// saja — kode di models/ tidak perlu diubah sama sekali, karena cara
// pakainya (`db.prepare(sql).run/get/all(...)`) sama persis.

const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const { DB_PATH } = require('./env');

const resolvedPath = path.isAbsolute(DB_PATH) ? DB_PATH : path.join(__dirname, '../../', DB_PATH);

const db = new DatabaseSync(resolvedPath);
db.exec('PRAGMA foreign_keys = ON');

module.exports = db;
