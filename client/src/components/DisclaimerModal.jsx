import { useState } from 'react';

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/50 z-[9999] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl max-w-md w-full p-6 sm:p-8 shadow-xl animate-slide-up">

        <div className="w-12 h-12 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h2 className="font-heading text-xl text-gray-900 mb-2">Simulated Pricing Notice</h2>

        <div className="space-y-3 text-sm text-gray-600 leading-relaxed mb-6">
          <p>The <strong className="text-gray-800">openFDA API</strong> is used to fetch real medicine listings, manufacturers, and ingredients.</p>
          <div className="bg-brand-50 border border-brand-200 rounded-lg p-3 text-brand-800 text-[13px]">
            The FDA database does <strong>not</strong> contain retail prices. All prices shown are <strong>simulated for demonstration</strong> and do not reflect real market rates.
          </div>
        </div>

        <button onClick={() => setIsOpen(false)} className="btn-primary w-full">I Understand & Agree</button>
      </div>
    </div>
  );
}
