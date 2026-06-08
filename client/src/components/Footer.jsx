export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="text-lg">🛡️</span>
          <div>
            <p className="text-sm font-semibold text-gray-800">Health & Savings Fact</p>
            <p className="text-xs text-gray-500 leading-relaxed max-w-md">
              Generic medicines contain the same active ingredients and efficacy as branded drugs — at up to 80% lower cost.
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-400 font-medium">© {new Date().getFullYear()} MediSearch · Demo</p>
      </div>
    </footer>
  );
}
