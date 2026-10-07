const db = require('../config/db');

function findByEmail(email) {
  return db.prepare('SELECT * FROM User WHERE email = ?').get(email);
}

function findByNama(nama) {
  return db.prepare('SELECT * FROM User WHERE nama = ?').get(nama);
}

function findByIdentifier(identifier) {
  return db
    .prepare('SELECT * FROM User WHERE nama = ? OR email = ?')
    .get(identifier, identifier);
}

function findById(userId) {
  return db
    .prepare(
      'SELECT user_id, nama, email, created_at FROM User WHERE user_id = ?'
    )
    .get(userId);
}

function create({ nama, email, hashedPassword }) {
  const hasil = db
    .prepare('INSERT INTO User (nama, email, password) VALUES (?, ?, ?)')
    .run(nama, email, hashedPassword);

  return findById(hasil.lastInsertRowid);
}

module.exports = {
  findByEmail,
  findByNama,
  findByIdentifier,
  findById,
  create,
};
