import SearchBar from '../components/SearchBar';
import MedicineCard from '../components/MedicineCard';
import useMedicineSearch from '../hooks/useMedicineSearch';

const STATS = [
  { label: 'FDA Drugs', value: '10K+' },
  { label: 'Generic Options', value: '100%' },
  { label: 'Avg. Savings', value: '75%' },
];

export default function Home() {
  const { results, loading, error, searched, search } = useMedicineSearch();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">

      {/* Hero */}
      <section className="max-w-5xl mx-auto mb-10">
        <div className="bg-white border border-gray-100 rounded-xl shadow-card p-8 sm:p-12">
          <div className="max-w-xl space-y-5 animate-slide-up">
            <span className="badge-green">✦ Live openFDA Search</span>

            <h1 className="font-heading text-3xl sm:text-4xl text-gray-900 leading-tight">
              Find Affordable <span className="text-brand-500">Generic Alternatives</span>
            </h1>

            <p className="text-gray-500 text-sm leading-relaxed max-w-md">
              Search any prescription or branded drug. Instantly discover FDA-approved generic alternatives and estimated discount pricing.
            </p>

            <SearchBar onSearch={search} loading={loading} />

            <div className="flex items-center gap-3 pt-2">
              {STATS.map((s, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-center min-w-[90px]">
                  <div className="font-heading text-lg text-gray-900">{s.value}</div>
                  <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-5xl mx-auto">

        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm mb-8">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>
              <p className="font-semibold">Search Error</p>
              <p className="text-red-500 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {searched && !loading && results.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">🔍</div>
            <h3 className="font-heading text-lg text-gray-900 mb-1">No medicines found</h3>
            <p className="text-gray-500 text-sm">Try checking the spelling or query another drug name.</p>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl shadow-card overflow-hidden animate-pulse">
                <div className="h-40 bg-gray-100" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-20 bg-gray-50 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h2 className="font-heading text-xl text-gray-900">Search Results</h2>
              <span className="badge-green">{results.length} Matches</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((med, i) => (
                <MedicineCard key={i} medicine={med} index={i} />
              ))}
            </div>
          </div>
        )}

        {!searched && !loading && (
          <div className="text-center py-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              {['/images/pills-closeup.jpg', '/images/capsules.jpg', '/images/medical-tablets.jpg'].map((img, i) => (
                <img key={i} src={img} alt="" className="w-32 h-32 rounded-xl object-cover border border-gray-100 shadow-sm" />
              ))}
            </div>
            <h3 className="font-heading text-lg text-gray-900 mb-1">Begin Your Search</h3>
            <p className="text-gray-500 text-sm">Enter a drug name above to explore generics and compare savings</p>
          </div>
        )}
      </section>
    </div>
  );
}
