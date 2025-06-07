/* eslint-disable no-unused-vars */
import React from 'react';
import { Shield, Lock, Eye, Users, FileText, Mail, Calendar, CheckCircle } from 'lucide-react';
import Footer from '../../components/common/Footer';
const PrivacyPolicy = () => {
  const sections = [
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            We collect personal information that you provide to us, such as name, email address, contact information, and payment information. We collect personal information when you register for our services, create or consume educational content, rate content, participate in activities on the platform, or otherwise contact us.
          </p>
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-blue-400 font-medium mb-2">Types of Information:</h4>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Personal identifiers (name, email, phone)</li>
              <li>• Account credentials and preferences</li>
              <li>• Educational progress and performance data</li>
              <li>• Payment and billing information</li>
              <li>• Usage analytics and interaction data</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: <Eye className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            We use personal information collected via our platform for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4">
              <h4 className="text-purple-400 font-medium mb-2">Service Delivery</h4>
              <p className="text-gray-300 text-sm">Providing personalized learning experiences and course recommendations</p>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
              <h4 className="text-green-400 font-medium mb-2">Communication</h4>
              <p className="text-gray-300 text-sm">Sending updates, notifications, and educational content</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sharing-information',
      title: 'Sharing Your Information',
      icon: <Users className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            We may process or share data based on the following legal basis:
          </p>
          <div className="space-y-3">
            {[
              {
                title: 'Consent',
                description: 'We may process your data if you have given us specific consent to use your personal information for a specific purpose.',
                color: 'blue'
              },
              {
                title: 'Legitimate Interests',
                description: 'We may process your data when it is reasonably necessary to achieve our legitimate business interests.',
                color: 'purple'
              },
              {
                title: 'Performance of a Contract',
                description: 'Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.',
                color: 'green'
              },
              {
                title: 'Legal Obligations',
                description: 'We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.',
                color: 'orange'
              }
            ].map((item, index) => (
              <div key={index} className={`bg-${item.color}-500/5 border border-${item.color}-500/20 rounded-lg p-4`}>
                <div className="flex items-start gap-3">
                  <CheckCircle className={`w-5 h-5 text-${item.color}-400 mt-0.5 flex-shrink-0`} />
                  <div>
                    <h4 className={`text-${item.color}-400 font-medium mb-1`}>{item.title}</h4>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'data-security',
      title: 'Security of Your Information',
      icon: <Lock className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
          </p>
          <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <h4 className="text-red-400 font-medium mb-1">Security Measures</h4>
                <p className="text-gray-300 text-sm">We employ industry-standard encryption, secure servers, and regular security audits to protect your data.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            Depending on your location, you may have certain rights regarding your personal information:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Right to access your personal data',
              'Right to correct inaccurate data',
              'Right to delete your personal data',
              'Right to restrict processing',
              'Right to data portability',
              'Right to object to processing'
            ].map((right, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-3">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">{right}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'contact-us',
      title: 'Contact Us',
      icon: <Mail className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            If you have questions or comments about this policy, please don't hesitate to contact us:
          </p>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a href="mailto:privacy@brainn.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                  privacy@brainn.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">Privacy Officer, Brainn Platform</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br via-black from-indigo-900 to-violet-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2px, transparent 0), 
                           radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2px, transparent 0)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4 py-2">
              Privacy Policy
            </h1>
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Last updated: June, 2025</span>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Welcome to Brainn. We are committed to protecting your personal information and your right to privacy.
              This policy explains how we collect, use, and safeguard your data.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">

            {/* Table of Contents */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-6 border-b border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4">Table of Contents</h2>
              <div className="grid md:grid-cols-2 gap-2">
                {sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="text-blue-400 group-hover:text-blue-300">
                      {section.icon}
                    </div>
                    <span className="text-gray-300 group-hover:text-white text-sm">
                      {section.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="p-6 space-y-12">
              {sections.map((section, index) => (
                <section key={section.id} id={section.id} className="scroll-mt-20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-semibold text-white">
                      {section.title}
                    </h2>
                  </div>
                  <div className="ml-13">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;