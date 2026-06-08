import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoAvif from '../assets/logo.avif';
import logoPng from '../assets/logo.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <picture className="w-9 h-9 rounded-lg overflow-hidden border border-gray-100">
            <source srcSet={logoAvif} type="image/avif" />
            <img src={logoPng} alt="MediSearch" className="w-full h-full object-cover" />
          </picture>
          <span className="font-heading text-xl text-gray-900">
            Medi<span className="text-brand-500">Search</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <>
              <Link to="/"
                className={`text-sm font-medium ${location.pathname === '/' ? 'text-brand-600' : 'text-gray-500 hover:text-gray-800'} transition-colors`}>
                Search
              </Link>
              <div className="flex items-center gap-3 ml-2">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full pl-1.5 pr-3.5 py-1">
                  <div className="w-7 h-7 bg-brand-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{user.name}</span>
                </div>
                <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-red-500 font-medium transition-colors">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">Sign In</Link>
              <Link to="/register" className="btn-primary !px-4 !py-2 !text-sm">Get Started</Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-500 p-1" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2">
          {user ? (
            <>
              <Link to="/" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-700 py-2">Search</Link>
              <div className="flex items-center gap-2 py-2">
                <div className="w-7 h-7 bg-brand-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                </div>
                <span className="text-sm text-gray-700">{user.name}</span>
              </div>
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="block text-sm text-red-500 py-2">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-700 py-2">Sign In</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="block btn-primary text-center !text-sm !py-2.5">Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
