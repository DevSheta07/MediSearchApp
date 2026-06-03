import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { searchMedicines } from '../api/medicine';
import { getMedicineImage, FALLBACK_IMAGE } from '../utils/helpers';

const TABS = [
  { key: 'overview',      label: 'Overview' },
  { key: 'alternatives',  label: 'Generic Options' },
];

export default function MedicineDetail() {
  const { genericName } = useParams();
  const navigate        = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    searchMedicines(decodeURIComponent(genericName))
      .then(({ data }) => setMedicines(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [genericName]);

  const primary  = medicines[0] || {};
  const generics = medicines.filter(m => m.genericName !== 'N/A');

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="animate-spin w-10 h-10 border-4 border-green-200 border-t-green-500 rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen bg-green-50 py-10">
      <div className="max-w-4xl mx-auto px-6 space-y-8">

        {/* Back */}
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-600 hover:text-green-800 font-medium text-lg transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Search
        </button>

        {/* Header card */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="relative h-48">
            <img
              src={getMedicineImage(primary.brandName)}
              alt="medicine"
              className="w-full h-full object-cover"
              onError={e => { e.target.src = FALLBACK_IMAGE; }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/75 to-green-700/40" />
            <div className="absolute inset-0 flex items-center px-8">
              <div>
                <h1 className="font-heading text-3xl font-bold text-white mb-2">
                  {primary.brandName !== 'N/A' ? primary.brandName : decodeURIComponent(genericName)}
                </h1>
                {primary.genericName && primary.genericName !== 'N/A' && (
                  <span className="bg-white/20 backdrop-blur text-white text-sm px-4 py-1 rounded-full">
                    Generic: {primary.genericName}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-green-50">
            {TABS.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-4 text-lg font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'text-green-600 border-b-2 border-green-500'
                    : 'text-gray-400 hover:text-green-500'
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab: Overview ── */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-2xl shadow-card p-8 space-y-6 animate-fade-up">
            <h2 className="font-heading text-xl font-bold text-gray-800">Medicine Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: 'Brand Name',   value: primary.brandName },
                { label: 'Generic Name', value: primary.genericName },
                { label: 'Manufacturer', value: primary.manufacturer },
              ].map(item => (
                <div key={item.label} className="bg-green-50 rounded-xl p-4">
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">{item.label}</p>
                  <p className="text-gray-700 font-medium text-sm leading-relaxed">
                    {item.value && item.value !== 'N/A' ? item.value : '—'}
                  </p>
                </div>
              ))}
            </div>

            {/* Pricing Section */}
            {primary.pricing && (
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg font-bold text-gray-800">💰 Price Comparison</h3>
                  {primary.pricing.source && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                      Via {primary.pricing.source}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Branded Medicine</p>
                    <p className="text-3xl font-bold text-gray-800">₹{primary.pricing.brandedPrice}</p>
                  </div>
                  <div className="bg-green-500 text-white rounded-lg p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide mb-2">Generic Option</p>
                    <p className="text-3xl font-bold">₹{primary.pricing.genericPrice}</p>
                  </div>
                  {primary.pricing.savings > 0 && (
                    <div className="bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-lg p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide mb-2">You Save</p>
                      <p className="text-3xl font-bold">₹{primary.pricing.savings}</p>
                      <p className="text-sm mt-1 font-medium">({primary.pricing.savingsPercentage}% off)</p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ── Tab: Alternatives ── */}
        {activeTab === 'alternatives' && (
          <div className="space-y-4 animate-fade-up">
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h2 className="font-heading text-xl font-bold text-gray-800 mb-5">Generic Alternatives</h2>
              {generics.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No generic alternatives found in database.</p>
              ) : (
                <div className="space-y-3">
                  {generics.map((med, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-green-50
                      rounded-xl border border-green-100 hover:border-green-300 transition-colors">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{med.genericName}</p>
                        <p className="text-sm text-gray-500 mt-0.5">
                          By {med.manufacturer !== 'N/A' ? med.manufacturer : 'Various'}
                        </p>
                        {med.pricing && (
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-gray-600">
                              <span className="font-medium text-gray-800">₹{med.pricing.genericPrice}</span>
                              <span className="text-gray-400 ml-1">Generic</span>
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Generic
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Comparison table */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-heading text-lg font-bold text-gray-800 mb-4">Branded vs Generic</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-green-100">
                      <th className="text-left py-3 text-gray-500 font-medium">Feature</th>
                      <th className="text-center py-3 text-gray-500 font-medium">Branded</th>
                      <th className="text-center py-3 text-green-600 font-medium">Generic</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-green-50">
                    {[
                      ['Active Ingredient', 'Same',     'Same'],
                      ['Effectiveness',     'Proven',   'Equivalent'],
                      ['Safety',            'Tested',   'Approved'],
                      ['Cost',              'Higher',   'Up to 80% less'],
                      ['Availability',      'Wide',     'Most pharmacies'],
                    ].map(([feature, branded, generic]) => (
                      <tr key={feature}>
                        <td className="py-3 text-gray-600 font-medium">{feature}</td>
                        <td className="py-3 text-center text-gray-500">{branded}</td>
                        <td className="py-3 text-center text-green-700 font-medium">{generic}</td>
                      </tr>
                    ))}
                    {primary.pricing && (
                      <>
                        <tr className="bg-green-50">
                          <td className="py-3 text-gray-600 font-medium">Price (Sample)</td>
                          <td className="py-3 text-center text-gray-800 font-bold">₹{primary.pricing.brandedPrice}</td>
                          <td className="py-3 text-center text-green-600 font-bold">₹{primary.pricing.genericPrice}</td>
                        </tr>
                        {primary.pricing.savings > 0 && (
                          <tr>
                            <td className="py-3 text-gray-600 font-medium">Savings</td>
                            <td className="py-3 text-center text-gray-400">—</td>
                            <td className="py-3 text-center text-green-700 font-bold">₹{primary.pricing.savings} ({primary.pricing.savingsPercentage}%)</td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
