import { useNavigate } from 'react-router-dom';
import { getMedicineImage, FALLBACK_IMAGE } from '../utils/helpers';

export default function MedicineCard({ medicine, index }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-green-50
        overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-up group"
      style={{ animationDelay: `${index * 80}ms`, opacity: 0 }}
      onClick={() => navigate(`/medicine/${encodeURIComponent(medicine.genericName)}`)}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-green-50">
        <img
          src={getMedicineImage(medicine.brandName)}
          alt={medicine.brandName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.src = FALLBACK_IMAGE; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold
          px-3 py-1 rounded-full shadow">
          Generic Available
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-lg font-bold text-gray-800 mb-1 truncate">
          {medicine.brandName !== 'N/A' ? medicine.brandName : medicine.genericName}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs bg-green-100 text-green-700 font-medium px-2.5 py-0.5 rounded-full">
            Generic: {medicine.genericName !== 'N/A' ? medicine.genericName : '—'}
          </span>
        </div>

        {/* Manufacturer */}
        {medicine.manufacturer && medicine.manufacturer !== 'N/A' && (
          <div className="mb-3 pb-3 border-b border-gray-100">
            <p className="text-xs text-gray-500 font-semibold mb-1">MANUFACTURER</p>
            <p className="text-sm text-gray-700 font-medium">{medicine.manufacturer}</p>
          </div>
        )}

        {/* Pricing Section */}
        {medicine.pricing && (
          <div className="bg-green-50 rounded-lg p-3 mb-3">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">Branded Price</p>
                <p className="text-sm font-bold text-gray-800">₹{medicine.pricing.brandedPrice}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">Generic Price</p>
                <p className="text-sm font-bold text-green-600">₹{medicine.pricing.genericPrice}</p>
              </div>
            </div>
            {medicine.pricing.savings > 0 && (
              <div className="pt-2 border-t border-green-200">
                <p className="text-xs text-gray-700 font-semibold mb-1">You Save</p>
                <p className="text-sm font-bold text-green-700">
                  ₹{medicine.pricing.savings} ({medicine.pricing.savingsPercentage}% off)
                </p>
              </div>
            )}
            {medicine.pricing.source && (
              <div className="text-xs text-gray-400 text-center mt-2 pt-2 border-t border-green-100">
                Via {medicine.pricing.source}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-green-50">
          <span className="text-xs text-gray-400">
            {medicine.dosageForm && medicine.dosageForm !== 'N/A' ? medicine.dosageForm : ''}
          </span>
          <span className="text-green-600 text-sm font-medium flex items-center gap-1
            group-hover:gap-2 transition-all">
            Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
