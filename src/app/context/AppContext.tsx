import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'user' | 'admin';

export type EmailStatus = 'valid' | 'invalid' | 'risky' | 'unknown';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: 'free' | 'business' | 'enterprise';
  monthlyQuota: number;
  usedQuota: number;
  createdAt: Date;
}

export interface EmailVerification {
  id: string;
  email: string;
  status: EmailStatus;
  formatValid: boolean;
  domainExists: boolean;
  mxRecordFound: boolean;
  disposable: boolean;
  roleBased: boolean;
  catchAll: boolean;
  reason: string;
  confidence: number;
  timestamp: Date;
  userId: string;
}

export interface BulkUpload {
  id: string;
  filename: string;
  totalEmails: number;
  processed: number;
  validCount: number;
  invalidCount: number;
  riskyCount: number;
  unknownCount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  uploadedAt: Date;
  userId: string;
  results: EmailVerification[];
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  verifyEmail: (email: string) => Promise<EmailVerification>;
  verificationHistory: EmailVerification[];
  bulkUploads: BulkUpload[];
  uploadBulkFile: (file: File) => Promise<BulkUpload>;
  processBulkUpload: (uploadId: string) => Promise<void>;
  allUsers: User[];
  allVerifications: EmailVerification[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [verificationHistory, setVerificationHistory] = useState<EmailVerification[]>([]);
  const [bulkUploads, setBulkUploads] = useState<BulkUpload[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allVerifications, setAllVerifications] = useState<EmailVerification[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedHistory = localStorage.getItem('verificationHistory');
    const storedBulkUploads = localStorage.getItem('bulkUploads');
    const storedAllUsers = localStorage.getItem('allUsers');
    const storedAllVerifications = localStorage.getItem('allVerifications');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      parsedUser.createdAt = new Date(parsedUser.createdAt);
      setUser(parsedUser);
    }
    if (storedHistory) {
      const parsed = JSON.parse(storedHistory);
      setVerificationHistory(parsed.map((v: any) => ({ ...v, timestamp: new Date(v.timestamp) })));
    }
    if (storedBulkUploads) {
      const parsed = JSON.parse(storedBulkUploads);
      setBulkUploads(parsed.map((b: any) => ({ 
        ...b, 
        uploadedAt: new Date(b.uploadedAt),
        results: b.results.map((r: any) => ({ ...r, timestamp: new Date(r.timestamp) }))
      })));
    }
    if (storedAllUsers) {
      const parsed = JSON.parse(storedAllUsers);
      setAllUsers(parsed.map((u: any) => ({ ...u, createdAt: new Date(u.createdAt) })));
    }
    if (storedAllVerifications) {
      const parsed = JSON.parse(storedAllVerifications);
      setAllVerifications(parsed.map((v: any) => ({ ...v, timestamp: new Date(v.timestamp) })));
    }
  }, []);

  const login = async (email: string, password: string, isAdmin = false): Promise<boolean> => {
    // Mock login - in production, this would call an API
    const mockUsers: User[] = JSON.parse(localStorage.getItem('allUsers') || '[]');
    
    // Admin login
    if (isAdmin) {
      if (email === 'admin@verifymail.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@verifymail.com',
          role: 'admin',
          plan: 'enterprise',
          monthlyQuota: 1000000,
          usedQuota: 0,
          createdAt: new Date(),
        };
        setUser(adminUser);
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        return true;
      }
      return false;
    }

    // Regular user login
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock signup
    const mockUsers: User[] = JSON.parse(localStorage.getItem('allUsers') || '[]');
    
    if (mockUsers.find(u => u.email === email)) {
      return false; // User already exists
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'user',
      plan: 'free',
      monthlyQuota: 1000,
      usedQuota: 0,
      createdAt: new Date(),
    };

    mockUsers.push(newUser);
    localStorage.setItem('allUsers', JSON.stringify(mockUsers));
    setAllUsers(mockUsers);
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const verifyEmail = async (email: string): Promise<EmailVerification> => {
    // Mock email verification logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formatValid = emailRegex.test(email);
    
    const disposableDomains = ['tempmail.com', 'throwaway.email', '10minutemail.com'];
    const roleBased = ['admin', 'support', 'info', 'sales', 'noreply'].some(role => email.startsWith(role));
    const domain = email.split('@')[1];
    const disposable = disposableDomains.includes(domain);
    
    const domainExists = formatValid && !disposable;
    const mxRecordFound = domainExists && Math.random() > 0.2;
    const catchAll = mxRecordFound && Math.random() > 0.7;

    let status: EmailStatus = 'unknown';
    let reason = '';
    let confidence = 0;

    if (!formatValid) {
      status = 'invalid';
      reason = 'Invalid email format';
      confidence = 100;
    } else if (disposable) {
      status = 'invalid';
      reason = 'Disposable email address';
      confidence = 95;
    } else if (!domainExists || !mxRecordFound) {
      status = 'invalid';
      reason = 'Domain does not exist or has no MX records';
      confidence = 90;
    } else if (catchAll) {
      status = 'risky';
      reason = 'Catch-all domain - risky';
      confidence = 60;
    } else if (roleBased) {
      status = 'risky';
      reason = 'Role-based email address';
      confidence = 70;
    } else {
      status = 'valid';
      reason = 'All checks passed';
      confidence = 95;
    }

    const verification: EmailVerification = {
      id: `ver-${Date.now()}`,
      email,
      status,
      formatValid,
      domainExists,
      mxRecordFound,
      disposable,
      roleBased,
      catchAll,
      reason,
      confidence,
      timestamp: new Date(),
      userId: user?.id || 'guest',
    };

    if (user) {
      const newHistory = [verification, ...verificationHistory];
      setVerificationHistory(newHistory);
      localStorage.setItem('verificationHistory', JSON.stringify(newHistory));

      const newAllVerifications = [verification, ...allVerifications];
      setAllVerifications(newAllVerifications);
      localStorage.setItem('allVerifications', JSON.stringify(newAllVerifications));

      // Update quota
      const updatedUser = { ...user, usedQuota: user.usedQuota + 1 };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Update in all users
      const updatedAllUsers = allUsers.map(u => u.id === updatedUser.id ? updatedUser : u);
      setAllUsers(updatedAllUsers);
      localStorage.setItem('allUsers', JSON.stringify(updatedAllUsers));
    }

    return verification;
  };

  const uploadBulkFile = async (file: File): Promise<BulkUpload> => {
    const newUpload: BulkUpload = {
      id: `bulk-${Date.now()}`,
      filename: file.name,
      totalEmails: 0,
      processed: 0,
      validCount: 0,
      invalidCount: 0,
      riskyCount: 0,
      unknownCount: 0,
      status: 'pending',
      uploadedAt: new Date(),
      userId: user?.id || 'guest',
      results: [],
    };

    const newBulkUploads = [newUpload, ...bulkUploads];
    setBulkUploads(newBulkUploads);
    localStorage.setItem('bulkUploads', JSON.stringify(newBulkUploads));

    return newUpload;
  };

  const processBulkUpload = async (uploadId: string): Promise<void> => {
    // This would be called with actual email data in production
    // For now, it's a placeholder
  };

  const value: AppContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    verifyEmail,
    verificationHistory,
    bulkUploads,
    uploadBulkFile,
    processBulkUpload,
    allUsers,
    allVerifications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
