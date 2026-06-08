import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoAvif from '../assets/logo.avif';
import logoPng from '../assets/logo.png';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    setLoading(true); setError('');
    try {
      await register(form.name, form.email, form.password);
      navigate('/login');
    } catch {
      setError('Registration failed. Email may already be in use.');
    } finally { setLoading(false); }
  };

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/pharmacy-store.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-900/70" />

      {/* Centered Card */}
      <div className="w-full max-w-sm bg-white rounded-xl p-6 sm:p-8 shadow-xl relative z-10 animate-slide-up">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <picture className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100">
            <source srcSet={logoAvif} type="image/avif" />
            <img src={logoPng} alt="MediSearch" className="w-full h-full object-cover" />
          </picture>
          <span className="font-heading text-xl text-gray-900">
            Medi<span className="text-brand-500">Search</span>
          </span>
        </div>

        <h1 className="font-heading text-2xl text-gray-900 mb-1 text-center">Create account</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">Start finding generic medicines for free</p>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm mb-5">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {[
            { label: 'Full Name', name: 'name', type: 'text', ph: 'John Doe' },
            { label: 'Email Address', name: 'email', type: 'email', ph: 'you@example.com' },
            { label: 'Password', name: 'password', type: 'password', ph: '8+ characters' },
            { label: 'Confirm Password', name: 'confirm', type: 'password', ph: 'Repeat password' },
          ].map(f => (
            <div key={f.name}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{f.label}</label>
              <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} required placeholder={f.ph} className="input-field !py-2.5" />
            </div>
          ))}

          <button type="submit" disabled={loading} className="btn-primary w-full !mt-5">
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Creating account...
              </span>
            ) : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-500 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
