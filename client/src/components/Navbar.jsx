import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoAvif from '../assets/logo.avif';
import logoPng from '../assets/logo.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-brand-50 sticky top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-6xl mx-auto w-full py-4 px-6 flex items-center justify-between gap-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group pl-2">
          <picture>
            <source srcSet={logoAvif} type="image/avif" />
            <img
              src={logoPng}
              alt="MediSearch logo"
              className="w-12 h-12 rounded-lg shadow-md object-cover ring-1 ring-brand-100 p-1 bg-white"
            />
          </picture>
          <span className="font-heading text-2xl font-bold text-brand-800 tracking-tight">
            Medi<span className="text-brand-500">Search</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="ml-auto flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/"
                className={`text-lg font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'text-green-600'
                    : 'text-gray-500 hover:text-green-600'
                }`}
              >
                Search
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-1.5">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-lg text-green-800 font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-lg text-gray-400 hover:text-red-500 transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-lg font-medium text-brand-700 hover:text-brand-900 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-brand-600 text-white text-lg font-medium px-5 py-2 rounded-soft hover:bg-brand-700 transition-colors shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
