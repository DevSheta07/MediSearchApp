const router = require('express').Router();
const Medicine = require('../models/Medicine');

// ── SEARCH medicines from MongoDB ────────────────
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Search query is required.' });
    }

    console.log('🔍 Searching medicine:', query);

    const searchRegex = new RegExp(query.trim(), 'i');

    // Search in MongoDB for matching medicines
    const results = await Medicine.find({
      $or: [
        { brandName: searchRegex },
        { genericName: searchRegex },
        { searchTerms: searchRegex },
        { category: searchRegex },
      ]
    })
      .limit(12)
      .select('brandName genericName manufacturer dosageForm strength route pricing category inStock');

    if (results.length === 0) {
      console.log(`❌ No medicines found for "${query}"`);
      return res.json([]);
    }

    // Format response
    const formattedResults = results.map(medicine => ({
      brandName: medicine.brandName,
      genericName: medicine.genericName,
      manufacturer: medicine.manufacturer,
      dosageForm: medicine.dosageForm,
      strength: medicine.strength,
      route: medicine.route,
      category: medicine.category,
      inStock: medicine.inStock,
      pricing: {
        brandedPrice: medicine.pricing.branded,
        genericPrice: medicine.pricing.generic,
        savings: medicine.pricing.savings,
        savingsPercentage: medicine.pricing.savingsPercentage,
        source: 'Custom Database'
      }
    }));

    console.log(`✅ Found ${formattedResults.length} medicines for "${query}"`);
    res.json(formattedResults);

  } catch (err) {
    console.error('❌ Medicine search error:', err.message);
    res.status(500).json({ message: 'Failed to fetch medicine data. Try again.' });
  }
});

// ── GET medicine by brand name ───────────────────
// router.get('/brand/:brandName', async (req, res) => {
//   try {
//     const { brandName } = req.params;

//     const medicine = await Medicine.findOne({ brandName: new RegExp(brandName, 'i') });

//     if (!medicine) {
//       return res.status(404).json({ message: 'Medicine not found.' });
//     }

//     res.json(medicine);

//   } catch (err) {
//     console.error('❌ Error fetching medicine:', err.message);
//     res.status(500).json({ message: 'Failed to fetch medicine.' });
//   }
// });

// // ── GET all generic alternatives for a medicine ──
// router.get('/alternatives/:genericName', async (req, res) => {
//   try {
//     const { genericName } = req.params;

//     const alternatives = await Medicine.find({
//       genericName: new RegExp(genericName, 'i')
//     }).limit(10);

//     if (alternatives.length === 0) {
//       return res.json([]);
//     }

//     res.json(alternatives);

//   } catch (err) {
//     console.error('❌ Error fetching alternatives:', err.message);
//     res.status(500).json({ message: 'Failed to fetch alternatives.' });
//   }
// });

// module.exports = router;