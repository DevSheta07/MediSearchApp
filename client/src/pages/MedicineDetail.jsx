import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { searchMedicines } from '../api/medicine';
import { getMedicineImage, FALLBACK_IMAGE } from '../utils/helpers';

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'alternatives', label: 'Generic Options' },
];

export default function MedicineDetail() {
  const { genericName } = useParams();
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    searchMedicines(decodeURIComponent(genericName))
      .then(({ data }) => setMedicines(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [genericName]);

  const primary = medicines[0] || {};
  const generics = medicines.filter(m => m.genericName !== 'N/A');
  const targetSalt = primary.genericName !== 'N/A' ? primary.genericName : decodeURIComponent(genericName);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-gray-200 border-t-brand-500 rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Back */}
        <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-gray-500 hover:text-brand-600 text-sm font-medium transition-colors">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Search
        </button>

        {/* Header */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-card overflow-hidden">
          <div className="relative h-52">
            <img src={getMedicineImage(primary.brandName)} alt="medicine" className="w-full h-full object-cover" onError={e => { e.target.src = FALLBACK_IMAGE; }} />
            <div className="absolute inset-0 bg-brand-900/60" />
            <div className="absolute inset-0 flex items-center justify-between px-8 sm:px-12">
              <div className="space-y-2">
                <h1 className="font-heading text-3xl sm:text-4xl text-white">
                  {primary.brandName !== 'N/A' ? primary.brandName : decodeURIComponent(genericName)}
                </h1>
                {primary.genericName && primary.genericName !== 'N/A' && (
                  <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Active: {primary.genericName}
                  </span>
                )}
              </div>

              {/* Direct Kendra Locator CTA */}
              <button
                onClick={() => navigate(`/kendra-locator?medicine=${encodeURIComponent(targetSalt)}`)}
                className="hidden sm:inline-block px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                Find Nearby Store
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-t border-gray-100">
            {TABS.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3.5 text-sm font-medium transition-colors relative ${
                  activeTab === tab.key ? 'text-brand-600' : 'text-gray-400 hover:text-gray-600'
                }`}>
                {tab.label}
                {activeTab === tab.key && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500" />}
              </button>
            ))}
          </div>
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="bg-white border border-gray-100 rounded-xl shadow-card p-6 sm:p-8 space-y-8 animate-fade-in">

            <div>
              <h2 className="font-heading text-xl text-gray-900 mb-4">Product Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Branded Label', value: primary.brandName },
                  { label: 'Generic Name', value: primary.genericName },
                  { label: 'Manufacturer', value: primary.manufacturer },
                  { label: 'Dosage Format', value: primary.dosageForm },
                  { label: 'Administration', value: primary.route },
                  { label: 'Classification', value: primary.category },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm text-gray-800 font-medium truncate">{item.value && item.value !== 'N/A' ? item.value : '—'}</p>
                  </div>
                ))}
              </div>
            </div>

            {primary.pricing && (
              <div className="bg-brand-50 border border-brand-100 rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg text-gray-900 font-semibold">Pricing Structure</h3>
                  {primary.pricing.source && <span className="badge-gray !text-[10px]">via {primary.pricing.source}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Branded Drug</p>
                    <p className="text-2xl font-bold text-gray-800">₹{primary.pricing.brandedPrice}</p>
                  </div>
                  <div className="bg-brand-500 rounded-lg p-4">
                    <p className="text-[10px] text-brand-100 font-semibold uppercase tracking-wider mb-1">Generic Bio-Equivalent</p>
                    <p className="text-2xl font-bold text-white">₹{primary.pricing.genericPrice}</p>
                  </div>
                  {primary.pricing.savings > 0 && (
                    <div className="bg-brand-600 rounded-lg p-4">
                      <p className="text-[10px] text-brand-100 font-semibold uppercase tracking-wider mb-1">Estimated Savings</p>
                      <p className="text-2xl font-bold text-white">₹{primary.pricing.savings}</p>
                      <p className="text-xs text-brand-100 font-medium mt-0.5">({primary.pricing.savingsPercentage}% off)</p>
                    </div>
                  )}
                </div>

                {primary.pricing.savings > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Cost Comparison</p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-[11px] font-medium text-gray-500 mb-1">
                          <span>Branded ({primary.brandName})</span><span>100%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gray-400 rounded-full" style={{ width: '100%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] font-medium text-brand-600 mb-1">
                          <span>Generic Alternative</span><span>Save {primary.pricing.savingsPercentage}%</span>
                        </div>
                        <div className="w-full h-3 bg-brand-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-500 rounded-full" style={{ width: `${100 - primary.pricing.savingsPercentage}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Alternatives */}
        {activeTab === 'alternatives' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white border border-gray-100 rounded-xl shadow-card p-6 sm:p-8">
              <h2 className="font-heading text-xl text-gray-900 mb-5">Generic Alternatives</h2>
              {generics.length === 0 ? (
                <p className="text-gray-500 text-center py-8 text-sm">No generic alternatives found.</p>
              ) : (
                <div className="space-y-3">
                  {generics.map((med, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-brand-300 transition-colors">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{med.genericName}</p>
                        <p className="text-xs text-gray-500 mt-1">By {med.manufacturer !== 'N/A' ? med.manufacturer : 'Various Manufacturers'}</p>
                        {med.pricing && (
                          <p className="text-xs text-gray-500 mt-1">Price: <span className="text-brand-600 font-semibold">₹{med.pricing.genericPrice}</span></p>
                        )}
                      </div>
                      <button
                        onClick={() => navigate(`/kendra-locator?medicine=${encodeURIComponent(med.genericName)}`)}
                        className="px-3 py-1.5 bg-brand-50 text-brand-600 hover:bg-brand-100 border border-brand-200 text-xs font-semibold rounded-lg transition-colors"
                      >
                        Locate Store
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
