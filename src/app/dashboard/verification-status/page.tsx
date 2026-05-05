'use client';

import { CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';

export default function VerificationStatusPage() {
  const verifications = [
    {
      id: 1,
      name: 'SolaPump Pro',
      category: 'Afro-Innovation',
      image: '🌞',
      status: 'verified'
    },
    {
      id: 2,
      name: 'AquaPure Filter System',
      category: 'Afro-Innovation',
      image: '💧',
      status: 'verified'
    },
    {
      id: 3,
      name: 'EcoBrick Builder',
      category: 'Afro-Innovation',
      image: '🏗️',
      status: 'pending'
    },
    {
      id: 4,
      name: 'Dr. Amara Okafor - Scientist',
      category: 'Scientist / Technologist',
      image: '👩‍🔬',
      status: 'verified'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 lg:p-8">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-8">Verification Status</h1>
        {/* Verification Items */}
        <div className="space-y-4 mb-8">
          {verifications.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 lg:p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Image/Icon */}
                <div className="hidden lg:flex w-16 h-16 bg-gray-100 rounded-lg items-center justify-center text-3xl shrink-0">
                  {item.image}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-xs lg:text-sm text-gray-600">{item.category}</p>
                </div>
              </div>

              {/* Status Badge */}
              {item.status === 'verified' ? (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-xs font-semibold text-green-600">Verified</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 rounded-full">
                  <AlertCircle size={16} className="text-yellow-600" />
                  <span className="text-xs font-semibold text-yellow-600">Pending Verification</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* How Verification Works */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mt-8">
          <div className="flex items-start gap-3 mb-4">
            <ShieldCheck className="text-blue-600 shrink-0 mt-0.5" />
            <h3 className="text-lg font-bold text-gray-900">How Verification Works</h3>
          </div>

          <p className="text-xs lg:text-sm text-gray-700 mb-4">
            Profiles are verified after review by the AfriScience Hub team. Once verified, your profile will display a{' '}
            <span className="font-semibold">Verified Badge</span> and become publicly trusted on the platform.
          </p>

          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full shrink-0">
                1
              </span>
              <span className="text-xs lg:text-sm text-gray-700">Submit your listing with complete information</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full shrink-0">
                2
              </span>
              <span className="text-xs lg:text-sm text-gray-700">Our team reviews the accuracy and quality of your submission</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full shrink-0">
                3
              </span>
              <span className="text-xs lg:text-sm text-gray-700">Once approved, a Verified badge appears on your profile</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full shrink-0">
                4
              </span>
              <span className="text-xs lg:text-sm text-gray-700">Verified listings rank higher in search results</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
