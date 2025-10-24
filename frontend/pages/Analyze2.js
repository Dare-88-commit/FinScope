import React from 'react';
import Navbar from '../components/Navbar'; 
// import Footer from '../components/Footer'

export default function ScamDetectionResults() {
  const detectedIssues = [
    'Urgency keywords detected (e.g., "act now", "your account will be closed").',
    'Unverified domain or sender that doesn\'t match the claimed organization.',
    'Emotional manipulation pattern found (fear-of-loss, time pressure).',
    'Suspicious link structure with URL shortener and tracking parameters.'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
        <div>
            <Navbar />
        </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-8 pt-24 mt-20">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          RESULTS
        </h1>

        {/* Risk Alert Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            {/* Risk Score Arc */}
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <path
                    d="M 18 83 A 37 37 0 1 1 75 30"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="10"
                    strokeLinecap="round"
                    className="risk-arc"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center mt-4 pb-1 opacity-100 animate-[fadeIn_1.2s_forwards_0.4s]">
                  <div className="text-3xl font-bold text-red-600 leading-none">93%</div>
                  <div className="text-xs text-red-600 font-medium">Risk</div>
                </div>
              </div>
            </div>

            {/* Alert Banner */}
            <div className="flex-1 bg-red-500 rounded-full px-6 py-3 flex items-center">
              <div className="bg-white rounded-full p-1.5 mr-3">
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <span className="text-white font-semibold">
                High risk detected
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-8">
          This message shows multiple signs of a potential scam. Review the findings below and take action.
        </p>

        {/* What We Detected Section */}
        <div className="mb-8 border border-gray-200 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            What we detected
          </h2>
          <div className="space-y-3">
            {detectedIssues.map((issue, index) => (
              <div key={index} className="flex items-start gap-3">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-gray-700 text-sm leading-relaxed">{issue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Next Steps */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-4">
            Suggested next steps
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-sm font-medium text-blue-700">Block Sender</span>
            </button>

            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm font-medium">Scan Another Message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
