import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
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
import { Download, FileText, Search, PieChart } from 'lucide-react';
import { toast } from 'sonner';

export const BulkResultsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { verificationHistory } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // For demo, use recent verifications
  const results = verificationHistory.slice(0, 10);

  const filteredResults = results.filter(result => {
    const matchesSearch = result.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || result.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDownloadCSV = () => {
    // Mock CSV download
    const csv = [
      ['Email', 'Status', 'Confidence', 'Reason'],
      ...filteredResults.map(r => [r.email, r.status, r.confidence, r.reason])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'verified-emails.csv';
    a.click();
    toast.success('CSV downloaded successfully!');
  };

  const handleDownloadValidOnly = () => {
    const validEmails = filteredResults
      .filter(r => r.status === 'valid')
      .map(r => r.email)
      .join('\n');

    const blob = new Blob([validEmails], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'valid-emails.txt';
    a.click();
    toast.success('Valid emails downloaded!');
  };

  const validCount = results.filter(r => r.status === 'valid').length;
  const invalidCount = results.filter(r => r.status === 'invalid').length;
  const riskyCount = results.filter(r => r.status === 'risky').length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Verification Results</h1>
          <p className="text-gray-600">
            Complete analysis of {results.length} email addresses
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate('/dashboard/bulk')}>
          New Upload
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-[#E5E7EB]">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">{results.length}</div>
            <div className="text-sm text-muted-foreground">Total Emails</div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] border-l-4 border-l-green-500">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{validCount}</div>
            <div className="text-sm text-muted-foreground">Valid ({((validCount/results.length)*100).toFixed(0)}%)</div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] border-l-4 border-l-red-500">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">{invalidCount}</div>
            <div className="text-sm text-muted-foreground">Invalid ({((invalidCount/results.length)*100).toFixed(0)}%)</div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] border-l-4 border-l-amber-500">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-1">{riskyCount}</div>
            <div className="text-sm text-muted-foreground">Risky ({((riskyCount/results.length)*100).toFixed(0)}%)</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <Button onClick={handleDownloadValidOnly} className="bg-green-600 hover:bg-green-700">
          <Download className="w-4 h-4 mr-2" />
          Download Valid Only
        </Button>
        <Button onClick={handleDownloadCSV} variant="outline">
          <FileText className="w-4 h-4 mr-2" />
          Export Full Report (CSV)
        </Button>
        <Button variant="outline">
          <PieChart className="w-4 h-4 mr-2" />
          Export PDF Summary
        </Button>
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
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card className="border-[#E5E7EB]">
        <CardHeader>
          <CardTitle>Detailed Results ({filteredResults.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-[#E5E7EB] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-accent/30">
                  <TableHead>Email Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResults.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                      No results found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredResults.map((result) => (
                    <TableRow key={result.id} className="hover:bg-accent/20">
                      <TableCell className="font-medium">{result.email}</TableCell>
                      <TableCell>
                        <StatusBadge status={result.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#2563EB]"
                              style={{ width: `${result.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">
                            {result.confidence}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {result.reason}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
