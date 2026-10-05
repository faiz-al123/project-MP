const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
router.use('/auth', authRoutes);

// Route lain (transaction, category, budget, dst) ditambahkan di sini
// begitu controllernya selesai dikerjakan di sprint berikutnya:
// router.use('/transaksi', require('./transaction.routes'));
// router.use('/kategori', require('./category.routes'));

module.exports = router;
