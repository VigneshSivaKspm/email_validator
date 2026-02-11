import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  CheckCircle2, 
  Shield, 
  Zap, 
  FileCheck, 
  TrendingUp, 
  Users,
  Star,
  ArrowRight
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8FAFC]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#2563EB] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              #1 Email Verification Platform
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Verify Emails.<br />
              Reduce Bounce Rates.<br />
              <span className="text-[#2563EB]">Improve Deliverability.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Professional email verification and bulk list cleaning service trusted by over 50,000+ businesses worldwide. Validate email addresses in real-time with 99.9% accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-[#2563EB] hover:bg-[#1E3A8A] text-lg px-8 py-6">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-[#E5E7EB]">
                  View Pricing
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                1,000 free credits
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] rounded-3xl blur-3xl opacity-20"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1763568258367-1c52beb60be7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWFpbCUyMG1hcmtldGluZyUyMHByb2Zlc3Npb25hbCUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzA2NTg0OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Email Verification Dashboard"
              className="relative rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Email Validation
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to maintain a clean and verified email list
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: CheckCircle2,
              title: 'Format Validation',
              description: 'Instant syntax and format checking to ensure emails meet RFC standards.',
              color: 'blue',
            },
            {
              icon: Shield,
              title: 'Domain & MX Checks',
              description: 'Verify domain existence and MX records to confirm email deliverability.',
              color: 'green',
            },
            {
              icon: FileCheck,
              title: 'Disposable Detection',
              description: 'Identify and filter out temporary and disposable email addresses.',
              color: 'amber',
            },
            {
              icon: Users,
              title: 'Role-Based Detection',
              description: 'Flag generic role-based emails like admin@, info@, and sales@.',
              color: 'blue',
            },
            {
              icon: Zap,
              title: 'Bulk List Cleaning',
              description: 'Upload and verify thousands of emails in minutes with our batch processing.',
              color: 'green',
            },
            {
              icon: TrendingUp,
              title: 'Advanced Analytics',
              description: 'Detailed reports and insights on your email list quality and health.',
              color: 'amber',
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              blue: 'bg-blue-50 text-[#2563EB]',
              green: 'bg-green-50 text-green-600',
              amber: 'bg-amber-50 text-amber-600',
            };

            return (
              <Card key={index} className="border-[#E5E7EB] hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-2xl ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '50,000+', label: 'Active Users' },
              { value: '1.2B+', label: 'Emails Verified' },
              { value: '99.9%', label: 'Accuracy Rate' },
              { value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600">
            See what our customers have to say
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Sarah Johnson',
              role: 'Marketing Director',
              company: 'TechCorp Inc.',
              text: 'VerifyMail reduced our bounce rate from 12% to under 2%. The ROI is incredible.',
              rating: 5,
            },
            {
              name: 'Michael Chen',
              role: 'Email Campaign Manager',
              company: 'GrowthLabs',
              text: 'Best email verification tool we\'ve used. The bulk processing is lightning fast.',
              rating: 5,
            },
            {
              name: 'Emily Rodriguez',
              role: 'CTO',
              company: 'DataSync Solutions',
              text: 'Professional-grade accuracy and excellent API documentation. Highly recommended.',
              rating: 5,
            },
          ].map((testimonial, index) => (
            <Card key={index} className="border-[#E5E7EB] hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-[#2563EB]">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] border-none">
          <CardContent className="p-12 lg:p-16 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Clean Your Email List?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that trust VerifyMail for their email verification needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-[#2563EB] hover:bg-gray-100 text-lg px-8 py-6">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  View Documentation
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
