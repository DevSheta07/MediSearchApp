import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1.5 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
        {/* Icon */}
        <div className="pl-3 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          id="medicine-search-input"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search brand or generic name (e.g. Advil, Paracetamol...)"
          className="flex-1 px-3 py-2.5 bg-transparent text-gray-800 placeholder-gray-400 text-sm focus:outline-none"
        />

        <button type="submit" disabled={loading} className="btn-primary !rounded-lg !px-5 !py-2.5 !text-sm shrink-0">
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Searching
            </span>
          ) : 'Search'}
        </button>
      </div>
    </form>
  );
}
