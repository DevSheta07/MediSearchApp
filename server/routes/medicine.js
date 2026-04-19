const router = require('express').Router();
const axios  = require('axios');

// ── SEARCH medicines ───────────────────────────
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Search query is required.' });
    }

    console.log('🔍 Searching medicine:', query);

    const encoded = encodeURIComponent(query.trim());

    // Search Open FDA drug label API
    const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encoded}"+openfda.generic_name:"${encoded}"&limit=12`;

    const response = await axios.get(url, { timeout: 8000 });

    const results = response.data.results.map((drug) => ({
      brandName:    drug.openfda?.brand_name?.[0]        || 'N/A',
      genericName:  drug.openfda?.generic_name?.[0]      || 'N/A',
      manufacturer: drug.openfda?.manufacturer_name?.[0] || 'N/A',
      purpose:      drug.purpose?.[0]                    || drug.indications_and_usage?.[0] || 'N/A',
      dosageForm:   drug.openfda?.dosage_form?.[0]       || 'N/A',
      route:        drug.openfda?.route?.[0]             || 'N/A',
    }));

    console.log(`✅ Found ${results.length} medicines for "${query}"`);
    res.json(results);

  } catch (err) {
    console.error('❌ Medicine search error:', err.message);

    // Open FDA returns 404 when no results found
    if (err.response?.status === 404) {
      return res.json([]); // return empty array, not an error
    }

    res.status(500).json({ message: 'Failed to fetch medicine data. Try again.' });
  }
});

module.exports = router;