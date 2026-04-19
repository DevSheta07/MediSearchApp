import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { searchMedicines } from '../api/medicine';
import { getMedicineImage, FALLBACK_IMAGE } from '../utils/helpers';
import StoreMap from '../components/StoreMap';

const TABS = [
  { key: 'overview',      label: 'Overview' },
  { key: 'alternatives',  label: 'Generic Options' },
  { key: 'stores',        label: 'Nearby Stores' },
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
                { label: 'Purpose',      value: primary.purpose },
              ].map(item => (
                <div key={item.label} className="bg-green-50 rounded-xl p-4">
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">{item.label}</p>
                  <p className="text-gray-700 font-medium text-sm leading-relaxed">
                    {item.value && item.value !== 'N/A' ? item.value : '—'}
                  </p>
                </div>
              ))}
            </div>
            {/* Savings banner */}
            <div className="flex items-center gap-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 text-white">
              <div className="text-3xl">💰</div>
              <div>
                <p className="font-heading text-lg font-bold">Save up to 80% with generics</p>
                <p className="text-green-100 text-sm mt-0.5">
                  Generic medicines contain the same active ingredient and are equally effective.
                </p>
              </div>
            </div>
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
                      <div>
                        <p className="font-semibold text-gray-800">{med.genericName}</p>
                        <p className="text-sm text-gray-500 mt-0.5">
                          By {med.manufacturer !== 'N/A' ? med.manufacturer : 'Various'}
                        </p>
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Stores ── */}
        {activeTab === 'stores' && (
          <div className="bg-white rounded-2xl shadow-card p-6 animate-fade-up">
            <StoreMap />
          </div>
        )}
      </div>
    </div>
  );
}
