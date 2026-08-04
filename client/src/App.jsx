import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import MedicineDetail from './pages/MedicineDetail';
import KendraLocator from './pages/KendraLocator';
import PrescriptionScanner from './pages/PrescriptionScanner';
import DisclaimerModal from './components/DisclaimerModal';
import { useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname) || location.pathname.startsWith('/reset-password');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
      <Navbar />
      <DisclaimerModal />
      <main className="flex-1 pt-16">
        <Routes>
          <Route path="/" element={user ? <Home /> : <Landing />} />
          <Route path="/medicine/:genericName" element={<PrivateRoute><MedicineDetail /></PrivateRoute>} />
          <Route path="/kendra-locator" element={<KendraLocator />} />
          <Route path="/prescription-scanner" element={<PrescriptionScanner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
