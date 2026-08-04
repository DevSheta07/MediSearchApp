const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

const seedPharmacies = require('./seeders/pharmacySeeder');

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

// ── Middleware ─────────────────────────────────
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

const path = require('path');

// ── Routes ─────────────────────────────────────
app.use('/api/auth',         require('./routes/auth'));
app.use('/api/medicine',     require('./routes/medicine'));
app.use('/api/pharmacy',     require('./routes/pharmacy'));
app.use('/api/prescription', require('./routes/prescription'));

// ── Serve Production Frontend ─────────────────
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
} else {
  // ── Health check ───────────────────────────────
  app.get('/', (req, res) => res.json({ status: 'AushadhSetu API running ✅' }));
}

// ── MongoDB connect + start server ─────────────
const PORT     = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aushadhsetu';

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected successfully');
    await seedPharmacies();
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection FAILED:', err.message);
    process.exit(1);
  });