import SearchBar from '../components/SearchBar';
import MedicineCard from '../components/MedicineCard';
import useMedicineSearch from '../hooks/useMedicineSearch';

const HERO_IMAGES = [
  '/images/pills-closeup.jpg',
  '/images/capsules.jpg',
  '/images/medical-tablets.jpg',
];

const STATS = [
  { label: 'Medicines Listed',     value: '39+' },
  { label: 'Generic Alternatives', value: '100+' },
  { label: 'Average Savings',      value: '70%' },
];

export default function Home() {
  const { results, loading, error, searched, search } = useMedicineSearch();

  return (
    <div className="min-h-screen bg-brand-50 py-8">

      {/* ── Hero ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white app-shell p-12 flex flex-col lg:flex-row items-center gap-12">

          {/* Copy */}
          <div className="flex-1 space-y-6 animate-fade-up">
            <span className="inline-flex items-center gap-2 bg-brand-100 text-brand-700
              text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide">
              <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
              Free Generic Medicine Finder
            </span>

            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-brand-800 leading-tight">
              Find Affordable<br />
              <span className="text-brand-600">Generic Medicines</span><br />
              Near You
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              Search the medicine your doctor prescribed and instantly discover
              cost-effective generic alternatives available at stores nearby.
            </p>

            <SearchBar onSearch={search} loading={loading} />

            {/* Stats */}
            <div className="flex items-center gap-8 pt-2">
              {STATS.map(s => (
                <div key={s.label}>
                  <div className="font-heading text-xl font-bold text-brand-700">{s.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero images */}
          <div className="flex-1 hidden lg:grid grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <img src={HERO_IMAGES[0]} alt="medicines"
              className="rounded-soft object-cover h-56 w-full shadow-card" />
            <div className="space-y-4">
              <img src={HERO_IMAGES[1]} alt="capsules"
                className="rounded-soft object-cover h-[104px] w-full shadow-card" />
              <img src={HERO_IMAGES[2]} alt="pharmacy"
                className="rounded-soft object-cover h-[104px] w-full shadow-card" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100
            rounded-2xl text-red-600 text-sm mb-8">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {error}
          </div>
        )}

        {/* No results */}
        {searched && !loading && results.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-heading text-xl text-gray-700 mb-2">No medicines found</h3>
            <p className="text-gray-400">Try a different name or check the spelling.</p>
          </div>
        )}

        {/* Results grid */}
        {results.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl font-bold text-gray-800">
                Search Results
                <span className="ml-3 text-base font-normal text-green-500">
                  {results.length} medicines found
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((med, i) => (
                <MedicineCard key={i} medicine={med} index={i} />
              ))}
            </div>
          </>
        )}

        {/* Before first search */}
        {!searched && (
          <div className="text-center py-16">
            <div className="flex justify-center gap-4 mb-8">
              {HERO_IMAGES.map((img, i) => (
                <img key={i} src={img} alt=""
                  className={`rounded-2xl object-cover shadow-card ${
                    i === 1 ? 'w-32 h-32 -mt-4' : 'w-28 h-28'
                  }`}
                />
              ))}
            </div>
            <h3 className="font-heading text-xl text-gray-600 mb-2">Start by searching a medicine</h3>
            <p className="text-gray-400 text-sm">Type the brand or generic name in the search box above</p>
          </div>
        )}
      </section>
    </div>
  );
}
