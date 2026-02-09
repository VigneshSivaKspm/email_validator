import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Button } from '../components/ui/button';
import { Book, Code, Mail, HelpCircle, ExternalLink } from 'lucide-react';

export const DocsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8FAFC] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Documentation & Help Center
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to get started with VerifyMail
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Book,
              title: 'Getting Started',
              description: 'Learn the basics',
              color: 'blue',
            },
            {
              icon: Code,
              title: 'API Reference',
              description: 'Developer docs',
              color: 'green',
            },
            {
              icon: Mail,
              title: 'Email Support',
              description: 'Contact us',
              color: 'amber',
            },
            {
              icon: HelpCircle,
              title: 'FAQ',
              description: 'Common questions',
              color: 'blue',
            },
          ].map((item, index) => {
            const Icon = item.icon;
            const colorClasses = {
              blue: 'bg-blue-50 text-[#2563EB]',
              green: 'bg-green-50 text-green-600',
              amber: 'bg-amber-50 text-amber-600',
            };

            return (
              <Card key={index} className="border-[#E5E7EB] hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-xl ${colorClasses[item.color as keyof typeof colorClasses]} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white border border-[#E5E7EB] rounded-xl px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#2563EB]">
                How does email verification work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                Our email verification process consists of multiple validation steps: syntax checking, domain validation, MX record verification, disposable email detection, role-based identification, and catch-all detection. Each email is assigned a confidence score and status (Valid, Invalid, Risky, or Unknown) based on these checks.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white border border-[#E5E7EB] rounded-xl px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#2563EB]">
                What file formats are supported for bulk uploads?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                We support CSV (.csv) and Excel (.xlsx, .xls) file formats. Your file should contain email addresses in a column, and we'll automatically detect and process them. Maximum file size is 100MB or 500,000 emails per upload.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white border border-[#E5E7EB] rounded-xl px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#2563EB]">
                How accurate is the verification?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                Our verification accuracy is 99.9%. We use advanced algorithms and real-time checks to ensure the highest quality results. Each email receives a confidence score indicating the reliability of the verification.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white border border-[#E5E7EB] rounded-xl px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#2563EB]">
                What happens to my data?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                We take data privacy seriously. All data is encrypted in transit and at rest. We never share or sell your data to third parties. You can delete your data at any time from your account settings. We're GDPR and SOC 2 compliant.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white border border-[#E5E7EB] rounded-xl px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#2563EB]">
                Do you offer an API?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                Yes! Business and Enterprise plans include API access. Our REST API allows you to integrate email verification directly into your applications. Full documentation is available for authenticated users.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white border border-[#E5E7EB] rounded-xl px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#2563EB]">
                How long does bulk verification take?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                Processing time depends on list size. On average, we process 10,000-20,000 emails per minute. You'll receive real-time progress updates and can download results as soon as processing is complete.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-white border border-[#E5E7EB] rounded-xl px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#2563EB]">
                What if I need help or support?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                Free plan users have access to email support (24-48 hour response time). Business plan users get priority support. Enterprise customers receive dedicated account management and 24/7 premium support with guaranteed SLAs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-white border border-[#E5E7EB] rounded-xl px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#2563EB]">
                Can I export my verification results?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                Yes! You can export results in multiple formats: CSV, Excel, or PDF reports. You can also filter results to download only valid emails, or segment by status (valid/invalid/risky).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* API Documentation Preview */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">API Documentation</h2>
          
          <Card className="border-[#E5E7EB] mb-6">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">RESTful API</h3>
                  <p className="text-gray-600">
                    Integrate email verification into your application with our simple REST API.
                  </p>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 mb-6 overflow-x-auto">
                <pre className="text-sm text-green-400">
                  <code>{`POST https://api.verifymail.com/v1/verify

{
  "email": "user@example.com"
}

Response:
{
  "status": "valid",
  "email": "user@example.com",
  "format_valid": true,
  "domain_exists": true,
  "mx_record_found": true,
  "disposable": false,
  "role_based": false,
  "catch_all": false,
  "confidence": 95
}`}</code>
                </pre>
              </div>

              <Button className="bg-[#2563EB] hover:bg-[#1E3A8A]">
                View Full API Documentation
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] border-none">
            <CardContent className="p-12 text-center">
              <Mail className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-blue-100 mb-6 text-lg">
                Our support team is here to help you 24/7
              </p>
              <Button size="lg" className="bg-white text-[#2563EB] hover:bg-gray-100">
                Contact Support
              </Button>
              <p className="text-sm text-blue-100 mt-4">
                Email: support@verifymail.com
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
