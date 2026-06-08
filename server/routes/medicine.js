const router = require('express').Router();
const axios = require('axios');

// ── SEARCH medicines from openFDA API ─────────────
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Search query is required.' });
    }

    // console.log('🔍 Searching medicine on openFDA:', query);

    // Clean query and split into tokens for search query construction
    const cleanQuery = query.trim().replace(/[^\w\s]/g, '').trim();
    const tokens = cleanQuery.split(/\s+/).filter(Boolean);
    
    if (tokens.length === 0) {
      return res.json([]);
    }

    // Construct Lucene query:
    // (openfda.brand_name:*token1* AND openfda.brand_name:*token2* ...) OR (openfda.generic_name:*token1* AND openfda.generic_name:*token2* ...)
    const brandTerms = tokens.map(t => `openfda.brand_name:*${t}*`).join('+AND+');
    const genericTerms = tokens.map(t => `openfda.generic_name:*${t}*`).join('+AND+');
    const openfdaSearch = `(${brandTerms})+OR+(${genericTerms})`;

    const url = `https://api.fda.gov/drug/label.json?search=${openfdaSearch}&limit=24`;

    let results = [];
    try {
      const response = await axios.get(url);
      results = response.data.results || [];
    } catch (apiErr) {
      // openFDA API returns 404 when no results are found
      if (apiErr.response && apiErr.response.status === 404) {
        // console.log(`❌ No medicines found on openFDA for "${query}"`);
        return res.json([]);
      }
      throw apiErr;
    }

    // Format & map results
    const formattedResults = results
      .map(medicine => {
        const openfda = medicine.openfda || {};
        const brandName = (openfda.brand_name && openfda.brand_name[0]) || 'N/A';
        const genericName = (openfda.generic_name && openfda.generic_name[0]) || 'N/A';

        // Skip records that don't have valid generic and brand names
        if (brandName === 'N/A' || genericName === 'N/A') {
          return null;
        }

        const manufacturer = (openfda.manufacturer_name && openfda.manufacturer_name[0]) || 'N/A';
        const dosageForm = (openfda.product_type && openfda.product_type[0]) || 'Tablet';
        const route = (openfda.route && openfda.route[0]) || 'Oral';
        
        // Extract a clean drug category if possible
        const category = (openfda.pharm_class_epc && openfda.pharm_class_epc[0]) || 'General';

        // Generate a deterministic branded price based on the brandName characters
        let charSum = 0;
        for (let i = 0; i < brandName.length; i++) {
          charSum += brandName.charCodeAt(i);
        }
        const brandedPrice = Math.floor((charSum + brandName.length * 7) % 150) + 50; // Between ₹50 and ₹200
        const genericPrice = Math.round(brandedPrice * 0.25); // 75% savings
        const savings = brandedPrice - genericPrice;

        return {
          brandName,
          genericName,
          manufacturer,
          dosageForm,
          strength: 'N/A',
          route,
          category,
          inStock: true,
          pricing: {
            brandedPrice,
            genericPrice,
            savings,
            savingsPercentage: 75,
            source: 'openFDA API'
          }
        };
      })
      .filter(Boolean)
      .slice(0, 12); // Limit to top 12 valid entries

    // console.log(`✅ Found ${formattedResults.length} medicines for "${query}"`);
    res.json(formattedResults);

  } catch (err) {
    console.error('❌ Medicine search error:', err.message);
    res.status(500).json({ message: 'Failed to fetch medicine data. Try again.' });
  }
});

module.exports = router;