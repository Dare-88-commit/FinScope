"use client";

import { useState } from "react";
import { Camera, File, Link as LinkIcon, Rocket, BookOpen, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HelpPage() {
    const [submitted, setSubmitted] = useState(false);
    const [selectedType, setSelectedType] = useState("SMS");

    // Contact form state
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactMessage, setContactMessage] = useState("");

    const handleReportClick = () => {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    // WhatsApp (NG) number: 08084095730 -> 2348084095730
    const WHATSAPP_NUMBER = "2348084095730";

    function handleContactSubmit(e) {
        e.preventDefault();

        // Basic guard: require a message at least
        if (!contactMessage.trim()) {
            alert("Please enter a message before contacting support.");
            return;
        }

        const lines = [
            "Hello FinScope Support,",
            "",
            `Name: ${contactName || "—"}`,
            `Email: ${contactEmail || "—"}`,
            `Scam Type: ${selectedType}`,
            "",
            "Message:",
            contactMessage.trim(),
        ];
        const text = encodeURIComponent(lines.join("\n"));

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

        // Try opening a new tab; if blocked, fall back to current tab
        const win = window.open(url, "_blank", "noopener,noreferrer");
        if (!win) window.location.href = url;
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#f9fafb]">
            <Navbar />

            <main className="min-h-screen flex-grow pt-[100px] px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 text-black">
                {/* Left Section */}
                <section className="flex-1 space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-extrabold text-[#003366]">Don’t want to use the AI?</h1>
                        <p className="text-[#003366]/80 mt-1">Submit a message and our support team will help</p>
                    </div>

                    {/* Submit Form (manual report, not WhatsApp) */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
                        <h2 className="font-semibold text-lg">Submit a Suspicious Message</h2>

                        <textarea
                            rows={5}
                            placeholder="Paste text here..."
                            className="w-full border border-slate-200 rounded-xl p-3 mt-1 text-sm focus:ring-2 focus:ring-[#1FB57A] focus:outline-none resize-none"
                        />

                        <p className="text-sm">Or upload evidence</p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                className="flex items-center gap-2 border border-slate-200 rounded-full px-5 py-2 text-sm hover:bg-slate-50"
                            >
                                <Camera className="w-4 h-4" /> Screenshot
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-2 border border-slate-200 rounded-full px-5 py-2 text-sm hover:bg-slate-50"
                            >
                                <File className="w-4 h-4" /> File
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-2 border border-slate-200 rounded-full px-5 py-2 text-sm hover:bg-slate-50"
                            >
                                <LinkIcon className="w-4 h-4" /> Link
                            </button>
                        </div>

                        <p className="text-sm">Scam type</p>
                        <div className="flex flex-wrap gap-3">
                            {["SMS", "Email", "WhatsApp", "Website", "Others"].map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setSelectedType(type)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedType === type
                                            ? "bg-[#0f4b8f] text-white shadow-md"
                                            : "bg-slate-100 text-[#003366] hover:bg-slate-200"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleReportClick}
                                className="w-1/2 flex items-center justify-center gap-2 bg-[#003366] text-white px-5 py-3 rounded-full font-medium text-sm hover:bg-[#17a16c]"
                            >
                                <Rocket className="w-4 h-4" /> Report Now
                            </button>
                            <button
                                type="button"
                                className="w-1/2 flex items-center justify-center gap-2 border border-slate-200 rounded-full px-5 py-3 font-medium text-sm hover:bg-slate-50"
                            >
                                <BookOpen className="w-4 h-4" /> Guidelines
                            </button>
                        </div>

                        {submitted && (
                            <div className="bg-[#20c185]/90 text-white px-5 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 animate-fade-in shadow-md mt-4">
                                <CheckCircle className="w-4 h-4" />
                                Submitted! Our team and community will review and update risk insights shortly.
                            </div>
                        )}
                    </div>
                </section>

                {/* Right Sidebar */}
                <aside className="w-full lg:w-[350px] flex flex-col gap-6">
                    {/* Help & FAQ */}
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

                    {/* Contact Form -> WhatsApp */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
                        <form className="space-y-3" onSubmit={handleContactSubmit}>
                            <input
                                type="text"
                                placeholder="Your name"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1FB57A] focus:outline-none"
                            />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1FB57A] focus:outline-none"
                            />
                            <textarea
                                placeholder="How can we help?"
                                value={contactMessage}
                                onChange={(e) => setContactMessage(e.target.value)}
                                rows={4}
                                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1FB57A] focus:outline-none resize-y"
                            />
                            <button
                                type="submit"
                                className="w-full bg-[#003366] text-white py-2.5 rounded-full font-medium hover:bg-[#17a16c]"
                                title="Opens WhatsApp with your message"
                            >
                                Contact Support
                            </button>
                        </form>
                        <p className="mt-2 text-xs text-slate-500">
                            This opens WhatsApp chat with{" "}
                            <span className="font-medium">+234 808 409 5730</span> and fills in your message.
                        </p>
                    </div>
                </aside>
            </main>

            <Footer />
        </div>
    );
}
