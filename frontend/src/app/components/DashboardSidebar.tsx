import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Mail, 
  Upload, 
  History, 
  Settings, 
  Users, 
  FileText, 
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardSidebar = () => {
  const location = useLocation();
  const { user } = useApp();
  const isAdmin = user?.role === 'admin';

  const userLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dashboard/verify', icon: Mail, label: 'Verify Email' },
    { to: '/dashboard/bulk', icon: Upload, label: 'Bulk Upload' },
    { to: '/dashboard/history', icon: History, label: 'History' },
    { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const adminLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'User Management' },
    { to: '/admin/files', icon: FileText, label: 'File Manager' },
    { to: '/admin/logs', icon: BarChart3, label: 'System Logs' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <div className="w-64 bg-white border-r border-[#E5E7EB] min-h-screen p-6">
      {/* Logo */}
      <Link to={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] rounded-xl flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="text-lg font-bold text-[#1E3A8A]">VerifyMail</div>
          {isAdmin && <div className="text-xs text-gray-500">Admin Panel</div>}
        </div>
      </Link>

      {/* Navigation */}
      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/20'
                  : 'text-gray-600 hover:bg-[#F8FAFC] hover:text-[#2563EB]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Quota Display (for users) */}
      {!isAdmin && user && (
        <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
          <div className="text-xs text-gray-600 mb-2">Monthly Quota</div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-2xl font-bold text-[#1E3A8A]">
              {user.monthlyQuota - user.usedQuota}
            </span>
            <span className="text-sm text-gray-500">/ {user.monthlyQuota}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2563EB] to-[#1E3A8A]"
              style={{ width: `${(user.usedQuota / user.monthlyQuota) * 100}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {user.usedQuota} verifications used
          </div>
        </div>
      )}
    </div>
  );
};
