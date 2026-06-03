import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

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
    <div
      className="h-screen bg-brand-50 flex overflow-hidden relative pt-20"
      style={{ backgroundImage: "url('/images/pharmacy-interior.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-800/60 to-brand-600/20 rounded-none" />

      {/* Centered form */}
      <div className="w-full flex items-center justify-center">
        <div
          className="w-full max-w-md animate-fade-up app-shell p-6 sm:p-8 mx-4 sm:mx-6 bg-white rounded-soft shadow-md"
          style={{ maxHeight: 'calc(100vh - 6rem)', overflow: 'auto' }}
        >
          <div className="flex items-center gap-4 mb-10">
            <picture>
              <source srcSet={logoAvif} type="image/avif" />
              <img
                src={logoPng}
                alt="MediSearch logo"
                className="w-16 h-16 rounded-lg shadow-md object-cover ring-1 ring-brand-100"
              />
            </picture>
            <span className="font-heading text-2xl font-bold text-brand-800 tracking-tight">
              Medi<span className="text-brand-500">Search</span>
            </span>
          </div>

          <h1 className="font-heading text-3xl font-bold text-brand-800 mb-2">Welcome back</h1>
          <p className="text-gray-600 mb-8">Sign in to continue searching medicines</p>

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
                  className="w-full px-4 py-3 rounded-soft border-2 border-brand-50 bg-white
                    text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-400
                    focus:ring-4 focus:ring-brand-100 transition-all text-base" />
              </div>
            ))}

            <button type="submit" disabled={loading}
              className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 text-white
                font-semibold py-3.5 rounded-soft transition-colors shadow-sm flex items-center
                justify-center gap-2 text-base">
              {loading ? (<><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>Signing in...</>) : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-700 font-semibold hover:underline">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
