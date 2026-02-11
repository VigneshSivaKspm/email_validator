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
  ArrowRight,
  Server,
  Lock,
  Globe,
  AlertTriangle,
  Search,
  Activity
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
              <Activity className="w-4 h-4 animate-pulse" />
              Advanced Multi-Layer Verification Active
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Hyper-Accurate<br />
              Email Validation<br />
              <span className="text-[#2563EB]">For Modern Growth.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Go beyond simple syntax checks. Our 7-layer verification engine performs SMTP handshakes, DNS security audits, and data breach checks to ensure 99.9% deliverability.
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
            The World's Most Comprehensive Verification Engine
          </h2>
          <p className="text-xl text-gray-600">
            Our 7-layer technology stacks deep technical checks to guarantee your sender reputation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Server,
              title: 'SMTP Deep Handshake',
              description: 'We connect directly to the recipient mail server to verify inbox existence without sending an email.',
              color: 'blue',
            },
            {
              icon: Shield,
              title: 'DNS Security Audit',
              description: 'Real-time analysis of SPF, DKIM, and DMARC records to evaluate sender trustworthiness.',
              color: 'green',
            },
            {
              icon: Lock,
              title: 'Data Breach Detection',
              description: 'Integrated with HaveIBeenPwned to identify if an email has been compromised in known breaches.',
              color: 'amber',
            },
            {
              icon: Globe,
              title: 'Domain Reputation',
              description: 'Checks domain age, WHOIS history, and TLD reputation to filter out new or "burner" domains.',
              color: 'blue',
            },
            {
              icon: Search,
              title: 'Advanced Pattern AI',
              description: 'Detects gibberish local-parts, suspicious character density, and bot-generated patterns.',
              color: 'green',
            },
            {
              icon: Activity,
              title: 'Deliverability Scoring',
              description: 'A unique 0-100 score weighing all 40+ data points to give you a definitive "Send" or "Skip" signal.',
              color: 'amber',
            },
            {
              icon: FileCheck,
              title: 'Disposable Filter',
              description: 'Real-time discovery of temporary and disposable email providers updated every 24 hours.',
              color: 'blue',
            },
            {
              icon: Users,
              title: 'Role-Based Detection',
              description: 'Identify generic roles (admin, support, sales) to segment personal vs. commercial outreach.',
              color: 'green',
            },
            {
              icon: TrendingUp,
              title: 'Typo Correction',
              description: 'Intelligently suggests corrections for misspelled domains like gnail.com or hotmial.com.',
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
              <Card key={index} className="border-[#E5E7EB] border-opacity-50 hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all hover:-translate-y-2 group">
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-2xl ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Innovation Section: The 7-Step Journey */}
      <section className="bg-slate-900 py-24 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[128px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our 7-Layer Intelligence Stack
            </h2>
            <p className="text-xl text-slate-400">
              How we achieve industry-leading 99.9% accuracy
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent -translate-y-1/2"></div>
            
            <div className="grid lg:grid-cols-7 gap-4 relative">
              {[
                { step: '01', title: 'Syntax', icon: CheckCircle2, desc: 'RFC Compliance' },
                { step: '02', title: 'Risk', icon: AlertTriangle, desc: 'Disposable Check' },
                { step: '03', title: 'DNS', icon: Globe, desc: 'MX & Security' },
                { step: '04', title: 'SMTP', icon: Server, desc: 'Real-time Ping' },
                { step: '05', title: 'Rep', icon: TrendingUp, desc: 'Domain Age' },
                { step: '06', title: 'Security', icon: Shield, desc: 'Breach Check' },
                { step: '07', title: 'Score', icon: Star, desc: 'Final AI Score' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 relative z-20 shadow-xl">
                    <item.icon className="w-8 h-8" />
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-slate-900">{item.step}</span>
                  </div>
                  <h4 className="text-white font-bold mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
              <div className="bg-slate-900 px-8 py-4 rounded-full">
                <p className="text-slate-300 text-sm">
                  <span className="text-blue-400 font-bold">Pro Tip:</span> Our system completes all 7 steps in less than <span className="text-white font-bold tracking-tight">800ms</span>.
                </p>
              </div>
            </div>
          </div>
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
