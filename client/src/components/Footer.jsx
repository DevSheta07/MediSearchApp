export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Health & Savings Fact</p>
            <p className="text-xs text-gray-500 leading-relaxed max-w-md">
              Generic medicines contain the same active ingredients and efficacy as branded drugs — at up to 80% lower cost.
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-400 font-medium">
          © {new Date().getFullYear()} AushadhSetu · Crafted by <a href="https://github.com/DevSheta07" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline font-semibold">Dev Sheta</a>
        </p>
      </div>
    </footer>
  );
}
