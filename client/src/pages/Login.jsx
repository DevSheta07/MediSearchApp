import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoAvif from '../assets/logo.avif';
import logoPng from '../assets/logo.png';

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-green-50 flex">

      {/* Left – image */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img src="/images/pharmacy-interior.jpg"
          alt="pharmacy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-green-600/60" />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <h2 className="font-heading text-4xl font-bold mb-4">Your Health,<br />Our Priority</h2>
          <p className="text-green-100 text-lg leading-relaxed max-w-sm">
            Find affordable generic medicines and save up to 80% on your prescriptions.
          </p>
          <div className="flex gap-4 mt-8 flex-wrap">
            {['10K+ Medicines', '200+ Stores', 'Free to Use'].map(t => (
              <div key={t} className="bg-white/15 backdrop-blur rounded-xl px-4 py-2 text-sm font-medium">{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right – form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md animate-fade-up">
          <div className="flex items-center gap-4 mb-10">
            <picture>
              <source srcSet={logoAvif} type="image/avif" />
              <img
                src={logoPng}
                alt="MediSearch logo"
                className="w-20 h-20 rounded-xl shadow-md object-cover ring-1 ring-green-100"
              />
            </picture>
            <span className="font-heading text-3xl font-bold text-green-800 tracking-tight">
              Medi<span className="text-green-500">Search</span>
            </span>
          </div>

          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500 mb-8">Sign in to continue searching medicines</p>

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100
              rounded-xl text-red-600 text-sm mb-6">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: 'Email',    name: 'email',    type: 'email',    ph: 'you@example.com' },
              { label: 'Password', name: 'password', type: 'password', ph: '••••••••' },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-base font-medium text-gray-700 mb-1.5">{f.label}</label>
                <input type={f.type} name={f.name} value={form[f.name]}
                  onChange={handleChange} required placeholder={f.ph}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-white
                    text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-400
                    focus:ring-4 focus:ring-green-100 transition-all text-base" />
              </div>
            ))}

            <button type="submit" disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white
                font-semibold py-3.5 rounded-xl transition-colors shadow-sm flex items-center
                justify-center gap-2 text-base">
              {loading ? (<><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>Signing in...</>) : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-green-600 font-semibold hover:underline">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
