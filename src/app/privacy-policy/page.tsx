import { Shield, Mail, Lock, Eye, Users, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-neutral-bg-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-black mb-3">
            Privacy Policy
          </h1>
          <p className="text-lg text-neutral-gray-dark max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
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
                <h2 className="text-2xl font-bold text-neutral-black mb-2">1. Introduction</h2>
                <p className="text-neutral-gray-dark leading-relaxed">
                  Welcome to AfriScience Hub, a science and technology based platform designed to connect learners, professionals, innovators and institutions. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit or interact with our platform.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-black mb-3">2. Information We Collect</h2>
                <p className="text-neutral-gray-dark leading-relaxed mb-3">
                  We collect information to improve user experience and maintain platform security. This may include:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-red-600 font-bold">•</span>
                    <span className="text-neutral-gray-dark">
                      <strong className="text-neutral-black">Personal Information:</strong> name, email, contact details, qualifications, age, expertise, and account credentials.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-red-600 font-bold">•</span>
                    <span className="text-neutral-gray-dark">
                      <strong className="text-neutral-black">Non-Personal Information:</strong> browser type, IP address, device information, and interaction data.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-black mb-3">3. How We Use Your Information</h2>
                <p className="text-neutral-gray-dark leading-relaxed mb-3">
                  We use collected data to:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-red-600 font-bold">•</span>
                    <span className="text-neutral-gray-dark">Create and manage user accounts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-red-600 font-bold">•</span>
                    <span className="text-neutral-gray-dark">Verify and list institutes, professionals, specialist centers and innovations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-red-600 font-bold">•</span>
                    <span className="text-neutral-gray-dark">Register participants for competitions and events.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-red-600 font-bold">•</span>
                    <span className="text-neutral-gray-dark">Connect similar expertise.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-red-600 font-bold">•</span>
                    <span className="text-neutral-gray-dark">Analyze usage to enhance learning tools and platform features.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-red-600 font-bold">•</span>
                    <span className="text-neutral-gray-dark">Communicate updates, opportunities, or events.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-black mb-3">4. Data Sharing and Disclosure</h2>
            <p className="text-neutral-gray-dark leading-relaxed mb-3">
              We do not sell your data. However, we may share limited information:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <span className="text-brand-red-600 font-bold">•</span>
                <span className="text-neutral-gray-dark">With verified partners and sponsors to facilitate services we offer to our users especially in areas like competitions, awards and innovations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-red-600 font-bold">•</span>
                <span className="text-neutral-gray-dark">When required by law or government authorities.</span>
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Lock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-black mb-2">5. Data Storage and Security</h2>
                <p className="text-neutral-gray-dark leading-relaxed">
                  Your information is stored securely and protected using modern encryption and access control methods. Only authorized personnel can access personal data.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-black mb-2">6. Children's Privacy</h2>
            <p className="text-neutral-gray-dark leading-relaxed">
              We recognize the importance of protecting minors. For users under 18, parental or institutional consent may be required before registration or participation.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-black mb-2">7. Your Data Rights</h2>
            <p className="text-neutral-gray-dark leading-relaxed">
              You can request to access, update, or delete your data at any time by contacting our support team at{' '}
              <a href="mailto:support@afrisciencehub.com" className="text-brand-red-600 hover:underline font-medium">
                support@afrisciencehub.com
              </a>
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-black mb-2">8. Third-Party Links</h2>
            <p className="text-neutral-gray-dark leading-relaxed">
              Our platform may contain links to educational and other science-related resources. We are not responsible for the privacy practices of external websites.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-black mb-2">9. Policy Updates</h2>
            <p className="text-neutral-gray-dark leading-relaxed">
              We may update this policy occasionally. The latest version will always be available on this page.
            </p>
          </section>

          {/* Section 10 */}
          <section className="pt-6 border-t border-neutral-gray-light">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-navy-900 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-black mb-2">10. Contact Us</h2>
                <p className="text-neutral-gray-dark leading-relaxed">
                  For privacy concerns or requests, email{' '}
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
