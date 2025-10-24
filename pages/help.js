"use client";


import { useState } from "react";
import { Camera, File, Link as LinkIcon, Rocket, BookOpen, CheckCircle } from "lucide-react";

export default function HelpPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedType, setSelectedType] = useState("SMS");

  const handleReportClick = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      {/* ✅ Navbar placeholder */}
      <div className="w-full h-[70px] bg-transparent"></div>

      <main className="flex flex-col lg:flex-row gap-6 p-8 max-w-7xl mx-auto bg-[#f9fbfd] text-[#003366] items-start">
        {/* Left Section */}
        <section className="flex-1 space-y-4 self-start">
          <div className="mb-2">
            <h2 className="text-3xl font-extrabold text-[#003366] tracking-tight">
              Don’t want to use the AI?
            </h2>
            <p className="text-base text-[#003366]/80 mt-1">
              Submit a message and our support team will help
            </p>
          </div>

          {/* Submit Form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="font-semibold text-lg">Submit a Suspicious Message</h3>

            <div>
              <label className="text-sm font-medium">Paste message</label>
              <textarea
                className="w-full border border-slate-200 rounded-xl p-3 mt-1 text-sm focus:ring-2 focus:ring-[#1FB57A] focus:outline-none"
                rows="5"
                placeholder="Paste text here..."
              ></textarea>
            </div>

            <p className="text-sm">Or upload evidence</p>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 border border-slate-200 rounded-full px-5 py-2 text-sm hover:bg-slate-50">
                <Camera className="w-4 h-4" />
                Screenshot
              </button>
              <button className="flex items-center gap-2 border border-slate-200 rounded-full px-5 py-2 text-sm hover:bg-slate-50">
                <File className="w-4 h-4" />
                File
              </button>
              <button className="flex items-center gap-2 border border-slate-200 rounded-full px-5 py-2 text-sm hover:bg-slate-50">
                <LinkIcon className="w-4 h-4" />
                Link
              </button>
            </div>

            {/* Scam type */}
            <p className="text-sm">Scam type</p>

            <div className="flex flex-wrap gap-3">
              {["SMS", "Email", "WhatsApp", "Website", "Others"].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedType === type
                      ? "bg-[#0f4b8f] text-white shadow-md"
                      : "bg-slate-100 text-[#003366] hover:bg-slate-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleReportClick}
                className="w-1/2 flex items-center justify-center gap-2 bg-[#003366] text-white px-5 py-3 rounded-full font-medium text-sm hover:bg-[#17a16c]"
              >
                <Rocket className="w-4 h-4" />
                Report Now
              </button>
              <button className="w-1/2 flex items-center justify-center gap-2 border border-slate-200 rounded-full px-5 py-3 font-medium text-sm hover:bg-slate-50">
                <BookOpen className="w-4 h-4" />
                Guidelines
              </button>
            </div>
          </div>

          {submitted && (
            <div className="bg-[#20c185]/90 text-white px-5 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 animate-fade-in shadow-md mt-4">
              <CheckCircle className="w-4 h-4" />
              Submitted! Our team and community will review and update risk insights shortly.
            </div>
          )}
        </section>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-[350px] flex flex-col gap-6 self-start">
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
            <h3 className="font-semibold text-lg mb-2">Help & Support</h3>

            {[
              {
                q: "How do I know if a link is safe?",
                a: "Use Legit Check to scan URLs and sender IDs. Avoid clicking shortened or misspelled domains.",
              },
              {
                q: "What should I do after receiving a scam SMS?",
                a: "Do not reply or share OTPs. Report here and block the number from your device.",
              },
              {
                q: "Can I report voice calls or WhatsApp messages?",
                a: "Yes. Upload screenshots, recordings, or transcripts and select the appropriate type.",
              },
              {
                q: "Will my personal details be public?",
                a: "No. Reports are anonymized and personal data is not required.",
              },
            ].map((item, i) => (
              <details key={i} className="border-t border-slate-200 py-2 group">
                <summary className="cursor-pointer font-medium flex items-center justify-between">
                  <span>{item.q}</span>
                  {/* thin V icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-[#003366] transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <p className="text-sm mt-2">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1FB57A] focus:outline-none"
              />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1FB57A] focus:outline-none"
              />
              <textarea
                placeholder="How can we help?"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1FB57A] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-[#003366] text-white py-2.5 rounded-full font-medium hover:bg-[#17a16c]"
              >
                Contact Support
              </button>
            </form>
          </div>
        </aside>
      
      </main>
    </>
  );
}
