import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { ShieldCheck, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useApp();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1E3A8A]">VerifyMail</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {!isAuthenticated ? (
              <>
                <Link to="/" className="text-gray-600 hover:text-[#2563EB] transition-colors">
                  Home
                </Link>
                <Link to="/pricing" className="text-gray-600 hover:text-[#2563EB] transition-colors">
                  Pricing
                </Link>
                <Link to="/docs" className="text-gray-600 hover:text-[#2563EB] transition-colors">
                  Docs
                </Link>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#2563EB] hover:bg-[#1E3A8A]">Start Free Trial</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="text-gray-600 hover:text-[#2563EB] transition-colors">
                  Dashboard
                </Link>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{user?.plan} Plan</div>
                  </div>
                  <Button onClick={handleLogout} variant="outline">
                    Logout
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E5E7EB]">
            {!isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <Link to="/" className="px-3 py-2 text-gray-600 hover:text-[#2563EB]">
                  Home
                </Link>
                <Link to="/pricing" className="px-3 py-2 text-gray-600 hover:text-[#2563EB]">
                  Pricing
                </Link>
                <Link to="/docs" className="px-3 py-2 text-gray-600 hover:text-[#2563EB]">
                  Docs
                </Link>
                <Link to="/login" className="px-3 py-2">
                  <Button variant="ghost" className="w-full justify-start">Login</Button>
                </Link>
                <Link to="/signup" className="px-3 py-2">
                  <Button className="w-full bg-[#2563EB] hover:bg-[#1E3A8A]">Start Free Trial</Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="px-3 py-2 text-gray-600 hover:text-[#2563EB]">
                  Dashboard
                </Link>
                <div className="px-3 py-2">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{user?.plan} Plan</div>
                </div>
                <Button onClick={handleLogout} variant="outline" className="mx-3">
                  Logout
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
