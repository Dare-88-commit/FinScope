"use client";

import { useState } from "react";
import { Upload, Search } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar"; // Make sure path is correct
import Footer from "../components/Footer"; // Make sure path is correct

export default function AnalyzePage() {
    const [message, setMessage] = useState("");
    const [url, setUrl] = useState("");

    return (
        <div className="min-h-screen bg-[#f9fafb] flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow pt-[72px] px-4 flex flex-col items-center">
                {/* Analyze Section */}
                <div className="w-full max-w-3xl bg-white shadow-sm rounded-2xl p-6 mt-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">Analyze</h1>
                    <p className="text-gray-500 text-sm mb-4">
                        Paste a message or upload a screenshot. We’ll analyze it instantly.
                    </p>

                    <textarea
                        className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 min-h-[150px] mb-4 resize-none"
                        placeholder="Paste suspicious message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <div className="flex justify-between gap-3">
                        <button className="flex items-center justify-center gap-2 bg-[#032D60] text-white px-4 py-2 rounded-full hover:bg-[#021E40] transition">
                            <Upload size={18} /> Upload Screenshot
                        </button>
                        <button className="bg-[#032D60] text-white px-6 py-2 rounded-full hover:bg-[#021E40] transition">
                            Analyze Message
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 mt-3">
                        All analysis runs locally. We do not store your data.
                    </p>
                </div>

                {/* Scam Trends & Help */}
                <div className="flex flex-wrap justify-center gap-4 mt-6 w-full max-w-3xl">
                    {/* Scam Trends */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm flex-1 min-w-[160px] hover:shadow-md transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 10h4l3 10 4-14h7"
                            />
                        </svg>
                        <div>
                            <h3 className="text-sm font-medium text-gray-800">Scam Trends</h3>
                            <p className="text-xs text-gray-500">See what’s trending in your region.</p>
                        </div>
                    </Link>

                    {/* Help */}
                    <Link
                        href="/help"
                        className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm flex-1 min-w-[160px] hover:shadow-md transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16h6"
                            />
                        </svg>
                        <div>
                            <h3 className="text-sm font-medium text-gray-800">Help</h3>
                            <p className="text-xs text-gray-500">Get support and guidance.</p>
                        </div>
                    </Link>
                </div>

                {/* Legit Check */}
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
                            className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <button className="bg-[#032D60] text-white px-5 py-2 rounded-full hover:bg-[#021E40] transition flex items-center gap-2">
                            <Search size={18} /> Check Now
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
