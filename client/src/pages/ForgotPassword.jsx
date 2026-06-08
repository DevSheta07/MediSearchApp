import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../api/auth';
import logoAvif from '../assets/logo.avif';
import logoPng from '../assets/logo.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const { data } = await forgotPassword(email);
      setMessage(data.message || 'Reset link generated! Please check the server logs.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to request reset link. Please check the email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/pharmacy-interior.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-900/70" />

      {/* Centered Card */}
      <div className="w-full max-w-sm bg-white rounded-xl p-6 sm:p-8 shadow-xl relative z-10 animate-slide-up">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <picture className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100">
            <source srcSet={logoAvif} type="image/avif" />
            <img src={logoPng} alt="AushadhSetu" className="w-full h-full object-cover" />
          </picture>
          <span className="font-heading text-xl text-gray-900">
            Aushadh<span className="text-brand-500">Setu</span>
          </span>
        </div>

        <h1 className="font-heading text-2xl text-gray-900 mb-1 text-center font-semibold">Forgot Password</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">Enter your email to get a reset link</p>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm mb-5">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {message && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm mb-5">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="input-field"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full !mt-6">
            {loading ? 'Sending link...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Remember your password?{' '}
          <Link to="/login" className="text-brand-500 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
