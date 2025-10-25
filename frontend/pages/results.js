"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function useLastResult() {
    const [data, setData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        try {
            const raw = sessionStorage.getItem("finscope:lastResult");
            if (!raw) {
                router.replace("/analyze");
                return;
            }
            setData(JSON.parse(raw));
        } catch {
            router.replace("/analyze");
        }
    }, [router]);

    return data;
}

function RiskArc({ percent = 0, color = "#dc2626" }) {
    const r = 42; // radius
    const c = 2 * Math.PI * r; // circumference
    const dash = (percent / 100) * c;

    return (
        <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={r} fill="none" stroke="#f1f5f9" strokeWidth="10" />
                <circle
                    cx="50" cy="50" r={r}
                    fill="none"
                    stroke={color}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${c - dash}`}
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold" style={{ color }}>{Math.round(percent)}%</div>
                <div className="text-xs font-medium" style={{ color }}>Risk</div>
            </div>
        </div>
    );
}

export default function ScamDetectionResults() {
    const result = useLastResult();
    const router = useRouter();

    const tone = useMemo(() => {
        if (!result) return { color: "#dc2626", bg: "bg-red-500", label: "High risk" };
        if (result.score >= 60) return { color: "#dc2626", bg: "bg-red-500", label: "High risk" };
        if (result.score >= 30) return { color: "#ca8a04", bg: "bg-yellow-500", label: "Suspicious" };
        return { color: "#16a34a", bg: "bg-green-500", label: "Likely safe" };
    }, [result]);

    if (!result) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <Navbar />
                <div className="max-w-4xl mx-auto pt-24">Loading…</div>
                <Footer />
            </div>
        );
    }

    const issues = result.reasons?.length
        ? result.reasons
        : ["No specific red flags triggered. Stay cautious and verify with official channels."];

    return (
        <div className="min-h-screen bg-gray-50 p-8 text-black">
            <Navbar />

            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-8 pt-24 mt-20">
                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">RESULTS</h1>

                {/* Risk + Banner */}
                <div className="mb-8">
                    <div className="flex items-center gap-4">
                        <RiskArc percent={result.score} color={tone.color} />
                        <div className={`flex-1 ${tone.bg} rounded-full px-6 py-3 flex items-center`}>
                            <div className="bg-white rounded-full p-1.5 mr-3">
                                <svg className="w-4 h-4" style={{ color: tone.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <span className="text-white font-semibold">
                                {tone.label}{result.score >= 60 ? " detected" : ""}
                            </span>
                        </div>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-8">
                    {result.explanation
                        ? result.explanation
                        : "This message shows potential risk indicators. Review the findings below and take action."}
                </p>

                {/* What we detected */}
                <div className="mb-8 border border-gray-200 rounded-2xl p-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">What we detected</h2>
                    <div className="space-y-3">
                        {issues.map((issue, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <p className="text-gray-700 text-sm leading-relaxed">{issue}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Entities and Advice */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="border border-gray-200 rounded-2xl p-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Extracted entities</h3>
                        <div className="text-xs text-gray-600 space-y-1">
                            <div><span className="font-medium">Links:</span> {result.entities?.urls?.join(", ") || "—"}</div>
                            <div><span className="font-medium">Phones:</span> {result.entities?.phones?.join(", ") || "—"}</div>
                            <div><span className="font-medium">Accounts:</span> {result.entities?.bankAccounts?.map(b => `${b.raw}${b.isValidNuban ? "" : " (invalid)"}`).join(", ") || "—"}</div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-2xl p-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Suggested next steps</h3>
                        <div className="space-y-2 text-sm">
                            {(result.advice && result.advice.length ? result.advice : [
                                "Do not click any links; type the official address yourself.",
                                "Never share OTP, PIN, or BVN.",
                                "Verify with your bank using official channels."
                            ]).map((a, i) => (<p key={i}>• {a}</p>))}
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <button
                                onClick={() => alert("Block the sender in your SMS/WhatsApp settings.")}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-sm font-medium text-blue-700">Block Sender</span>
                            </button>
                            <button
                                onClick={() => router.push("/analyze")}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
                            >
                                <span className="text-sm font-medium">Scan Another Message</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
