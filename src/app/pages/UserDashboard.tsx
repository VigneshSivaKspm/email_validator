import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { KPICard } from '../components/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Mail, Upload, CheckCircle2, XCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { StatusBadge } from '../components/StatusBadge';

export const UserDashboard = () => {
  const { user, verificationHistory } = useApp();

  const validCount = verificationHistory.filter(v => v.status === 'valid').length;
  const invalidCount = verificationHistory.filter(v => v.status === 'invalid').length;
  const riskyCount = verificationHistory.filter(v => v.status === 'risky').length;

  const pieData = [
    { name: 'Valid', value: validCount, color: '#10B981' },
    { name: 'Invalid', value: invalidCount, color: '#EF4444' },
    { name: 'Risky', value: riskyCount, color: '#F59E0B' },
  ];

  const trendData = [
    { date: 'Mon', verifications: 45 },
    { date: 'Tue', verifications: 52 },
    { date: 'Wed', verifications: 38 },
    { date: 'Thu', verifications: 65 },
    { date: 'Fri', verifications: 58 },
    { date: 'Sat', verifications: 30 },
    { date: 'Sun', verifications: 25 },
  ];

  const quotaPercentage = user ? (user.usedQuota / user.monthlyQuota) * 100 : 0;

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's your email verification overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Current Plan"
          value={user?.plan.charAt(0).toUpperCase() + user?.plan.slice(1) || 'Free'}
          icon={TrendingUp}
          subtitle="Active subscription"
          color="blue"
        />
        <KPICard
          title="Monthly Quota"
          value={`${user ? user.monthlyQuota - user.usedQuota : 0}`}
          icon={Upload}
          subtitle={`${user?.usedQuota || 0} / ${user?.monthlyQuota || 0} used`}
          color="green"
        />
        <KPICard
          title="Total Verified"
          value={verificationHistory.length}
          icon={CheckCircle2}
          subtitle="All time emails"
          color="blue"
        />
        <KPICard
          title="Valid Emails"
          value={validCount}
          icon={Mail}
          subtitle={`${verificationHistory.length > 0 ? ((validCount / verificationHistory.length) * 100).toFixed(0) : 0}% success rate`}
          color="green"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Trend */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle>Weekly Verification Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="verifications" 
                  stroke="#2563EB" 
                  strokeWidth={2}
                  dot={{ fill: '#2563EB', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Breakdown */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle>Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-[#E5E7EB]">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/dashboard/verify">
              <Button className="w-full h-20 bg-[#2563EB] hover:bg-[#1E3A8A] text-lg">
                <Mail className="w-6 h-6 mr-3" />
                Verify Single Email
              </Button>
            </Link>
            <Link to="/dashboard/bulk">
              <Button variant="outline" className="w-full h-20 border-[#E5E7EB] text-lg">
                <Upload className="w-6 h-6 mr-3" />
                Upload Bulk List
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-[#E5E7EB]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Verifications</CardTitle>
            <Link to="/dashboard/history">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {verificationHistory.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No verifications yet. Start by verifying your first email!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {verificationHistory.slice(0, 5).map((verification) => (
                <div key={verification.id} className="flex items-center justify-between p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{verification.email}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {verification.timestamp.toLocaleDateString()}
                    </span>
                    <StatusBadge status={verification.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
