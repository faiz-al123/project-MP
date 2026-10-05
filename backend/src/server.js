require('dotenv').config();

const fs = require('fs');
const path = require('path');
const app = require('./app');
const db = require('./config/db');
const { PORT } = require('./config/env');

// Jalankan schema.sql setiap server start - aman dipanggil berkali-kali
// karena semua statement di schema.sql pakai "IF NOT EXISTS"
const schemaPath = path.join(__dirname, '../database/schema.sql');
db.exec(fs.readFileSync(schemaPath, 'utf8'));

app.listen(PORT, () => {
  console.log(`FiNote backend jalan di http://localhost:${PORT}`);
});
