import { useNavigate } from 'react-router-dom';
import { getMedicineImage, FALLBACK_IMAGE, truncate } from '../utils/helpers';

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

        {medicine.purpose && medicine.purpose !== 'N/A' && (
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
            {truncate(medicine.purpose, 90)}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-green-50">
          <span className="text-xs text-gray-400 truncate max-w-[60%]">
            {medicine.manufacturer !== 'N/A' ? `By ${medicine.manufacturer}` : ''}
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
