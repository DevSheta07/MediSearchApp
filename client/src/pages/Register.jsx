import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoAvif from '../assets/logo.avif';
import logoPng from '../assets/logo.png';

export default function Register() {
  const { register } = useAuth();
  const navigate     = useNavigate();
  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError]     = useState('');
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
    <div className="min-h-screen bg-green-50 flex">

      {/* Left – form */}
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

          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">Create account</h1>
          <p className="text-gray-500 mb-8">Start finding generic medicines for free</p>

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
              { label: 'Full Name',        name: 'name',     type: 'text',     ph: 'John Doe' },
              { label: 'Email',            name: 'email',    type: 'email',    ph: 'you@example.com' },
              { label: 'Password',         name: 'password', type: 'password', ph: '8+ characters' },
              { label: 'Confirm Password', name: 'confirm',  type: 'password', ph: 'Repeat password' },
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
              </svg>Creating account...</>) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right – image */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=900&q=80"
          alt="pharmacy store" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-bl from-green-900/80 to-green-600/60" />
        <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
          <div className="space-y-6 max-w-sm">
            {[
              { icon: '🔍', title: 'Smart Search',        desc: 'Search any medicine by brand or generic name instantly' },
              { icon: '💊', title: 'Generic Alternatives', desc: 'Discover cost-effective alternatives with the same efficacy' },
              { icon: '📍', title: 'Locate Stores',        desc: 'Find generic medicine stores on a live map near you' },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-11 h-11 bg-white/20 backdrop-blur rounded-xl flex items-center
                  justify-center text-xl shrink-0">{item.icon}</div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-green-100 text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
