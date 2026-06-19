import { Cookie, Settings, Info, Mail } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-neutral-bg-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mb-4">
            <Cookie className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-black mb-3">
            Cookie Policy
          </h1>
          <p className="text-lg text-neutral-gray-dark max-w-2xl mx-auto">
            Learn how we use cookies to improve your experience on AfriScience Hub.
          </p>
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm p-8 md:p-12 space-y-8">
          
          {/* Section 1 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-brand-red-100 flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-brand-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-black mb-2">1. Introduction</h2>
                <p className="text-neutral-gray-dark leading-relaxed">
                  Our platform uses cookies to improve site functionality and user experience.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Cookie className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-black mb-2">2. What Are Cookies?</h2>
                <p className="text-neutral-gray-dark leading-relaxed">
                  Cookies are small text files stored on your device that help us remember preferences and understand how you use our site.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-black mb-3">3. How We Use Cookies</h2>
            <p className="text-neutral-gray-dark leading-relaxed mb-3">
              We use cookies to:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <span className="text-brand-red-600 font-bold">•</span>
                <span className="text-neutral-gray-dark">Keep you signed in.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-red-600 font-bold">•</span>
                <span className="text-neutral-gray-dark">Remember user preferences and language settings.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-red-600 font-bold">•</span>
                <span className="text-neutral-gray-dark">Analyze traffic to improve features.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-red-600 font-bold">•</span>
                <span className="text-neutral-gray-dark">Display relevant science and technology contents.</span>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Settings className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-black mb-2">4. Managing Cookies</h2>
                <p className="text-neutral-gray-dark leading-relaxed">
                  You can modify your browser settings to accept, block, or delete cookies. However, some site functions may not work properly if cookies are disabled.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-black mb-2">5. Policy Updates</h2>
            <p className="text-neutral-gray-dark leading-relaxed">
              We may revise this Cookie Policy to reflect platform improvements.
            </p>
          </section>

          {/* Section 6 */}
          <section className="pt-6 border-t border-neutral-gray-light">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-navy-900 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-black mb-2">6. Contact</h2>
                <p className="text-neutral-gray-dark leading-relaxed">
                  If you have questions about our use of cookies, reach us at{' '}
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

        {/* Info Box */}
        <div className="mt-8 p-6 rounded-xl bg-orange-50 border border-orange-100">
          <div className="flex items-start gap-3">
            <Cookie className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-neutral-black mb-1">Cookie Preferences</h3>
              <p className="text-sm text-neutral-gray-dark">
                Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. Check your browser's help section for more information.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
