'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#09090b] py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Contact Our Team</h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
            Have questions about platform integration, business partnerships, or copyright compliance? We&apos;re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
            <p className="text-neutral-500 uppercase tracking-wider mb-1">General Support</p>
            <p className="font-semibold text-white">support@mediahub.tools</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
            <p className="text-neutral-500 uppercase tracking-wider mb-1">DMCA Inquiries</p>
            <p className="font-semibold text-violet-400">dmca@mediahub.tools</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
            <p className="text-neutral-500 uppercase tracking-wider mb-1">Response Time</p>
            <p className="font-semibold text-emerald-400">&lt; 24 Business Hours</p>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 text-2xl flex items-center justify-center mx-auto">
                &check;
              </div>
              <h2 className="text-2xl font-bold text-white">Message Received</h2>
              <p className="text-neutral-400 text-sm max-w-md mx-auto">
                Thank you for contacting MediaHub. A ticket has been created and our engineering team will get back to your email ({form.email}) within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-xs font-semibold uppercase text-neutral-400">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs font-semibold uppercase text-neutral-400">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-subject" className="text-xs font-semibold uppercase text-neutral-400">Department / Inquiry Type</label>
                <select
                  id="contact-subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-[#121217] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  <option value="general">General Support & Feedback</option>
                  <option value="bug">Bug Report / API Issue</option>
                  <option value="dmca">DMCA / Copyright Inquiries</option>
                  <option value="partnership">Business & Advertising</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-xs font-semibold uppercase text-neutral-400">Message</label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your inquiry in detail..."
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl py-3.5 text-sm transition-all shadow-lg shadow-violet-500/20"
              >
                Send Message &rarr;
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

