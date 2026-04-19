import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute left-5 text-green-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by medicine name (e.g. Paracetamol, Amoxicillin...)"
          className="w-full pl-14 pr-36 py-4 rounded-2xl border-2 border-green-100 bg-white text-gray-700
            placeholder-gray-400 text-base focus:outline-none focus:border-green-400 focus:ring-4
            focus:ring-green-100 shadow-card transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 bg-green-600 hover:bg-green-700 disabled:bg-green-300
            text-white font-medium px-6 py-2.5 rounded-xl transition-colors text-base shadow-sm"
        >
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
