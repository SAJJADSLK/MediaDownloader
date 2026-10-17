export const metadata = {
  title: 'Terms of Service — MediaHub',
  description: 'Terms and conditions governing the use of the MediaHub platform and services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#09090b] py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8 text-neutral-300">
        <div className="border-b border-white/[0.08] pb-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">Terms of Service</h1>
          <p className="text-sm text-neutral-400">Effective Date: October 17, 2026</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">1. Agreement to Terms</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            By accessing or using MediaHub (&quot;the Service&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use immediately.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">2. Third-Party Trademarks & Non-Affiliation Disclaimer</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            MediaHub is an independent web application and is <strong>not affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with TikTok, ByteDance Ltd., Instagram, Meta Platforms, Inc., or Yandex/Дзен.
          </p>
          <p className="text-sm leading-relaxed text-neutral-400">
            All product and company names, trademarks, and registered trademarks are the property of their respective holders. Use of them does not imply any affiliation with or endorsement by them.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">3. Acceptable Use Policy</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            You agree to use MediaHub strictly for legitimate personal archiving, academic analysis, or fair-use commentary. You agree that you will not:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-400">
            <li>Download or distribute copyright-protected assets without appropriate authorization or fair-use justification.</li>
            <li>Use automated scrapers, bots, or excessive high-frequency script calls that disrupt service availability.</li>
            <li>Attempt to bypass security headers, rate limiters, or access unauthorized private content.</li>
            <li>Monetize or redistribute downloaded materials in violation of third-party intellectual property rights.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">4. Disclaimer of Warranties</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            The service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that service operations will be uninterrupted, error-free, or continuously compatible with third-party platform API changes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">5. Limitation of Liability</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            To the maximum extent permitted by applicable law, MediaHub and its maintainers shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of the service.
          </p>
        </section>

        <section className="space-y-4 border-t border-white/[0.08] pt-6">
          <h2 className="text-xl font-bold text-white">6. Inquiries & Notice</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            If you have questions regarding these Terms, please contact us at <code className="text-violet-400">legal@mediahub.tools</code>.
          </p>
        </section>
      </div>
    </div>
  );
}

