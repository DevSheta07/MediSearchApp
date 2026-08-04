const router = require('express').Router();
const Pharmacy = require('../models/Pharmacy');
const seedPharmacies = require('../seeders/pharmacySeeder');

// Haversine formula distance calculation
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

// ── GET Nearby Jan Aushadhi Kendras ─────────────
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, city } = req.query;

    let stores = [];

    // Case 1: Coordinates provided -> perform distance search & sort closest first
    if (lat && lng && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng))) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);

      try {
        stores = await Pharmacy.aggregate([
          {
            $geoNear: {
              near: { type: 'Point', coordinates: [userLng, userLat] },
              distanceField: 'distanceInMeters',
              spherical: true
            }
          }
        ]);
      } catch (geoErr) {
        // Fallback to manual Haversine distance sorting
        const allStores = await Pharmacy.find({});
        stores = allStores
          .map((store) => {
            const storeObj = store.toObject();
            const [storeLng, storeLat] = storeObj.location.coordinates;
            const dist = calculateHaversineDistance(userLat, userLng, storeLat, storeLng);
            return {
              ...storeObj,
              distanceInMeters: dist * 1000
            };
          })
          .sort((a, b) => a.distanceInMeters - b.distanceInMeters);
      }
    } 
    // Case 2: City filter provided
    else if (city && city.trim() !== '') {
      stores = await Pharmacy.find({
        city: { $regex: new RegExp(city.trim(), 'i') }
      }).lean();
    } 
    // Case 3: Return all available Kendras
    else {
      stores = await Pharmacy.find({}).sort({ city: 1 }).lean();
    }

    // Format clean store results
    const formattedStores = stores.map((store) => {
      const distKm = store.distanceInMeters ? (store.distanceInMeters / 1000).toFixed(1) : null;

      return {
        _id: store._id,
        kendraCode: store.kendraCode,
        name: store.name,
        address: store.address,
        city: store.city,
        state: store.state,
        pincode: store.pincode,
        phone: store.phone,
        openingHours: store.openingHours,
        coordinates: store.location?.coordinates || [0, 0],
        distanceKm: distKm ? parseFloat(distKm) : null,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${store.location?.coordinates[1]},${store.location?.coordinates[0]}`
      };
    });

    res.json({
      count: formattedStores.length,
      stores: formattedStores
    });
  } catch (err) {
    console.error('❌ Error fetching nearby Kendras:', err.message);
    res.status(500).json({ message: 'Failed to fetch nearby Jan Aushadhi Kendras.' });
  }
});

// ── Manual Seeder Endpoint ─────────────────────
router.post('/seed', async (req, res) => {
  try {
    await seedPharmacies();
    const count = await Pharmacy.countDocuments();
    res.json({ message: `Jan Aushadhi Kendras seeded successfully! Total stores: ${count}` });
  } catch (err) {
    res.status(500).json({ message: 'Seeding failed.', error: err.message });
  }
});

module.exports = router;
