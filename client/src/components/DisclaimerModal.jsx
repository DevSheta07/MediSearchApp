import { useState } from 'react';

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/50 z-[9999] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl max-w-md w-full p-6 sm:p-8 shadow-xl animate-slide-up">

        <div className="w-12 h-12 rounded-lg bg-brand-100 flex items-center justify-center text-2xl mb-4">💡</div>

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
