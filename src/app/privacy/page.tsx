import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy & Terms — Ruhul Ameen',
  description: 'Privacy practices and data handling policies for ruhulameen.com.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 space-y-8">
      <h1 className="text-4xl font-black text-white">
        Privacy Policy & Terms of Service
      </h1>
      <p className="text-xs font-mono text-neutral-500">
        Last Updated: February 2025 • Operating from Lucknow, India
      </p>

      <div className="prose prose-invert max-w-none text-sm text-neutral-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Data Collection & Usage</h2>
          <p>
            This portfolio website does not utilize invasive third-party trackers or harvest personal identity data without explicit consent. When you submit inquiries through our contact forms or direct communication channels (WhatsApp, Email), your information is utilized exclusively for direct communication regarding potential project engagements.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Client Work & Confidentiality</h2>
          <p>
            All displayed project case studies, client analytics, and media deliverables are published either under express client permission or represent public digital domains (e.g., publicly deployed websites and published YouTube content). Proprietary internal client assets and sensitive data are never disclosed.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Local Storage & Preferences</h2>
          <p>
            We use your browser&apos;s local storage strictly for functional preferences: saving your light/dark mode selection and your audio feedback preference. No tracking cookies are shared with ad networks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Contact & Inquiries</h2>
          <p>
            For any inquiries regarding data privacy or portfolio attribution, contact us directly at{' '}
            <Link href="mailto:ruhulameen.work@gmail.com" className="text-[var(--accent,#E5262B)] hover:underline">
              ruhulameen.work@gmail.com
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
