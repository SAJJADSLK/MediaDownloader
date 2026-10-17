export const metadata = {
  title: 'Privacy Policy — MediaHub',
  description: 'Our privacy practices, cookie policies, and data processing standards for MediaHub users.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#09090b] py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8 text-neutral-300">
        <div className="border-b border-white/[0.08] pb-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">Privacy Policy</h1>
          <p className="text-sm text-neutral-400">Effective Date: October 17, 2026 &bull; Last Revised: October 2026</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">1. Introduction</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            Welcome to MediaHub (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your personal privacy and are committed to maintaining transparent data management standards. This Privacy Policy details how information is collected, processed, and safeguarded when you access our cross-platform media utility and analytics tools.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">2. Information We Do Not Collect</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            MediaHub is designed with privacy-first architectural principles:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-400">
            <li>We do <strong>not</strong> require user account registration, login credentials, or passwords.</li>
            <li>We do <strong>not</strong> store, index, or archive downloaded media files on private servers. All downloads are streamed in transit directly between public content delivery networks and your local device.</li>
            <li>We do <strong>not</strong> access your private social media accounts or personal browsing history.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">3. Log Files & Serverless Analytics</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            Like most cloud-hosted applications on serverless infrastructure (Vercel), standard non-personally identifiable log information is automatically logged for security, debugging, and DDOS mitigation. This may include your IP address, browser type, referral URLs, operating system, and timestamp of access.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">4. Cookies & Third-Party Advertising (Google AdSense)</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            We may partner with third-party advertising vendors, including Google AdSense, to deliver relevant contextual and interest-based advertisements across our pages:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-400">
            <li>Google, as a third-party vendor, uses cookies to serve ads based on prior visits to our website or other internet resources.</li>
            <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to MediaHub and other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-violet-400 underline">Google Ads Settings</a> or through the <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-violet-400 underline">Network Advertising Initiative</a> opt-out portal.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">5. GDPR & CCPA Compliance</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            Under the European General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you retain rights to request information regarding any potential data processing. Because MediaHub does not collect personal identities or retain persistent records of URL requests, we do not sell or monetize personal user information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">6. Updates to This Policy</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            We reserve the right to periodically update this policy to reflect infrastructural changes or legal mandates. Revisions become effective immediately upon posting.
          </p>
        </section>

        <section className="space-y-4 border-t border-white/[0.08] pt-6">
          <h2 className="text-xl font-bold text-white">7. Contact Information</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            For privacy inquiries or compliance questions, please contact our data team via email at <code className="text-violet-400">privacy@mediahub.tools</code> or visit our <a href="/contact" className="text-violet-400 underline">Contact Page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}

