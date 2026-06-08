import { useNavigate } from 'react-router-dom';
import { getMedicineImage, FALLBACK_IMAGE } from '../utils/helpers';

export default function MedicineCard({ medicine, index }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white border border-gray-100 rounded-xl shadow-card hover:shadow-card-hover overflow-hidden cursor-pointer
        transition-all duration-300 hover:-translate-y-1 animate-slide-up group"
      style={{ animationDelay: `${index * 60}ms`, opacity: 0 }}
      onClick={() => navigate(`/medicine/${encodeURIComponent(medicine.genericName)}`)}
    >
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden bg-gray-50">
        <img
          src={getMedicineImage(medicine.brandName)}
          alt={medicine.brandName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.src = FALLBACK_IMAGE; }}
        />
        <span className="absolute top-3 right-3 badge-green !text-[10px]">Generic Available</span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <h3 className="font-heading text-lg text-gray-900 group-hover:text-brand-600 transition-colors truncate">
          {medicine.brandName !== 'N/A' ? medicine.brandName : medicine.genericName}
        </h3>

        <span className="badge-gray !text-[10px]">
          Generic: {medicine.genericName !== 'N/A' ? medicine.genericName : '—'}
        </span>

        {/* Pricing */}
        {medicine.pricing && (
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Branded</p>
                <p className="text-sm font-bold text-gray-700">₹{medicine.pricing.brandedPrice}</p>
              </div>
              <div>
                <p className="text-[10px] text-brand-600 font-semibold uppercase tracking-wide">Generic</p>
                <p className="text-sm font-bold text-brand-600">₹{medicine.pricing.genericPrice}</p>
              </div>
            </div>
            {medicine.pricing.savings > 0 && (
              <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-medium">Savings</span>
                <span className="text-[10px] bg-brand-500 text-white font-bold px-2 py-0.5 rounded">
                  SAVE {medicine.pricing.savingsPercentage}%
                </span>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">
            {medicine.dosageForm && medicine.dosageForm !== 'N/A' ? medicine.dosageForm : 'MEDICINE'}
          </span>
          <span className="text-brand-500 text-xs font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all">
            Details
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
