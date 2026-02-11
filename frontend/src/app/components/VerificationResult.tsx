import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, Mail, Globe, Server, Shield } from 'lucide-react';
import { EmailVerification } from '../context/AppContext';
import { StatusBadge } from './StatusBadge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface VerificationResultProps {
  result: EmailVerification;
}

export const VerificationResult: React.FC<VerificationResultProps> = ({ result }) => {
  return (
    <Card className="p-8 space-y-6">
      {/* Email and Status */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <div>
          <p className="text-2xl mb-2">{result.email}</p>
          <div className="flex justify-center">
            <StatusBadge status={result.status} />
          </div>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Confidence Score</span>
          <span className="font-medium">{result.confidence}%</span>
        </div>
        <Progress value={result.confidence} className="h-2" />
      </div>

      {/* Verification Checks */}
      <div className="space-y-3">
        <h4 className="text-sm text-muted-foreground mb-3">Verification Details</h4>
        
        <CheckItem
          icon={Mail}
          label="Format Valid"
          status={result.formatValid}
        />
        
        <CheckItem
          icon={Globe}
          label="Domain Exists"
          status={result.domainExists}
        />
        
        <CheckItem
          icon={Server}
          label="MX Record Found"
          status={result.mxRecordFound}
        />
        
        <CheckItem
          icon={Shield}
          label="Not Disposable"
          status={!result.disposable}
        />
        
        <CheckItem
          icon={AlertCircle}
          label="Not Role-Based"
          status={!result.roleBased}
        />
        
        <CheckItem
          icon={AlertCircle}
          label="Not Catch-All"
          status={!result.catchAll}
        />
      </div>

      {/* Reason */}
      <div className="pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground mb-1">Reason</p>
        <p className="text-sm">{result.reason}</p>
      </div>
    </Card>
  );
};

interface CheckItemProps {
  icon: React.ElementType;
  label: string;
  status: boolean;
}

const CheckItem: React.FC<CheckItemProps> = ({ icon: Icon, label, status }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm">{label}</span>
    </div>
    {status ? (
      <CheckCircle2 className="w-5 h-5 text-green-600" />
    ) : (
      <XCircle className="w-5 h-5 text-red-600" />
    )}
  </div>
);
