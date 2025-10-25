import { analyzeUrlSafety } from "./url.js";
import { looksLikeValidNuban } from "./nuban.js";
import { extractEntities } from "./extract.js";

// ——— Baseline signals ———
const URGENCY = /\b(urgent|immediately|act now|24\s*hours|48\s*hours|24hrs|48hrs|last warning|deactivate|suspend|blocked|expire[sd]?|limited time)\b/i;
const OTP = /\b(otp|token|bvn|password|pin|one[-\s]?time\s?password)\b/i;
const PRIZE = /\b(congratulations|winner|selected|jackpot|promo|you(?:'| )?ve\s*won|gift\s*card|reward)\b/i;
const BANK_PRESSURE = /\b(bvn\s*(upgrade|update|verify)|account\s*(verify|verification|validate|re-?activate|reactivate|restricted|restriction|suspend|blocked)|atm\s*card\s*(blocked|block|restrict(?:ed)?)|debit\s*alert)\b/i;
const DELIVERY_FEE = /\b(delivery\s*fee|clearance\s*fee|customs\s*duty|waybill|logistics\s*charge|dispatch\s*rider)\b/i;
const LINK_BAIT = /\b(click\s*(here|link)|follow\s*the\s*link|tap\s*the\s*link|login\s*via\s*link|verify\s*via\s*link)\b/i;
const MIXED_SCRIPTS = /[A-Za-z].*[\u0400-\u04FF\u0600-\u06FF]|[\u0400-\u04FF\u0600-\u06FF].*[A-Za-z]/;

// ——— Timeframes: accept “in the next”, “within”, “today/tomorrow/weekly/daily/…” ———
const TIMEFRAME_FLEX = /\b(?:in\s*(?:the\s*next\s*)?\d{1,3}\s*(?:hour|hours|day|days|week|weeks)|within\s*\d{1,3}\s*(?:hours?|days?|weeks?)|today|tomorrow|same\s*day|this\s*week|this\s*month|weekly|daily|monthly)\b/i;

// ——— Return keywords ———
const RETURN_WORDS = /\b(roi|return|returns|profit|earn|yield|payout|cashout|credit)\b/i;
const GUARANTEE_WORDS = /\b(guarantee[ds]?|sure|fixed|assured)\b/i;

// ——— Percent & multiplier ———
const PERCENT = /\b(\d{1,3}(?:\.\d{1,2})?)\s*(%|percent)\b/gi; // 25%, 40 percent
const MULTIPLIER = /\b(\d{1,3})x\b/gi;                         // 2x, 5x, 10x

// ——— Money values (after normalization) ———
const MONEY_VALUE = /\b(?:ngn\s*)?(\d{4,})(?:\.\d{1,2})?\b/gi;

// Detects percent ≥20, multiplier ≥2, OR two money values with ratio ≥1.8, combined with timeframe/return-ish language.
function detectsNumericUnrealistic(text) {
    let pctHit = false, pctValMax = 0;
    for (const m of text.matchAll(PERCENT)) {
        const v = parseFloat(m[1]);
        if (!isNaN(v)) { pctValMax = Math.max(pctValMax, v); if (v >= 20) pctHit = true; }
    }

    let multHit = false, multValMax = 0;
    for (const m of text.matchAll(MULTIPLIER)) {
        const v = parseFloat(m[1]);
        if (!isNaN(v)) { multValMax = Math.max(multValMax, v); if (v >= 2) multHit = true; }
    }

    const money = [];
    for (const m of text.matchAll(MONEY_VALUE)) {
        const v = parseFloat(m[1]);
        if (!isNaN(v)) money.push(v);
    }
    let ratioHit = false, ratioVal = 1;
    if (money.length >= 2) {
        const maxV = Math.max(...money);
        const minV = Math.min(...money);
        if (minV > 0) {
            ratioVal = maxV / minV;
            if (ratioVal >= 1.8) ratioHit = true; // ≈80%+ growth
        }
    }

    const hasTimeframe = TIMEFRAME_FLEX.test(text);
    const hasReturnWord = RETURN_WORDS.test(text);
    const guaranteed = GUARANTEE_WORDS.test(text);

    // Suspicion if any numeric “growth” + either timeframe or return words.
    const hit =
        (pctHit && (hasTimeframe || hasReturnWord || guaranteed)) ||
        (multHit && (hasTimeframe || hasReturnWord || guaranteed)) ||
        (ratioHit && (hasTimeframe || hasReturnWord || guaranteed));

    return { hit, pctValMax, multValMax, ratioVal, hasTimeframe, hasReturnWord, guaranteed };
}

// URL shorteners & structural flags
const SHORTENERS = /\b(bit\.ly|tinyurl\.com|t\.co|is\.gd|goo\.gl|rebrand\.ly|ow\.ly|cutt\.ly|s\.id|rb\.gy)\b/i;

export function runRules(text) {
    const hits = [];
    const push = (ok, why) => { if (ok) hits.push(why); };

    // Base rules
    push(URGENCY.test(text), "Urgency/pressure tactics");
    push(OTP.test(text), "Sensitive credential request (OTP/BVN/PIN)");
    push(PRIZE.test(text), "Prize/lottery bait");
    push(BANK_PRESSURE.test(text), "Account or BVN verification demand");
    push(DELIVERY_FEE.test(text), "Delivery/customs fee scam pattern");
    push(LINK_BAIT.test(text), "Link-click social engineering");
    push(MIXED_SCRIPTS.test(text), "Mixed scripts/homoglyph risk");

    // Numeric ROI logic (now robust)
    const numeric = detectsNumericUnrealistic(text);
    push(numeric.hit, "Unrealistic returns");

    // Entities + URL flags
    const entities = extractEntities(text);
    const urlFlags = entities.urls.map(u => {
        const f = analyzeUrlSafety(u);
        const isShort = SHORTENERS.test(u);
        return { u, f: { ...f, shortener: isShort } };
    });
    const urlRed = urlFlags.some(x => Object.values(x.f).some(Boolean));
    push(urlRed, "Suspicious link characteristics");

    // NUBAN plausibility
    const nubanFail = entities.bankAccounts.some(a => !looksLikeValidNuban(a.raw));
    push(nubanFail, "Invalid-looking bank account number");

    return {
        reasons: hits,
        entities: {
            urls: entities.urls,
            phones: entities.phones,
            bankAccounts: entities.bankAccounts.map(a => ({
                raw: a.raw, isValidNuban: looksLikeValidNuban(a.raw)
            }))
        },
        urlFlags: urlFlags.map(x => x.f)
    };
}

// Weighted scoring so it actually moves
export function scoreFrom(reasons, urlFlags) {
    const WEIGHTS = {
        "Sensitive credential request (OTP/BVN/PIN)": 40,
        "Urgency/pressure tactics": 22,
        "Account or BVN verification demand": 28,
        "Suspicious link characteristics": 18,
        "Unrealistic returns": 32,
        "Link-click social engineering": 14,
        "Delivery/customs fee scam pattern": 14,
        "Prize/lottery bait": 10,
        "Mixed scripts/homoglyph risk": 8
    };

    let s = 0;
    for (const r of reasons) s += WEIGHTS[r] || 8;

    const urlPenalty = urlFlags.reduce(
        (acc, f) => acc + Object.values(f).filter(Boolean).length * 3, 0
    );
    s += Math.min(urlPenalty, 12);

    if (reasons.includes("Sensitive credential request (OTP/BVN/PIN)") &&
        reasons.includes("Urgency/pressure tactics")) s += 10;
    if (reasons.includes("Unrealistic returns") &&
        reasons.includes("Link-click social engineering")) s += 8;

    s = Math.round(s);
    if (s > 95) s = 95;
    if (s < 0) s = 0;
    return s;
}
