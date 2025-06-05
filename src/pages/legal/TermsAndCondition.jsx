import React, { useState } from 'react'

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState(null)

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section)
  }

  const lastUpdated = "June 5, 2025"

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms & Conditions</h1>
          <p className="text-lg text-gray-400 mb-4">
            Please read these terms carefully before using our services
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-900/30 rounded-full border border-blue-700">
            <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-blue-300">Last updated: {lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Quick Navigation */}
        <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { id: 'agreement', title: 'Agreement to Terms' },
              { id: 'services', title: 'Use of Services' },
              { id: 'accounts', title: 'User Accounts' },
              { id: 'conduct', title: 'User Conduct' },
              { id: 'content', title: 'Content & IP' },
              { id: 'privacy', title: 'Privacy Policy' },
              { id: 'payments', title: 'Payments & Billing' },
              { id: 'termination', title: 'Termination' },
              { id: 'liability', title: 'Liability' }
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center p-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors duration-200 text-sm font-medium text-gray-300 hover:text-blue-400"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {item.title}
              </a>
            ))}
          </div>
        </div>

        {/* Section Template */}
        <div className="space-y-6">
          {/* Introduction */}
          <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8">
            <p className="text-lg leading-relaxed text-gray-300">
              Welcome to our platform. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access our services.
            </p>
          </div>

          {/* Section Example */}
          <div id="agreement" className="bg-gray-900 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
            <button
              onClick={() => toggleSection('agreement')}
              className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-700 transition-colors duration-200"
            >
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">1</span>
                Agreement to Terms
              </h2>
              <svg className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${activeSection === 'agreement' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeSection === 'agreement' && (
              <div className="px-8 pb-6">
                <p className="text-gray-300 mb-2">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
                <ul className="list-disc ml-6 text-gray-300 space-y-1">
                  <li>You must be at least 18 years old</li>
                  <li>Provide accurate and complete information</li>
                  <li>You're responsible for maintaining confidentiality</li>
                </ul>
              </div>
            )}
          </div>
          <div id="eligibility" className="bg-gray-900 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
            <button
              onClick={() => toggleSection('eligibility')}
              className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800 transition-colors duration-200"
            >
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">2</span>
                Eligibility
              </h2>
              <svg className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${activeSection === 'eligibility' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeSection === 'eligibility' && (
              <div className="px-8 pb-6 prose prose-invert max-w-none">
                <p>
                  You must be at least 13 years old (or the minimum legal age in your country) to use our services.
                </p>
                <ul>
                  <li>By using this site, you represent that you meet the eligibility requirements.</li>
                  <li>If you’re under the age of majority, you must have a parent or guardian’s permission.</li>
                </ul>
              </div>
            )}
          </div>
          <div id="accounts" className="bg-gray-900 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
            <button
              onClick={() => toggleSection('accounts')}
              className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800 transition-colors duration-200"
            >
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">3</span>
                User Accounts
              </h2>
              <svg className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${activeSection === 'accounts' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeSection === 'accounts' && (
              <div className="px-8 pb-6 prose prose-invert max-w-none">
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
                </p>
                <ul>
                  <li>Do not share your password with others.</li>
                  <li>Notify us immediately of unauthorized use.</li>
                  <li>We may suspend or terminate accounts that violate these terms.</li>
                </ul>
              </div>
            )}
          </div>

          <div id="conduct" className="bg-gray-900 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
            <button
              onClick={() => toggleSection('conduct')}
              className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800 transition-colors duration-200"
            >
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">4</span>
                User Conduct
              </h2>
              <svg className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${activeSection === 'conduct' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeSection === 'conduct' && (
              <div className="px-8 pb-6 prose prose-invert max-w-none">
                <p>
                  You agree not to use the service for any unlawful purposes or in a way that could harm others.
                </p>
                <ul>
                  <li>No harassment, abuse, or harm to others</li>
                  <li>No spam, malware, or unauthorized access</li>
                  <li>Respect the rights of other users</li>
                </ul>
              </div>
            )}
          </div>

          <div id="content" className="bg-gray-900 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
            <button
              onClick={() => toggleSection('content')}
              className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800 transition-colors duration-200"
            >
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <span className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">5</span>
                Content & IP
              </h2>
              <svg className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${activeSection === 'content' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeSection === 'content' && (
              <div className="px-8 pb-6 prose prose-invert max-w-none">
                <p>
                  All content, trademarks, and intellectual property are owned by or licensed to the company.
                </p>
                <ul>
                  <li>You may not copy or distribute content without permission</li>
                  <li>All rights reserved unless otherwise stated</li>
                </ul>
              </div>
            )}
          </div>
          <div id="privacy" className="bg-gray-900 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
            <button
              onClick={() => toggleSection('privacy')}
              className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800 transition-colors duration-200"
            >
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <span className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">6</span>
                Privacy Policy
              </h2>
              <svg className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${activeSection === 'privacy' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeSection === 'privacy' && (
              <div className="px-8 pb-6 prose prose-invert max-w-none">
                <p>
                  We value your privacy. Please refer to our Privacy Policy for details on how your data is handled.
                </p>
                <ul>
                  <li>Personal data is collected with consent</li>
                  <li>We implement measures to secure your data</li>
                  <li>You have rights to access and delete your data</li>
                </ul>
              </div>
            )}
          </div>
          <div id="payments" className="bg-gray-900 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
            <button
              onClick={() => toggleSection('payments')}
              className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800 transition-colors duration-200"
            >
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">7</span>
                Payments & Billing
              </h2>
              <svg className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${activeSection === 'payments' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeSection === 'payments' && (
              <div className="px-8 pb-6 prose prose-invert max-w-none">
                <p>
                  All payments are processed securely. Charges are based on the plan or service selected.
                </p>
                <ul>
                  <li>All fees are non-refundable unless otherwise stated</li>
                  <li>Billing issues must be reported within 14 days</li>
                </ul>
              </div>
            )}
          </div>

          <div id="termination" className="bg-gray-900 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
            <button
              onClick={() => toggleSection('termination')}
              className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800 transition-colors duration-200"
            >
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <span className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">8</span>
                Termination
              </h2>
              <svg className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${activeSection === 'termination' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeSection === 'termination' && (
              <div className="px-8 pb-6 prose prose-invert max-w-none">
                <p>
                  We reserve the right to suspend or terminate your access to our services for any reason, including violation of these terms.
                </p>
                <ul>
                  <li>Accounts may be terminated without notice</li>
                  <li>All provisions that should survive termination will continue to apply</li>
                </ul>
              </div>
            )}
          </div>
          <div id="liability" className="bg-gray-900 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
            <button
              onClick={() => toggleSection('liability')}
              className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800 transition-colors duration-200"
            >
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">9</span>
                Liability
              </h2>
              <svg className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${activeSection === 'liability' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeSection === 'liability' && (
              <div className="px-8 pb-6 prose prose-invert max-w-none">
                <p>
                  We are not liable for any indirect, incidental, or consequential damages arising out of your use of the service.
                </p>
                <ul>
                  <li>Service is provided “as is”</li>
                  <li>No warranties are made regarding functionality or availability</li>
                </ul>
              </div>
            )}
          </div>

          {/* Add more sections similarly... */}

          {/* Contact */}
          <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Questions About These Terms?</h2>
            <p className="text-gray-400 mb-6">If you have any questions, please contact us.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:legal@company.com"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Legal Team
              </a>
              <a
                href="/privacy-policy"
                className="inline-flex items-center px-6 py-3 border border-gray-600 hover:bg-gray-700 text-gray-300 font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-500">
            © 2025 Brainn. All rights reserved. | Effective: {lastUpdated}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditions
