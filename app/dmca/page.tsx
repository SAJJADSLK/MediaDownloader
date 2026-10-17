export const metadata = {
  title: 'DMCA & Copyright Policy — MediaHub',
  description: 'DMCA compliance, copyright infringement reporting procedures, and content takedown policies.',
};

export default function DmcaPage() {
  return (
    <div className="min-h-screen bg-[#09090b] py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8 text-neutral-300">
        <div className="border-b border-white/[0.08] pb-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">DMCA & Copyright Policy</h1>
          <p className="text-sm text-neutral-400">Digital Millennium Copyright Act (17 U.S.C. § 512) Compliance</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">1. Statement of Non-Hosting</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            MediaHub is an automated client-side routing utility. <strong>We do not host, store, mirror, or upload any copyrighted media files, videos, or audio tracks on our servers.</strong> All media manifests, streams, and files downloaded through our platform are transmitted directly from public third-party Content Delivery Networks (CDNs) to the user&apos;s personal device.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">2. Intellectual Property Rights & Takedowns</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            We strictly respect the intellectual property rights of content creators, rights holders, and copyright owners. In compliance with the Digital Millennium Copyright Act (DMCA), we respond promptly to valid notices of alleged copyright infringement.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">3. How to Submit a DMCA Takedown Notice</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            If you are a copyright owner or an authorized agent representing one, and believe that any content made accessible through our tools infringes upon your copyright, you may submit a formal notification with the following particulars:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-400">
            <li>Identification of the copyrighted work claimed to have been infringed, or a representative list if multiple works are involved.</li>
            <li>The specific URL(s) on third-party platforms that you believe infringe your rights.</li>
            <li>Sufficient contact information, including your full legal name, company name (if applicable), mailing address, telephone number, and email address.</li>
            <li>A statement that you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement made under penalty of perjury that the information in the notification is accurate, and that you are authorized to act on behalf of the owner.</li>
            <li>A physical or electronic signature of the copyright owner or authorized representative.</li>
          </ul>
        </section>

        <section className="space-y-4 border-t border-white/[0.08] pt-6">
          <h2 className="text-xl font-bold text-white">4. Designated Copyright Agent</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            Please direct all DMCA notices and formal inquiries to our designated agent:
          </p>
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5 text-sm space-y-1">
            <p className="font-semibold text-white">MediaHub Copyright Agent</p>
            <p className="text-neutral-400">Email: <code className="text-violet-400">dmca@mediahub.tools</code></p>
            <p className="text-neutral-400">Subject Line: DMCA Takedown Notice</p>
            <p className="text-neutral-400">Response Time: 24 to 48 business hours</p>
          </div>
        </section>
      </div>
    </div>
  );
}

