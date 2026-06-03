const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

// ── Middleware ─────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

// ── Routes ─────────────────────────────────────
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/medicine', require('./routes/medicine'));

// ── Health check ───────────────────────────────
app.get('/', (req, res) => res.json({ status: 'MediSearch API running ✅' }));

// ── MongoDB connect + start server ─────────────
const PORT     = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medisearch';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection FAILED:', err.message);
    console.error('👉 Make sure MongoDB is running: run "mongod" in a separate terminal');
    console.error('👉 Or use MongoDB Atlas and set MONGO_URI in .env');
    process.exit(1);
  });