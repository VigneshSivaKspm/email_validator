import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { StatusBadge } from '../components/StatusBadge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Search, Calendar, Download, Mail } from 'lucide-react';
import { toast } from 'sonner';

export const HistoryPage = () => {
  const { verificationHistory } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  const filteredHistory = verificationHistory.filter(item => {
    const matchesSearch = item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter === 'today') {
      const today = new Date().toDateString();
      matchesDate = item.timestamp.toDateString() === today;
    } else if (dateFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = item.timestamp >= weekAgo;
    } else if (dateFilter === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      matchesDate = item.timestamp >= monthAgo;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleExport = () => {
    const csv = [
      ['Email', 'Status', 'Confidence', 'Reason', 'Date'],
      ...filteredHistory.map(item => [
        item.email,
        item.status,
        item.confidence,
        item.reason,
        item.timestamp.toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'verification-history.csv';
    a.click();
    toast.success('History exported successfully!');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Verification History</h1>
          <p className="text-gray-600">
            View and manage your past email verifications
          </p>
        </div>
        <Button onClick={handleExport} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-[#E5E7EB]">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {verificationHistory.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Verifications</div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] border-l-4 border-l-green-500">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {verificationHistory.filter(v => v.status === 'valid').length}
            </div>
            <div className="text-sm text-muted-foreground">Valid</div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] border-l-4 border-l-red-500">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {verificationHistory.filter(v => v.status === 'invalid').length}
            </div>
            <div className="text-sm text-muted-foreground">Invalid</div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] border-l-4 border-l-amber-500">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-1">
              {verificationHistory.filter(v => v.status === 'risky').length}
            </div>
            <div className="text-sm text-muted-foreground">Risky</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-[#E5E7EB]">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="valid">Valid</SelectItem>
                <SelectItem value="invalid">Invalid</SelectItem>
                <SelectItem value="risky">Risky</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card className="border-[#E5E7EB]">
        <CardHeader>
          <CardTitle>History ({filteredHistory.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-30" />
              <p className="text-muted-foreground mb-4">
                {verificationHistory.length === 0
                  ? "No verifications yet. Start verifying emails!"
                  : "No results match your filters"}
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-[#E5E7EB] overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent/30">
                    <TableHead>Email Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((item) => (
                    <TableRow key={item.id} className="hover:bg-accent/20">
                      <TableCell className="font-medium">{item.email}</TableCell>
                      <TableCell>
                        <StatusBadge status={item.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-24">
                            <div
                              className="h-full bg-[#2563EB]"
                              style={{ width: `${item.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {item.confidence}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                        {item.reason}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {item.timestamp.toLocaleDateString()} {item.timestamp.toLocaleTimeString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
