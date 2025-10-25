"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Upload, Search } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ""; // leave empty if using Next rewrites

export default function AnalyzePage() {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    async function analyzeText() {
        if (!message.trim()) return;
        setLoading(true); setError("");
        try {
            const res = await fetch(`${API_BASE}/api/analyze`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: message.trim() })
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            // Save result for Results page and navigate
            sessionStorage.setItem("finscope:lastResult", JSON.stringify(data));
            router.push("/results");
        } catch (e) {
            setError("Could not analyze text. Is the backend running on :5000?");
        } finally {
            setLoading(false);
        }
    }

    async function analyzeImage(file) {
        if (!file) return;
        const okTypes = ["image/png", "image/jpeg", "image/webp"];
        if (!okTypes.includes(file.type)) {
            setError("Use PNG, JPG, or WebP.");
            return;
        }
        if (file.size > 6 * 1024 * 1024) {
            setError("Image too large. Max 6 MB.");
            return;
        }
        setLoading(true); setError("");
        try {
            const form = new FormData();
            form.append("file", file);
            const res = await fetch(`${API_BASE}/api/analyze`, { method: "POST", body: form });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            sessionStorage.setItem("finscope:lastResult", JSON.stringify(data));
            router.push("/results");
        } catch (e) {
            setError("Image analysis failed. Check backend logs.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#f9fafb] flex flex-col">
            <Navbar />

            <main className="flex-grow pt-[72px] px-4 flex flex-col items-center">
                {/* Analyze Section */}
                <div className="w-full max-w-3xl bg-white shadow-sm rounded-2xl p-6 mt-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">Analyze</h1>
                    <p className="text-gray-500 text-sm mb-4">
                        Paste a message or upload a screenshot. We’ll analyze it instantly.
                    </p>

                    <textarea
                        className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#003366] text-gray-700 min-h-[150px] mb-4 resize-none"
                        placeholder="Paste suspicious message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <div className="flex justify-between gap-3">
                        {/* Upload button */}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center justify-center gap-2 bg-[#003366] text-white px-4 py-2 rounded-full hover:bg-[#021E40] transition"
                        >
                            <Upload size={18} /> Upload Screenshot
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="hidden"
                            onChange={(e) => analyzeImage(e.target.files?.[0])}
                        />

                        {/* Analyze text */}
                        <button
                            onClick={analyzeText}
                            disabled={loading}
                            className="bg-[#003366] text-white px-6 py-2 rounded-full hover:bg-[#021E40] transition disabled:opacity-50"
                        >
                            {loading ? "Analyzing..." : "Analyze Message"}
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 mt-3">
                        Analysis runs on your backend. We do not store your data.
                    </p>

                    {/* Errors */}
                    {error && (
                        <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
                            {error}
                        </div>
                    )}
                </div>

                {/* Scam Trends & Help */}
                <div className="flex flex-wrap justify-center gap-4 mt-6 w-full max-w-3xl">
                    <Link
                        href="/"
                        className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm flex-1 min-w-[160px] hover:shadow-md transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 10 4-14h7" />
                        </svg>
                        <div>
                            <h3 className="text-sm font-medium text-gray-800">Back To Home</h3>
                            <p className="text-xs text-gray-500">Go back to your home page.</p>
                        </div>
                    </Link>

                    <Link
                        href="/help"
                        className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm flex-1 min-w-[160px] hover:shadow-md transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16h6" />
                        </svg>
                        <div>
                            <h3 className="text-sm font-medium text-gray-800">Help</h3>
                            <p className="text-xs text-gray-500">Get support and guidance.</p>
                        </div>
                    </Link>
                </div>

                {/* Legit Check (UI only for now) */}
                <div className="w-full max-w-3xl bg-white shadow-sm rounded-2xl p-6 mt-8 mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">✅</span>
                        <h2 className="text-lg font-semibold text-gray-800">Legit Check</h2>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">
                        This check is powered by verified public and community databases.
                    </p>

                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Paste URL, number, or sender ID here..."
                            className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#003366] text-gray-700"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <button
                            onClick={() => alert("Wire this to a legit-check endpoint later.")}
                            className="bg-[#003366] text-white px-5 py-2 rounded-full hover:bg-[#021E40] transition flex items-center gap-2"
                        >
                            <Search size={18} /> Check Now
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
