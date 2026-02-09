import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Toaster } from './components/ui/sonner';

// Layouts
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DashboardSidebar } from './components/DashboardSidebar';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { PricingPage } from './pages/PricingPage';
import { DocsPage } from './pages/DocsPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

// User Dashboard Pages
import { UserDashboard } from './pages/UserDashboard';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { BulkUploadPage } from './pages/BulkUploadPage';
import { BulkProcessPage } from './pages/BulkProcessPage';
import { BulkResultsPage } from './pages/BulkResultsPage';
import { HistoryPage } from './pages/HistoryPage';
import { UserSettingsPage } from './pages/UserSettingsPage';

// Admin Pages
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { AdminLogsPage } from './pages/AdminLogsPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';
import { AdminFileManagerPage } from './pages/AdminFileManagerPage';

// Protected Route Components
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useApp();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useApp();
  
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

// Layout Wrappers
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

function AppContent() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
        <Route path="/pricing" element={<PublicLayout><PricingPage /></PublicLayout>} />
        <Route path="/docs" element={<PublicLayout><DocsPage /></PublicLayout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* User Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <UserDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/verify"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <VerifyEmailPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/bulk"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <BulkUploadPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/bulk/process/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <BulkProcessPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/bulk/results/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <BulkResultsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/history"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <HistoryPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <UserSettingsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminUsersPage />
              </DashboardLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/logs"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminLogsPage />
              </DashboardLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminSettingsPage />
              </DashboardLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/files"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminFileManagerPage />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
