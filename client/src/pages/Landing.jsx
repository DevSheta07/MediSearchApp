import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center py-20">
      <div className="max-w-4xl mx-auto bg-white app-shell p-12 text-center">
        <h1 className="font-heading text-4xl font-bold text-brand-800 mb-4">Welcome to MediSearch</h1>
        <p className="text-gray-600 mb-6">
          Find affordable generic alternatives to branded medicines and compare prices instantly.
          Sign up to save on prescriptions and discover trusted generic options.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link to="/login" className="px-6 py-3 bg-brand-600 text-white rounded-soft font-semibold shadow-sm">
            Login
          </Link>
          <Link to="/register" className="px-6 py-3 border border-brand-200 text-brand-700 rounded-soft font-semibold">
            Register
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          Or explore by searching a medicine after you sign in.
        </div>
      </div>
    </div>
  );
}
