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
    <nav className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto w-full px-6 py-5 flex items-center justify-between gap-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group">
          <picture>
            <source srcSet={logoAvif} type="image/avif" />
            <img
              src={logoPng}
              alt="MediSearch logo"
              className="w-16 h-16 rounded-xl shadow-md object-cover ring-1 ring-green-100"
            />
          </picture>
          <span className="font-heading text-3xl font-bold text-green-800 tracking-tight">
            Medi<span className="text-green-500">Search</span>
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
                className="text-lg font-medium text-gray-500 hover:text-green-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-white text-lg font-medium px-5 py-2 rounded-xl hover:bg-green-700 transition-colors shadow-sm"
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
