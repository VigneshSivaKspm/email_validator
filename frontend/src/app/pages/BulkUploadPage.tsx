import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { FileUpload } from '../components/FileUpload';
import { toast } from 'sonner';
import { FileSpreadsheet, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

export const BulkUploadPage = () => {
  const { uploadBulkFile, user } = useApp();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    if (!user) {
      toast.error('Please log in to upload files');
      return;
    }

    setUploading(true);
    try {
      const upload = await uploadBulkFile(selectedFile);
      toast.success('File uploaded successfully!');
      navigate(`/dashboard/bulk/process/${upload.id}`);
    } catch (error) {
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-[#1E3A8A]">Bulk Email List Cleaning</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Upload your email list and verify thousands of addresses in minutes
        </p>
      </div>

      {/* Quota Warning */}
      {user && user.usedQuota >= user.monthlyQuota * 0.9 && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            You're approaching your monthly quota limit. 
            {user.monthlyQuota - user.usedQuota} verifications remaining.
          </AlertDescription>
        </Alert>
      )}

      {/* Upload Card */}
      <Card className="border-[#E5E7EB]">
        <CardHeader>
          <CardTitle>Upload Email List</CardTitle>
          <CardDescription>
            Support for CSV and Excel files (XLSX, XLS) - Maximum file size: 10MB
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FileUpload onFileSelect={handleFileSelect} />

          {selectedFile && (
            <Button
              onClick={handleUpload}
              disabled={uploading}
              size="lg"
              className="w-full bg-[#2563EB] hover:bg-[#1E3A8A]"
            >
              {uploading ? 'Uploading...' : 'Start Verification'}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-[#E5E7EB] bg-blue-50/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-6 h-6 text-[#2563EB]" />
            <CardTitle className="text-[#1E3A8A]">File Format Guidelines</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Required Format:</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• First column should contain email addresses</li>
              <li>• Header row is optional but recommended</li>
              <li>• One email per row</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example CSV:</h4>
            <pre className="bg-white p-3 rounded-lg border border-[#E5E7EB] text-sm overflow-x-auto">
{`email
user1@example.com
user2@example.com
user3@example.com`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Processing Time:</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Small lists (&lt;100 emails): ~30 seconds</li>
              <li>• Medium lists (100-1000 emails): 1-5 minutes</li>
              <li>• Large lists (&gt;1000 emails): 5-15 minutes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
