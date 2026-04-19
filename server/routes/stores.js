const router = require('express').Router();
const Store  = require('../models/Store');

// ── GET nearby stores ──────────────────────────
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: 'lat and lng are required.' });
    }

    const stores = await Store.find({
      location: {
        $near: {
          $geometry: {
            type:        'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(radius),
        },
      },
    }).limit(20);

    console.log(`✅ Found ${stores.length} stores near [${lat}, ${lng}]`);
    res.json(stores);

  } catch (err) {
    console.error('❌ Nearby stores error:', err.message);
    res.status(500).json({ message: 'Failed to fetch nearby stores.' });
  }
});

// ── POST add a store (for seeding/admin) ───────
router.post('/add', async (req, res) => {
  try {
    const { name, address, phone, lat, lng } = req.body;
    const store = await Store.create({
      name, address, phone,
      location: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
    });
    console.log('✅ Store added:', store.name);
    res.status(201).json(store);
  } catch (err) {
    console.error('❌ Add store error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;