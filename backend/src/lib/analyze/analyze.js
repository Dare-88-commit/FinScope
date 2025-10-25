import { runRules, scoreFrom } from "./rules.js";

function normalizeText(raw) {
    if (!raw) return "";
    let t = raw
        .replace(/[\u200B-\u200D\uFEFF]/g, "")   // zero-width
        .normalize("NFKC")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

    // unify currency & separators
    t = t
        .replace(/₦/g, "ngn ")
        .replace(/\bn(?=\d)/g, "ngn ")         // "n5000" -> "ngn 5000"
        .replace(/ngn\s*[,.\s]/g, "ngn ")      // clean "ngn, 50,000"
        .replace(/(\d),(\d{3}\b)/g, "$1$2");   // remove thousand commas: 50,000 -> 50000

    // common variants
    t = t
        .replace(/\b24hrs\b/g, "24 hours")
        .replace(/\b48hrs\b/g, "48 hours")
        .replace(/\bper\s*day\b/g, "daily")
        .replace(/\bper\s*week\b/g, "weekly")
        .replace(/\bper\s*month\b/g, "monthly");

    return t;
}

export function analyzePlainText(text) {
    const input = (text || "").trim();
    if (!input) {
        return {
            text: "",
            score: 0,
            reasons: [],
            advice: ["Paste a real message, not empty space."],
            entities: { urls: [], phones: [], bankAccounts: [] }
        };
    }

    const norm = normalizeText(input);
    const rr = runRules(norm);
    const score = scoreFrom(rr.reasons, rr.urlFlags);

    const advice = [];
    if (rr.reasons.includes("Suspicious link characteristics")) {
        advice.push("Do not click links. Type official addresses yourself.");
    }
    if (rr.reasons.includes("Sensitive credential request (OTP/BVN/PIN)")) {
        advice.push("Never share OTP, PIN, or BVN with anyone.");
    }
    if (rr.reasons.includes("Unrealistic returns")) {
        advice.push("Guaranteed returns or very fast growth are classic scams.");
    }
    if (rr.reasons.includes("Account or BVN verification demand")) {
        advice.push("Do not verify via links. Contact your bank through official channels.");
    }

    return {
        text: input,
        score,
        reasons: rr.reasons,
        advice: advice.length ? advice : ["Be cautious. Verify with official contacts before acting."],
        entities: rr.entities
    };
}
