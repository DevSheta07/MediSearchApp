// Run this once to add sample generic medicine stores to your database
// Usage: node seed.js

const mongoose = require('mongoose');
require('dotenv').config();

const Store = require('./models/Store');

// ⚠️  Change these coordinates to match YOUR city
// These are sample stores in Ahmedabad, Gujarat, India
const sampleStores = [
  {
    name: 'Jan Aushadhi Kendra - Satellite',
    address: 'Satellite Road, Ahmedabad, Gujarat',
    phone: '079-12345678',
    location: { type: 'Point', coordinates: [72.5173, 23.0309] },
  },
  {
    name: 'Generic Medicine Store - Bopal',
    address: 'Bopal Cross Road, Ahmedabad, Gujarat',
    phone: '079-23456789',
    location: { type: 'Point', coordinates: [72.4661, 23.0275] },
  },
  {
    name: 'Pradhan Mantri Bhartiya Jan Aushadhi - Maninagar',
    address: 'Maninagar, Ahmedabad, Gujarat',
    phone: '079-34567890',
    location: { type: 'Point', coordinates: [72.6019, 22.9990] },
  },
  {
    name: 'Peoples Generic Pharmacy - Navrangpura',
    address: 'Navrangpura, Ahmedabad, Gujarat',
    phone: '079-45678901',
    location: { type: 'Point', coordinates: [72.5590, 23.0395] },
  },
  {
    name: 'Affordable Meds Store - Vastral',
    address: 'Vastral, Ahmedabad, Gujarat',
    phone: '079-56789012',
    location: { type: 'Point', coordinates: [72.6517, 23.0141] },
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medisearch');
    console.log('✅ Connected to MongoDB');

    await Store.deleteMany({});
    console.log('🗑️  Cleared existing stores');

    await Store.insertMany(sampleStores);
    console.log(`✅ Inserted ${sampleStores.length} sample stores`);

    console.log('\n🏪 Stores added:');
    sampleStores.forEach(s => console.log(`   - ${s.name}`));

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();