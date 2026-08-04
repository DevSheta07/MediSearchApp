import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function PrescriptionScanner() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer = null;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setScanResult(null);
      setError(null);
    }
  };

  const handleScan = async (presetKey = null) => {
    if (countdown > 0 && !presetKey) {
      setError(`Please wait ${countdown} seconds before scanning another custom image.`);
      return;
    }

    try {
      setScanning(true);
      setError(null);

      let payload = {};

      if (presetKey) {
        payload = { presetKey };
      } else if (selectedFile) {
        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(selectedFile);
        });
        payload = { imageBase64: base64 };
      } else {
        setError('Please upload a prescription image or select a sample preset below.');
        setScanning(false);
        return;
      }

      const res = await API.post('/prescription/scan', payload);
      setScanResult(res.data);
    } catch (err) {
      console.error('Scan error:', err);
      const serverMessage = err.response?.data?.message || 'Failed to scan prescription. Please try again.';
      const retrySecs = err.response?.data?.retrySeconds || (err.response?.status === 429 ? 45 : 0);

      setError(serverMessage);
      setScanResult(null);

      if (retrySecs > 0) {
        setCountdown(retrySecs);
      }
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-card space-y-2">
        <span className="badge-green !text-[10px]">Prescription Parsing Engine</span>
        <h1 className="font-heading text-2xl sm:text-3xl text-gray-900 font-bold">
          Prescription Scanner
        </h1>
        <p className="text-gray-500 text-sm max-w-xl">
          Upload a prescription image to extract generic active chemical salts and view savings.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-card space-y-4">
            <h2 className="font-heading font-semibold text-base text-gray-900">
              Upload Prescription Image
            </h2>

            <label className="border-2 border-dashed border-gray-200 hover:border-brand-500 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50 text-center space-y-2">
              {previewUrl ? (
                <div className="space-y-2">
                  <img src={previewUrl} alt="Prescription Preview" className="max-h-40 rounded object-contain mx-auto" />
                  <p className="text-xs text-brand-600 font-medium">{selectedFile?.name}</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG (Max 10MB)</p>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>

            <button
              onClick={() => handleScan(null)}
              disabled={scanning || !selectedFile || countdown > 0}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                selectedFile && !scanning && countdown === 0
                  ? 'btn-primary'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {scanning
                ? 'Analyzing Prescription...'
                : countdown > 0
                ? `Retry scan in ${countdown}s...`
                : 'Scan & Extract Salts'}
            </button>

            {error && (
              <div className="text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 space-y-1">
                <p className="font-semibold">{error}</p>
                {countdown > 0 && (
                  <p className="text-[11px] text-red-500 font-bold">
                    Countdown: Ready in {countdown}s
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-card space-y-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Sample Prescription Presets
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => handleScan('diabetes_bp')}
                disabled={scanning}
                className="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-brand-300 hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700"
              >
                <p className="font-semibold text-gray-900">Daily Diabetes & BP Prescription</p>
                <p className="text-[11px] text-gray-400">Telma 40, Glycomet 500, Atorva 10, Pan 40</p>
              </button>

              <button
                onClick={() => handleScan('fever_infection')}
                disabled={scanning}
                className="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-brand-300 hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700"
              >
                <p className="font-semibold text-gray-900">Fever & Antibiotic Prescription</p>
                <p className="text-[11px] text-gray-400">Augmentin 625, Crocin 650, Montair LC</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 space-y-4">
          {!scanResult && !scanning && (
            <div className="bg-white p-10 rounded-xl border border-gray-100 text-center space-y-2 shadow-card">
              <h3 className="font-heading text-lg font-semibold text-gray-800">Ready to Analyze</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Upload a prescription photo or select a preset to view generic alternatives.
              </p>
            </div>
          )}

          {scanning && (
            <div className="bg-white p-10 rounded-xl border border-gray-100 text-center space-y-3 shadow-card">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-brand-500 rounded-full animate-spin mx-auto"></div>
              <p className="text-xs text-gray-500 font-medium">Extracting active salts and querying openFDA...</p>
            </div>
          )}

          {scanResult && !scanning && (
            <div className="space-y-4">
              {/* Financial Summary Card */}
              <div className="bg-brand-500 text-white p-5 rounded-xl shadow-card space-y-3">
                <div className="flex items-center justify-between text-xs font-medium text-brand-100">
                  <span>Prescription Summary</span>
                  <span>{scanResult.detectedItemsCount} Medicines Detected</span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div className="bg-brand-600 p-3 rounded-lg">
                    <p className="text-[10px] text-brand-100 font-semibold uppercase">Branded Total</p>
                    <p className="text-lg font-bold">₹{scanResult.financialSummary.totalBrandedCost}</p>
                  </div>
                  <div className="bg-brand-600 p-3 rounded-lg">
                    <p className="text-[10px] text-brand-100 font-semibold uppercase">Generic Total</p>
                    <p className="text-lg font-bold">₹{scanResult.financialSummary.totalJanAushadhiCost}</p>
                  </div>
                  <div className="bg-white text-brand-700 p-3 rounded-lg">
                    <p className="text-[10px] text-brand-600 font-semibold uppercase">Total Savings</p>
                    <p className="text-lg font-bold">SAVE {scanResult.financialSummary.overallSavingsPct}%</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-brand-400 flex items-center justify-between text-xs text-brand-100">
                  <span>Annual Projected Savings: <strong className="text-white">₹{scanResult.financialSummary.annualSavings} / year</strong></span>
                  <button
                    onClick={() => navigate('/kendra-locator')}
                    className="px-3 py-1 bg-white text-brand-700 rounded text-xs font-semibold hover:bg-brand-50 transition-colors"
                  >
                    Locate Nearby Kendras
                  </button>
                </div>
              </div>

              {/* Extracted Medicines Card */}
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-card space-y-3">
                <h3 className="font-heading font-semibold text-base text-gray-900">
                  Extracted Branded Prescriptions & Generic Alternatives
                </h3>

                <div className="space-y-4">
                  {scanResult.medicines.map((item, idx) => (
                    <div key={idx} className="p-4 border border-gray-200 rounded-xl bg-gray-50 space-y-3">
                      {/* Branded Title Row */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Prescribed Branded Drug</p>
                          <h4 className="font-heading font-bold text-base text-gray-900">
                            {item.brandName}
                          </h4>
                        </div>
                        <span className="badge-green !text-[10px]">
                          Save {item.savingsPct}%
                        </span>
                      </div>

                      {/* Generic Alternative Salt Row */}
                      <div className="bg-white p-3 rounded-lg border border-gray-200 space-y-1">
                        <p className="text-[10px] text-brand-600 font-semibold uppercase tracking-wider">Generic Bio-Equivalent Alternative</p>
                        <p className="text-sm font-bold text-brand-700">{item.genericSalt}</p>
                        {item.category && <p className="text-[11px] text-gray-400">Category: {item.category}</p>}
                      </div>

                      {/* Pricing Comparison Row */}
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200/80">
                        <span className="text-gray-600">Branded MRP: <strong className="text-gray-900">₹{item.brandPrice}</strong></span>
                        <span className="text-brand-700 font-bold">Jan Aushadhi Generic MRP: ₹{item.janAushadhiPrice}</span>
                        <button
                          onClick={() => navigate(`/kendra-locator?medicine=${encodeURIComponent(item.genericSalt)}`)}
                          className="px-2.5 py-1 bg-brand-50 text-brand-600 hover:bg-brand-100 border border-brand-200 text-[11px] font-semibold rounded transition-colors"
                        >
                          Find Store
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
