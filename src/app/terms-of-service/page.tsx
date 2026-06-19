import { FileText, Shield, User, AlertCircle, Gavel, Mail } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-neutral-bg-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-navy-100 mb-4">
            <FileText className="h-8 w-8 text-brand-navy-900" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-black mb-3">
            Terms of Service
          </h1>
          <p className="text-lg text-neutral-gray-dark max-w-2xl mx-auto">
            Please read these terms carefully before using AfriScience Hub. By using our platform, you agree to these terms.
          </p>
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm p-8 md:p-12 space-y-8">
          
          {/* Section 1 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-brand-red-100 flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-brand-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-black mb-2">1. Overview</h2>
                <p className="text-neutral-gray-dark leading-relaxed">
                  These Terms govern your use of AfriScience Hub, including access to academic institutes, professionals, specialist centers, innovations, competitions, and awards.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-black mb-2">2. Acceptance of Terms</h2>
                <p className="text-neutral-gray-dark leading-relaxed">
                  By using our platform, you agree to comply with these Terms of Service and all applicable laws.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-black mb-2">3. Eligibility and Account Responsibilities</h2>
                <p className="text-neutral-gray-dark leading-relaxed">
                  Users must provide accurate information when registering. You are responsible for maintaining the confidentiality of your login credentials.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-black mb-3">4. Use of the Platform</h2>
            <p className="text-neutral-gray-dark leading-relaxed mb-3">
              Our platform is designed to support learning, discovery, and healthy academic competition. You agree to use it only for lawful and educational purposes, including:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <span className="text-brand-red-600 font-bold">•</span>
                <span className="text-neutral-gray-dark">Accessing verified school listings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-red-600 font-bold">•</span>
                <span className="text-neutral-gray-dark">Reaching out to professionals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-red-600 font-bold">•</span>
                <span className="text-neutral-gray-dark">Accessing specialist centers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-red-600 font-bold">•</span>
                <span className="text-neutral-gray-dark">Publicizing innovations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-red-600 font-bold">•</span>
                <span className="text-neutral-gray-dark">Registering for science competitions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-red-600 font-bold">•</span>
                <span className="text-neutral-gray-dark">Giving donations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-red-600 font-bold">•</span>
                <span className="text-neutral-gray-dark">Seeking partnerships</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-red-600 font-bold">•</span>
                <span className="text-neutral-gray-dark">Volunteering</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-red-600 font-bold">•</span>
                <span className="text-neutral-gray-dark">Obtaining awards</span>
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-black mb-2">5. Intellectual Property</h2>
            <p className="text-neutral-gray-dark leading-relaxed">
              All materials on this site—including text, logos, images, and databases—are protected by copyright laws and belong to AfriScience Hub or its partners.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-black mb-3">6. User Conduct</h2>
                <p className="text-neutral-gray-dark leading-relaxed mb-3">
                  You agree not to:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-red-600 font-bold">•</span>
                    <span className="text-neutral-gray-dark">Upload false, misleading, or plagiarized content.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-red-600 font-bold">•</span>
                    <span className="text-neutral-gray-dark">Misuse any information about listed individuals and establishments.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-red-600 font-bold">•</span>
                    <span className="text-neutral-gray-dark">Attempt to hack, disrupt, or exploit the site.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-black mb-2">7. Disclaimers and Limitation of Liability</h2>
            <p className="text-neutral-gray-dark leading-relaxed">
              We provide science/technology based information and resources "as is." We are not liable for any loss resulting from use of the platform, listings, or external content.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-black mb-2">8. Termination</h2>
            <p className="text-neutral-gray-dark leading-relaxed">
              We reserve the right to suspend or terminate any account that violates these terms.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Gavel className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-black mb-2">9. Governing Law</h2>
                <p className="text-neutral-gray-dark leading-relaxed">
                  These Terms are governed by the laws of Nigeria, without regard to conflict of law principles.
                </p>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section className="pt-6 border-t border-neutral-gray-light">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-navy-900 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-black mb-2">10. Contact</h2>
                <p className="text-neutral-gray-dark leading-relaxed">
                  For inquiries, email us at{' '}
                  <a href="mailto:support@afrisciencehub.com" className="text-brand-red-600 hover:underline font-medium">
                    support@afrisciencehub.com
                  </a>
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Last Updated */}
        <div className="text-center mt-8">
          <p className="text-sm text-neutral-gray-medium">
            Last updated: April 4, 2026
          </p>
        </div>

      </div>
    </div>
  );
}
